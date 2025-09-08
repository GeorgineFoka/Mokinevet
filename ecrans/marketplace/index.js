import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("Boeufs");

  const categories = ["Boeufs", "Vaches", "Veaux", "Chiens"];

  const products = [
    {
      id: "1",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "2",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "3",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "4",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "5",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "6",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "7",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
    {
      id: "8",
      title: "Boeuf goudali",
      price: "500 000 F CFA",
      location: "Extreme-nord Cameroun",
      image: require("../../assets/images/veterinaire.jpeg"),
    },
  ];

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <View style={styles.cardFooter}>
          <AntDesign name="hearto" size={20} color="black" />
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={26} color="green" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mokine Market</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              activeCategory === cat && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2} // 🔥 2 colonnes fixes
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginRight: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#000",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryButtonActive: {
    backgroundColor: "green",
    borderColor: "green",
  },
  categoryText: { color: "#000", fontSize: 14, fontWeight: "500" },
  categoryTextActive: { color: "#fff" },

  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
    overflow: "hidden",
    height: 200, // ✅ Ajuste pour avoir 3 lignes visibles (6 cartes en tout)
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: "#000" },
  cardPrice: { fontSize: 13, fontWeight: "600", color: "#333" },
  cardLocation: { fontSize: 11, color: "#777", marginBottom: 6 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 5,
  },
});
