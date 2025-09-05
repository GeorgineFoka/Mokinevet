import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import { API_URL_FILE } from '@env';
import { useUserStore } from "../../store";

export function Discussions() {
  const navigation = useNavigation();
  const { token } = useUserStore(); // récupération du token depuis zustand
  const [loading, setLoading] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [search, setSearch] = useState("");
  const user = useUserStore((state) => state.user);

  // --- Requête API pour récupérer les discussions
  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/chat/mes-discussions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Auth avec token
        },
      });

      if (!response.statut==200) {
        throw new Error("Erreur lors du chargement des discussions");
      }

      const data = await response.json();
      console.log(data);
      setDiscussions(data?.discussions); // <- data doit être un tableau [{id, nom, lastMessage, date}, ...]
    } catch (error) {
      console.log("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
    console.log("Token dans Discussions:", token);
  }, []);

  // --- Affichage d’une discussion
  const renderDiscussion = ({ item }) => (
    <TouchableOpacity
      style={styles.discussionContainer}
      onPress={() => navigation.navigate("ChatScreen", { discussionId: item.id })}
    >
      {/* Avatar cercle gris */}
     
      <View style={styles.avatar}>
       { item?.interlocuteur.pp ? 
       <Image
       style={{ width: 45, height: 45, borderRadius: 30,resizeMode: "cover", }} 
       source={{
    uri: item?.interlocuteur?.pp
      ? `${API_URL_FILE}/${item?.interlocuteur?.pp}`
      : null,
  }}
        />
       : <Icon name="person" size={30} color="#fff" style={{ alignSelf: "center", marginTop: 7 }} />}     
      </View>

      {/* Nom + dernier message */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{ item?.interlocuteur?.nom.charAt(0).toUpperCase() + item?.interlocuteur?.nom?.slice(1)?.toLowerCase()}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item?.dernierMessage?.message} 
        </Text>
      </View>

      

      {/* Date */}
      <Text style={styles.date}>{(item?.interlocuteur?.id>user?.id && item?.nonlupetit != 0) ? item?.nonlupetit : (item?.interlocuteur?.id<user?.id && item?.nonlugrand !=0) ? item?.nonlugrand : 
     <Text>{item?.date}</Text> 
      } </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#006400" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussions</Text>
        <TouchableOpacity onPress={() => console.log("Nouveau chat")}>
          <MaterialIcons name="add-circle" size={28} color="#006400" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="gray" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Rechercher"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#006400" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={discussions?.filter((d) =>
            d?.interlocuteur?.nom?.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.interlocuteur.id.toString()}
          renderItem={renderDiscussion}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  discussionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#d3d3d3",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "white",
    backgroundColor:"green",
    padding:10
  },
});
