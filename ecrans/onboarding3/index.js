// ecrans/onboarding3.js
// Ce composant représente l'écran d'onboarding final.

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Exportation en tant que composant nommé, prêt à être importé par le navigateur.
export function Onboarding3() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        source={require("../../assets/images/veterinaire2.jpeg")} // Mettez votre image ici
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue sur Mokine</Text>

          <TouchableOpacity style={styles.btnPrimary}
          onPress={() => navigation.navigate('inscription')}>

            <Text style={styles.btnTextPrimary}>S’inscrire</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('connexion')} // Ajout de la navigation vers la page de connexion
          >
            <Text style={styles.btnTextSecondary}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000b9",
  },
  content: {
    padding: 20,
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  btnPrimary: {
    backgroundColor: "#0a7b46",
    paddingVertical: 14,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  btnTextPrimary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSecondary: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  btnTextSecondary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
