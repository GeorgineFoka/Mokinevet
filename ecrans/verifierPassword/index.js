// VerifierPassword.js
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

export const VerifierPassword = ({ navigation, route }) => {
  const { email } = route.params || {};

  const [token, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Vérifier le code
  const handleVerify = async () => {
    setError("");
    if (!token) {
      setError("Le code est requis");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (data.statut === 200) {
        navigation.navigate("reinitialiserpassword", { email });
      } else if (data.statut === 0) {
        setError("Code invalide, réessayez !");
      } else {
        setError(data.message || "Erreur de vérification");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  // Renvoyer le code
  const handleResend = async () => {
    setError("");
    setSuccessMessage("");
    try {
      setResending(true);
      const response = await fetch(`${API_URL}/resend-link-forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.statut === 200) {
        setSuccessMessage("Un nouveau code a été envoyé !");
      } else {
        setError(data.message || "Impossible de renvoyer le code");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setResending(false);
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
      <Text style={styles.title}>Vérification</Text>

      <View style={styles.content}>
        {/* Image */}
        <Image
          source={require("../../assets/images/verifiercode.jpeg")}
          style={styles.image}
        />

        {/* Texte explication */}
        <Text style={styles.subtitle}>
          Entrez le code à 4 chiffres envoyé à{"\n"}
          <Text style={{ fontWeight: "bold" }}>{email}</Text>
        </Text>

        {/* Champ code */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez le code"
            placeholderTextColor="black"
            value={token}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        {/* Bouton continuer */}
        <TouchableOpacity
          onPress={handleVerify}
          style={[styles.button, loading && { opacity: 0.7 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continuer</Text>
          )}
        </TouchableOpacity>

        {/* Bouton renvoyer le code */}
        <TouchableOpacity onPress={handleResend} disabled={resending}>
          {resending ? (
            <ActivityIndicator style={{ marginTop: 20 }} size="small" color="#0a7b46" />
          ) : (
            <Text style={{ marginTop: 20, color: "#0a7b46", fontWeight: "bold" }}>
              Renvoyez le code
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
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
  content: { marginTop: 30, alignItems: "center" },
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
    marginBottom: 10,
    width: "100%",
    height: 50,
  },
  input: { flex: 1, fontSize: 15, color: "black" },
  button: {
    backgroundColor: "#0a7b46",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", marginTop: 5 },
  successText: { color: "green", marginTop: 5 },
});
