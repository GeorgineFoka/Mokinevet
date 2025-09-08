import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUserStore } from "../../store";
import {API_URL} from '@env';

export function Connexion() {
  const navigation = useNavigation();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // spinner

  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");



  const setUser = useUserStore((state) => state.setUser);

  
  const handleLogin = async () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setApiError("");

   
    if (!email) {
      setEmailError("L'email est obligatoire");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format de l'email invalide");
      valid = false;
    }

    // Validation mot de passe
    if (!password) {
      setPasswordError("Le mot de passe est obligatoire");
      valid = false;
    }

    if (!valid) return;

    setLoading(true); // démarrer le spinner

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.statut == 200) {
        // Sauvegarde dans zustand
        setUser({
          id:data?.user?.id,
          nom: data?.user?.nom ?? "",
          token: data?.token ?? "",
        });

        navigation.navigate("accueil");
      } else {
        setApiError(data?.message || "Identifiants incorrects");
      }
    } catch (error) {
      setApiError("Erreur réseau, veuillez réessayer");
    } finally {
      setLoading(false); // arrêter le spinner
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Bouton de retour */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Très content de vous revoir parmi nous</Text>

        {/* Message d'erreur API */}
        {apiError ? <Text style={{color:"red",textAlign:"center",position:"relative",bottom:20}}>{apiError}</Text> : null}

        {/* Champ Email */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#000"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Champ Mot de passe */}
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
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Se souvenir & mot de passe oublié */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && (
                <MaterialCommunityIcons name="check" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.optionText}>Se souvenir de moi</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
            <Text style={styles.forgotPasswordText}>mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton Connexion */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        {/* Lien Inscription */}
        <View style={styles.createAccountRow}>
          <Text style={styles.createAccountText}>
            Vous n'avez pas de compte?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("inscription")}>
            <Text style={styles.createAccountLink}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#0a7b46",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 100,
    alignItems: "center",
    marginTop: 70,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 40 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  icon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: "#000" },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
    marginTop: 10,
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#0a7b46",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  checkboxActive: { backgroundColor: "#0a7b46" },
  optionText: { fontSize: 14, color: "#333" },
  forgotPasswordText: { color: "#0a7b46" },
  loginButton: {
    backgroundColor: "#0a7b46",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  createAccountRow: { flexDirection: "row", marginTop: 20 },
  createAccountText: { color: "#666" },
  createAccountLink: { color: "#0a7b46", fontWeight: "bold" },
});
