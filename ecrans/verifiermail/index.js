import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from '@env';
import { useUserStore } from "../../store"; // Assurez-vous que store/index.js exporte useUserStore

export const Verifieremail = ({ navigation, route }) => {
  const { id } = route.params;
  const [tokenInput, setTokenInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Zustand
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const user = useUserStore((state) => state.user);


  const verifier = async () => {
    if (!tokenInput) {
      Alert.alert("Erreur", "Veuillez entrer le code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/verify-email`,
        { id, token: tokenInput },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.statut === 200) {
        setUser(response?.data?.user);
        setToken(response?.data?.token);
        setLoading(false);
        navigation.replace("accueil");
      } else {
        setLoading(false);
        Alert.alert("Erreur", response?.data?.message || "Code invalide");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Erreur", "Une erreur est survenue lors de la vérification");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Vérification</Text>

      <View style={styles.content}>
        <Image
          source={require("../../assets/images/verifiercode.jpeg")}
          style={styles.image}
        />
        <Text style={styles.subtitle}>
          Entrez le code à 4 chiffres envoyé à votre adresse email.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez le code"
            placeholderTextColor="black"
            value={tokenInput}
            onChangeText={setTokenInput}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity onPress={verifier} style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continuer</Text>
          )}
        </TouchableOpacity>

        <Text style={{ marginTop: 20, color: "black" }}>
          Vous n’avez pas reçu de code? <Text style={{ color: "#0a7b46" }}>Renvoyez</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    backgroundColor: "#0a7b46",
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    marginTop: 30,
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 25,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "black",
    marginBottom: 25,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    width: "100%",
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "black",
  },
  button: {
    backgroundColor: "#0a7b46",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
