import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Langue() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (langue) => {
    setSelectedLanguage(langue);
    // Rediriger vers l'écran d'inscription avec la langue sélectionnée
    navigation.navigate("onboarding1", { langue });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.title}>Choix de la langue</Text>
        <Text style={styles.subtitle}>
          Pour continuer, vous devez choisir votre langue d'utilisation de
          l'application
        </Text>

        {/* Bouton Français */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect("francais")}
        >
          <Image
            source={{ uri: "https://flagcdn.com/w20/fr.png" }} // Drapeau France
            style={styles.flag}
          />
          <Text style={styles.languageText}>Français</Text>
        </TouchableOpacity>

        {/* Bouton Anglais */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect("anglais")}
        >
          <Image
            source={{ uri: "https://flagcdn.com/w20/gb.png" }} // Drapeau Royaume-Uni
            style={styles.flag}
          />
          <Text style={styles.languageText}>Anglais</Text>
        </TouchableOpacity>

        {/* Bouton Fulfuldé */}
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => handleLanguageSelect("fulfulde")}
        >
          <Image
            source={{ uri: "https://flagcdn.com/w20/cm.png" }} // Drapeau Cameroun (représentant Fulfuldé)
            style={styles.flag}
          />
          <Text style={styles.languageText}>Fulfuldé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  languageText: {
    fontSize: 18,
    color: "#000",
  },
});

