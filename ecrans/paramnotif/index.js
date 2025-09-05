// screens/NotificationsScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function Paramnotif() {
  const navigation = useNavigation();

  // États pour chaque switch
  const [sound, setSound] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [priority, setPriority] = useState(false);
  const [reactions, setReactions] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="green" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      {/* CONTENU */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Section Messages */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Son des messages</Text>
              <Text style={styles.subLabel}>
                Jouer un son pour les messages entrants et sortants
              </Text>
            </View>
            <Switch value={sound} onValueChange={setSound} />
          </View>

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Rappels</Text>
              <Text style={styles.subLabel}>
                Recevez des rappels occasionnels à propos des messages non lus,
                des appels manqués ou des mises à jour par rapport aux
                fonctionnalités
              </Text>
            </View>
            <Switch value={reminders} onValueChange={setReminders} />
          </View>

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>
                Notifications de priorité importante
              </Text>
              <Text style={styles.subLabel}>
                Afficher les aperçus des notifications en haut de l'écran
              </Text>
            </View>
            <Switch value={priority} onValueChange={setPriority} />
          </View>

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Notifications des réactions</Text>
              <Text style={styles.subLabel}>
                Afficher les notifications pour les réactions aux messages que
                vous envoyez
              </Text>
            </View>
            <Switch value={reactions} onValueChange={setReactions} />
          </View>
        </View>

        {/* Section Appels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appels</Text>
          <Text style={styles.optionDisabled}>Sonnerie - Sonnerie par défaut</Text>
          <Text style={styles.optionDisabled}>Vibreur - Par défaut</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 28, // pour compenser la flèche
    color: "black",
  },
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: { flex: 1, marginRight: 10 },
  label: { fontSize: 16, fontWeight: "600" },
  subLabel: { fontSize: 13, color: "gray" },
  optionDisabled: {
    fontSize: 15,
    color: "gray",
    marginVertical: 8,
  },
});
