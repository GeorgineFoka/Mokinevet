import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export function Prediagnostic() {
  const navigation = useNavigation();

  const API = axios.create({
    baseURL: "http://172.17.4.43:8000/api/ia",
    headers: {
      Authorization: `Bearer 16|lTVdq3XlTdF6roHWQnebtoOMjLfWXMMzO5RTt0vk30b68007`,
    },
  });

  const [plusModalVisible, setPlusModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [maladie, setMaladie] = useState("");

  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChats();

    const welcomeMsg = {
      id: 'welcome',
      typeContenu: 'texte',
      appartenance: 'ia',
      contenu: { message: 'Que puis-je faire pour vous ?' },
      created_at: new Date().toISOString(),
    };
    setMessages([welcomeMsg]);
  }, []);

  const fetchChats = async () => {
    try {
      setLoadingChats(true);
      const res = await API.get("/history");
      if (res.data?.statut === 200) setChats(res.data.data || []);
    } catch (err) {
      console.log("Erreur fetchChats", err);
    } finally {
      setLoadingChats(false);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      setLoadingMessages(true);
      setSelectedChat(chatId);
      const res = await API.get(`/request/${chatId}`);
      if (res.data?.statut === 200) setMessages(res.data.data || []);
      else setMessages([]);
    } catch (err) {
      console.log("Erreur fetchMessages", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSend = async () => {
    if (!inputText && !selectedImage) return;

    const formData = new FormData();
    if (selectedImage) {
      formData.append("typeContenu", "fichier");
      formData.append("maladie", maladie);
      formData.append("file", {
        uri: selectedImage.uri,
        name: selectedImage.fileName || "photo.jpg",
        type: selectedImage.type || "image/jpeg",
      });
    } else {
      formData.append("typeContenu", "texte");
      formData.append("message", inputText);
    }
    if (selectedChat) formData.append("listediscussionia_id", selectedChat);

    try {
      setSending(true);

      const userMsg = {
        id: Date.now(),
        typeContenu: selectedImage ? "fichier" : "texte",
        appartenance: "user",
        contenu: selectedImage ? { lien: selectedImage.uri } : { message: inputText },
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const res = await API.post("/request/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        if (!selectedChat && res.data.discussion_id) setSelectedChat(res.data.discussion_id);

        if (res.data.ia_response) {
          const iaMsg = {
            id: Date.now() + 1,
            typeContenu: "texte",
            appartenance: "ia",
            contenu: { message: JSON.stringify(res.data.ia_response) },
            created_at: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, iaMsg]);
        }
      }
      setInputText("");
      setSelectedImage(null);
    } catch (err) {
      console.log("Erreur envoi", err);
    } finally {
      setSending(false);
    }
  };

  const pickImage = (type) => {
    setPlusModalVisible(false);
    setMaladie(type);
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (!res.didCancel && !res.errorCode) setSelectedImage(res.assets[0]);
    });
  };

  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;
    return chats.filter((c) => c.title?.toLowerCase().includes(search.toLowerCase()));
  }, [search, chats]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack('accueil')}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mokine IA</Text>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Icon name="menu" size={24} color="#006400" style={{ marginTop: 48 }} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatContainer}>
        {loadingMessages ? (
          <ActivityIndicator size="large" color="#006400" />
        ) : (
          messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.appartenance === "ia" ? styles.leftBubble : styles.rightBubble,
              ]}
            >
              {msg.typeContenu === "texte" ? (() => {
                let iaResponse = msg?.contenu?.message;
                if (iaResponse && typeof iaResponse === "string") {
                  try { iaResponse = JSON.parse(iaResponse); } catch { iaResponse = null; }
                }

                if (iaResponse?.modele) {
                  const modele = iaResponse.modele;
                  return (
                    <View style={styles.card}>
                      {modele === "pieds" && (
                        <>
                          <Text style={styles.cardTitle}>{iaResponse?.result?.title}</Text>
                          <Text style={styles.cardConfidence}>
                            Confiance : {(iaResponse?.confidence * 100)?.toFixed(1)}%
                          </Text>
                          {iaResponse?.result?.text &&
                            Object.entries(iaResponse.result.text).map(([key, value]) => (
                              <View key={key} style={styles.cardRow}>
                                <Text style={styles.cardKey}>{key} :</Text>
                                <Text style={styles.cardValue}>{value}</Text>
                              </View>
                            ))}
                        </>
                      )}
                      {modele === "peau" && (
                        <>
                          <Text style={styles.cardTitle}>État de la peau : {iaResponse?.predicted_class}</Text>
                          <Text style={styles.cardConfidence}>
                            Confiance : {(iaResponse?.confidence_percent)?.toFixed(2)}%
                          </Text>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Message :</Text>
                            <Text style={styles.cardValue}>{iaResponse?.explanation?.message}</Text>
                          </View>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Conseils :</Text>
                            <Text style={styles.cardValue}>{iaResponse?.explanation?.care_tips}</Text>
                          </View>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Rassurance :</Text>
                            <Text style={styles.cardValue}>{iaResponse?.explanation?.reassurance}</Text>
                          </View>
                        </>
                      )}
                      {modele === "bouche" && (
                        <>
                          <Text style={styles.cardTitle}>Diagnostic : {iaResponse?.details?.diagnostic}</Text>
                          <Text style={styles.cardConfidence}>
                            Confiance : {iaResponse?.confidence?.toFixed(2)}%
                          </Text>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Causes :</Text>
                            {iaResponse?.details?.causes.map((c, idx) => (
                              <Text key={idx} style={styles.cardValue}>- {c}</Text>
                            ))}
                          </View>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Conseils :</Text>
                            <Text style={styles.cardValue}>{iaResponse?.details?.conseils}</Text>
                          </View>
                          <View style={styles.cardRow}>
                            <Text style={styles.cardKey}>Prévention :</Text>
                            {iaResponse?.details?.prevention.map((p, idx) => (
                              <Text key={idx} style={styles.cardValue}>- {p}</Text>
                            ))}
                          </View>
                        </>
                      )}

                      <TouchableOpacity
                        style={styles.contactButton}
                        onPress={() => navigation.navigate('veterinaires')}
                      >
                        <Text style={styles.contactButtonText}>Contacter un vétérinaire</Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return <Text style={styles.messageText}>{msg?.contenu?.message}</Text>;
                }
              })() : (
                <Image
                  source={{
                    uri: msg.contenu?.lien?.startsWith("file:")
                      ? msg.contenu?.lien
                      : `http://172.17.4.43:8000/storage/${msg?.contenu?.lien}`,
                  }}
                  style={{ width: 120, height: 120, borderRadius: 8 }}
                />
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.plusButton} onPress={() => setPlusModalVisible(true)}>
            <Icon name="add" size={24} color="#808080" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#A9A9A9"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={sending}>
            {sending ? <ActivityIndicator size="small" color="#006400" /> : <Icon name="send" size={24} color="#006400" />}
          </TouchableOpacity>
        </View>
      </View>

      {selectedImage && (
        <View style={styles.previewBox}>
          <Image source={{ uri: selectedImage.uri }} style={{ width: 80, height: 80, borderRadius: 8 }} />
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Icon name="close" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal + */}
      <Modal transparent visible={plusModalVisible} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPlusModalVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisir un modèle</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => pickImage("pieds")}>
                <Icon name="directions-run" size={24} color="#000" />
                <Text style={styles.modalOptionText}>Modèle des pieds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => pickImage("peau")}>
                <Icon name="healing" size={24} color="#000" />
                <Text style={styles.modalOptionText}>Modèle de la peau</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => pickImage("bouche")}>
                <Icon name="mood" size={24} color="#000" />
                <Text style={styles.modalOptionText}>Modèle de la bouche</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* Sidebar */}
      <Modal
        animationType="slide"
        transparent
        visible={sidebarVisible}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebarOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sidebar}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Discussions</Text>
                <TouchableOpacity onPress={() => setSidebarVisible(false)}>
                  <Icon name="close" size={22} color="#000" />
                </TouchableOpacity>
              </View>

              {loadingChats ? (
                <ActivityIndicator size="large" color="#006400" />
              ) : (
                <ScrollView>
                  <TouchableOpacity
                    style={styles.historyItem}
                    onPress={() => {
                      setSelectedChat(null);
                      setMessages([]);
                      setSidebarVisible(false);
                    }}
                  >
                    <Icon name="add-circle-outline" size={18} color="#006400" />
                    <Text style={styles.historyItemText} numberOfLines={1}>
                      Nouveau chat
                    </Text>
                  </TouchableOpacity>

                  {filteredChats.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.historyItem}
                      onPress={() => {
                        fetchMessages(item.id);
                        setSidebarVisible(false);
                      }}
                    >
                      <Icon name="chat-bubble-outline" size={18} color="#006400" />
                      <Text style={styles.historyItemText} numberOfLines={1}>
                        {item.title || `${item.date}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setSidebarVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#000", marginTop: 50 },
  chatContainer: { flex: 1, padding: 10, width: "100%" },
  messageBubble: { maxWidth: "70%", padding: 10, borderRadius: 10, marginVertical: 4 },
  leftBubble: { alignSelf: "flex-start", backgroundColor: "#e0f7fa" },
  rightBubble: { alignSelf: "flex-end", backgroundColor: "#c8e6c9" },
  messageText: { fontSize: 16, color: "#000" },
  footer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff" },
  inputContainer: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#eee", borderRadius: 25, paddingHorizontal: 10 },
  textInput: { flex: 1, fontSize: 16 },
  plusButton: { marginRight: 8 },
  sendButton: { marginLeft: 8 },
  previewBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 8 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#000" },
  modalOption: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  modalOptionText: { fontSize: 18, marginLeft: 15, color: "#000" },
  sidebarOverlay: { flex: 1, flexDirection: "row", backgroundColor: "rgba(0,0,0,0.35)" },
  sidebar: { width: 300, backgroundColor: "#fff", padding: 14, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  sidebarHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sidebarTitle: { fontSize: 18, fontWeight: "700" },
  historyItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#eee" },
  historyItemText: { marginLeft: 8, color: "#000" },
  card: { backgroundColor: "#fff", width: "150%", padding: 12, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginVertical: 5 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color: "#006400" },
  cardConfidence: { fontSize: 14, fontStyle: "italic", marginBottom: 8, color: "#555" },
  cardRow: { marginBottom: 6 },
  cardKey: { fontWeight: "600", color: "#000" },
  cardValue: { color: "#333", marginLeft: 5 },
  contactButton: { marginTop: 10, backgroundColor: "#006400", padding: 10, borderRadius: 8, alignItems: "center" },
  contactButtonText: { color: "#fff", fontWeight: "600" },
  backButton: { backgroundColor: "#0a7b46", borderRadius: 30, width: 40, height: 40, alignItems: "center", justifyContent: "center", marginTop: 40 },
});
