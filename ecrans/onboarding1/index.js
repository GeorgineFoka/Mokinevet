import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from "react-native";

export function Onboarding1() {
    const navigation = useNavigation()
    return <View style={{flex:1}}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
       <ImageBackground
      source={require('../../assets/images/eleveur.jpeg') } // Remplace par ton image locale ou un lien
      style={styles.background}
    >
      {/* Overlay noir transparent */}
      <View style={styles.overlay} />

      {/* Contenu en bas */}
      <View style={styles.content}>
        {/* Ligne 1 : grand texte */}
        <Text style={styles.title}>
          Protéger vos animaux même à distance
        </Text>

        {/* Ligne 2 : petit texte */}
        <Text style={styles.subtitle}>
          Les maladies animales frappent sans prévenir. Chaque perte est un coup
          dur pour votre famille et votre communauté.
        </Text>

        {/* Ligne 3 : deux traits */}
        <View style={styles.stepper}>
          <View style={styles.activeLine} />
          <View style={styles.inactiveLine} />
        </View>

        {/* Ligne 4 : boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('onboarding3')} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('onboarding2')} style={styles.nextButton}>
            <Text style={styles.nextText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </View>
    }
    const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000b9", // voile noir léger
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 25,
  },
  stepper: {
    flexDirection: "row",
    marginBottom: 30,
  },
  activeLine: {
    width: 30,
    height: 4,
    backgroundColor: "#0a7b46",
    borderRadius: 2,
    marginHorizontal: 5,
  },
  inactiveLine: {
    width: 30,
    height: 4,
    backgroundColor: "#fff",
    borderRadius: 2,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 15,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#0a7b46",

  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

    
    
