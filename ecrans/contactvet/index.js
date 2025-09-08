import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function Contactvet() {
  return (
    <ScrollView style={styles.container}>
      {/* Haut de page */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/veterinaire.jpeg")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Dr Patrice Nsongang</Text>
          <Text style={styles.phone}>+237 651 92 06 60</Text>
        </View>
      </View>

      {/* Boutons d’action */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-text" size={28} color="#15803d" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="phone" size={28} color="#15803d" />
          <Text style={styles.actionText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="video" size={28} color="#15803d" />
          <Text style={styles.actionText}>Vidéo</Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.description}>
          "Je suis le Dr. Patrice Nsongang, vétérinaire spécialisé en santé
          bovine et maladies tropicales. Depuis plus de 02 ans,
          j’accompagne les éleveurs pour améliorer la santé et la
          productivité de leurs troupeaux. Je mets l’accent sur des soins
          accessibles, pratiques et adaptés au terrain."
        </Text>
      </View>

      {/* Domaines d’expertise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Domaines d’expertise</Text>
        <Text style={styles.bullet}>• Diagnostic et traitement des maladies</Text>
        <Text style={styles.bullet}>• Vaccination et suivi sanitaire</Text>
        <Text style={styles.bullet}>• Santé reproductive et nutrition animale</Text>
        <Text style={styles.bullet}>• Conseils pour l’élevage moderne</Text>
      </View>

      {/* Localisation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localisation</Text>
        <Text style={styles.text}>
          Disponible partout au Cameroun via l’app Mokine
        </Text>
      </View>

      {/* Favoris et noter */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="heart-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Ajouter au favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="star-outline" size={24} color="#000" />
          <Text style={styles.footerText}>Me noter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", marginTop: 20, marginBottom: 10 },
  backButton: { position: "absolute", left: 15, top: 10 },
  profileContainer: { alignItems: "center", marginTop: 20 },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#000" },
  phone: { fontSize: 14, color: "#555" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  actionButton: { alignItems: "center" },
  actionText: { marginTop: 5, fontSize: 14, color: "#000" },
  section: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  description: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  bullet: { fontSize: 14, color: "#333", marginVertical: 2 },
  text: { fontSize: 14, color: "#333" },
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
    paddingVertical: 10,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  footerText: { marginLeft: 10, fontSize: 14, color: "#000" },
});
