// ForgotPassword.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL } from '@env';

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // message d'erreur
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("L'adresse email est requise");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.statut === 200) {
        navigation.navigate("verifierpassword", { email });
      } else {
        setError(data.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton Back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Mot de passe oublié</Text>

      {/* Contenu */}
      <View style={styles.content}>
        {/* Image */}
        <Image
          source={require("../../assets/images/forgotpassword.jpeg")}
          style={styles.image}
        />

        {/* Texte d'explication */}
        <Text style={styles.subtitle}>
          Entrez votre adresse email,
          {"\n"}Nous vous enverrons un code à vérifier.
        </Text>

        {/* Champ email */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Bouton continuer */}
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continuer</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
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
    marginBottom: 5,
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
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 15,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#0a7b46",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
