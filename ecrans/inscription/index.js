import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { BallIndicator } from "react-native-indicators";
import { API_URL } from '@env';

export function Inscription() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  // Champs formulaire
  const [nom, setName] = useState("");
  const [statut, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [langue, setLangue] = useState("francais");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nouveau champ
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  // Étape 2 - Région
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");

  // Étape 2 - Ville
  const [villes, setVilles] = useState([]);
  const [ville, setVille] = useState("");

  // Erreurs
  const [errors, setErrors] = useState({});

  // Validation Step 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!nom.trim()) newErrors.nom = "Le nom est requis";
    if (!statut) newErrors.statut = "Le statut est requis";

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  // Validation finale avant envoi
  const handleSignup = async () => {
    setLoading(true);
    const newErrors = {};

    if (!region) newErrors.region = "La région est requise";
    if (!ville) newErrors.ville = "La ville est requise";

    if (!phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (phone.replace(/\D/g, "").length < 9) {
      newErrors.phone = "Le numéro doit contenir au moins 9 chiffres";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post(
        `${API_URL}/inscription`,
        { nom, statut, email, password, region, ville, langue, phone },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status == 200) {
        setLoading(false);
        navigation.navigate("verifieremail", { id: response.data.id });
      } else if (response?.data?.status == 0) {
        setLoading(false);
        setErreur(response.data.errors.email[0]);
      }
    } catch (error) {
      setLoading(false);
      setErreur("Une erreur est survenue lors de l'inscription");
    }
  };

  // Charger les régions du Cameroun
  useEffect(() => {
    const states = State.getStatesOfCountry("CM");
    setRegions(states);
  }, []);

  // Charger les villes quand une région est sélectionnée
  useEffect(() => {
    if (region) {
      const cities = City.getCitiesOfState("CM", region);
      setVilles(cities);
      setVille("");
    }
  }, [region]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Bouton retour */}
        <TouchableOpacity
          onPress={step === 2 ? () => setStep(1) : () => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Inscription</Text>

          {/* Stepper */}
          <View style={styles.stepper}>
            <View style={[styles.stepCircle, step >= 1 ? styles.stepActive : styles.stepInactive]}>
              {step > 1 ? (
                <MaterialCommunityIcons name="check" size={18} color="#fff" />
              ) : (
                <Text style={styles.stepText}>1</Text>
              )}
            </View>
            <View style={[styles.stepLine, step === 2 ? styles.stepLineActive : styles.stepLineInactive]} />
            <View style={[styles.stepCircle, step === 2 ? styles.stepActive : styles.stepInactive]}>
              <Text style={{ color: step === 1 ? "green" : "white" }}>2</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Créez un compte et rejoignez la <Text style={styles.highlight}>Mokine</Text>
          </Text>
          <Text style={{ color: "red", position: "relative", bottom: 20 }}>
            {erreur}
          </Text>

          {/* Formulaire Étape 1 */}
          {step === 1 && (
            <>
              {/* Nom */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="account-outline" size={22} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Entrez votre nom"
                    value={nom}
                    onChangeText={setName}
                    placeholderTextColor="#000"
                  />
                </View>
                {errors.nom && <Text style={styles.errorText}>{errors.nom}</Text>}
              </View>

              {/* Statut */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="briefcase-outline" size={22} color="#666" style={styles.icon} />
                  <Picker
                    selectedValue={statut}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    style={{ flex: 1, height: 50, color: "#000" }}
                  >
                    <Picker.Item label="Choisissez votre statut" value="" />
                    <Picker.Item label="Vétérinaire" value="veterinaire" />
                    <Picker.Item label="Éleveur" value="eleveur" />
                  </Picker>
                  <MaterialCommunityIcons name="menu-down" size={22} color="#666" />
                </View>
                {errors.statut && <Text style={styles.errorText}>{errors.statut}</Text>}
              </View>

              {/* Email */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="email-outline" size={22} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Entrez votre email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#000"
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Mot de passe */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={22} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Saisissez votre mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#000"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Confirmer mot de passe */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={22} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirmer votre mot de passe"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#000"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              </View>

              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Suivant</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Formulaire Étape 2 */}
          {step === 2 && (
            <>
              {/* Région */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="map-marker-outline" size={22} color="#666" style={styles.icon} />
                  <Picker
                    selectedValue={region}
                    onValueChange={(value) => setRegion(value)}
                    style={{ flex: 1, height: 50, color: "#000" }}
                  >
                    <Picker.Item label="Choisir une région" value="" />
                    {regions.map((r) => (
                      <Picker.Item key={r.isoCode} label={r.name} value={r.isoCode} />
                    ))}
                  </Picker>
                  <MaterialCommunityIcons name="menu-down" size={22} color="#666" />
                </View>
                {errors.region && <Text style={styles.errorText}>{errors.region}</Text>}
              </View>

              {/* Ville */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="city" size={22} color="#666" style={styles.icon} />
                  <Picker
                    selectedValue={ville}
                    onValueChange={(value) => setVille(value)}
                    style={{ flex: 1, height: 50, color: "#000" }}
                    enabled={!!region}
                  >
                    <Picker.Item label="Choisir une ville" value="" />
                    {villes.map((v) => (
                      <Picker.Item key={v.name} label={v.name} value={v.name} />
                    ))}
                  </Picker>
                  <MaterialCommunityIcons name="menu-down" size={22} color="#666" />
                </View>
                {errors.ville && <Text style={styles.errorText}>{errors.ville}</Text>}
              </View>

              {/* Téléphone */}
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="phone-outline" size={22} color="#666" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Entrez votre numéro de téléphone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#000"
                  />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              </View>

              <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <TouchableOpacity style={[styles.signupButton, { flex: 1 }]} onPress={handleSignup}>
                  <Text style={styles.signupButtonText}>
                    {loading ? "Inscription" : "S'inscrire"} &nbsp;
                    {loading && <BallIndicator color="white" size={20} />} 
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("connexion")}>
              <Text style={styles.loginLink}>Connectez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Garde ton style existant
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
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 120, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#000" },
  subtitle: { fontSize: 16, color: "#333", textAlign: "center", marginBottom: 40 },
  highlight: { color: "#0a7b46", fontWeight: "bold" },
  stepper: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  stepCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", borderWidth: 2 },
  stepText: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  stepActive: { backgroundColor: "#0a7b46", borderColor: "#0a7b46" },
  stepInactive: { borderColor: "#0a7b46", backgroundColor: "#fff" },
  stepLine: { flex: 1, height: 2, marginHorizontal: 5 },
  stepLineActive: { backgroundColor: "#0a7b46" },
  stepLineInactive: { backgroundColor: "#ccc" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
  },
  icon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: "#000" },
  nextButton: { borderWidth: 1, borderColor: "#0a7b46", paddingVertical: 12, borderRadius: 6, width: "60%", alignItems: "center", marginTop: 20 },
  nextButtonText: { color: "#000", fontSize: 16, fontWeight: "500" },
  signupButton: { backgroundColor: "#0a7b46", paddingVertical: 14, borderRadius: 6, width: "100%", alignItems: "center", marginTop: 20 },
  signupButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  loginRow: { flexDirection: "row", marginTop: 25 },
  loginText: { color: "#333" },
  loginLink: { color: "#0a7b46", fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10, marginLeft: 5, position:"relative",bottom:20 },
});
