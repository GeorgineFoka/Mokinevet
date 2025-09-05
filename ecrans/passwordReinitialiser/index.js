
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Passwordreinitialiser = ({ navigation }) => {


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
          source={require("../../assets/images/passwordreinitialiser.jpeg")} // ton image
          style={styles.image}
        />

        {/* Texte d'explication */}
        <Text style={styles.subtitle}>
         Votre mot de passe a été réinitialisé avec succès
         
        </Text>
        

        {/* Champ email */}
      

      
        <TouchableOpacity onPress={() => navigation.navigate('verifierpassword')} style={styles.button}>
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
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
  

  
  content: {
    marginTop: 30, // Descendre le contenu
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 25,
    marginTop:50,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});