// ReinitialiserPassword.js
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

export const ReinitialiserPassword = ({ navigation,route }) => {
  const { email } = route.params || {};

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    let valid = true;
    setErrorPassword("");
    setErrorConfirm("");

    if (!password) {
      setErrorPassword("Veuillez saisir un mot de passe.");
      valid = false;
    }
    if (password !== confirmPassword) {
      setErrorConfirm("Les mots de passe ne correspondent pas.");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password,email }),
      });

      const data = await response.json();

      if (data.statut === 200) {
        // succès => redirection connexion
        navigation.navigate("connexion");
      } else {
        setErrorConfirm(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setErrorConfirm("Erreur de connexion au serveur.");
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
      <Text style={styles.title}>Réinitialisation</Text>

      {/* Contenu */}
      <View style={styles.content}>
        {/* Image */}
        <Image
          source={require("../../assets/images/reinitialiser.jpeg")}
          style={styles.image}
        />

        <Text style={styles.subtitle}>
          Entrez votre nouveau mot de passe.
        </Text>

        {/* Champ mot de passe */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Saisissez votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#000"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {errorPassword ? (
          <Text style={styles.errorText}>{errorPassword}</Text>
        ) : null}

        {/* Champ confirmation */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={24}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#000"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {errorConfirm ? (
          <Text style={styles.errorText}>{errorConfirm}</Text>
        ) : null}

        {/* Bouton continuer */}
        <TouchableOpacity
          onPress={handleResetPassword}
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
  icon: { marginRight: 8 },
  textInput: { flex: 1, fontSize: 16, color: "#000" },
  button: {
    backgroundColor: "#0a7b46",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 13, marginBottom: 10, alignSelf: "flex-start" },
});
