import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export function Onboarding2() {
    const navigation = useNavigation()
    return <View style={{flex:1}}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
       <ImageBackground
      source={require('../../assets/images/veterinaire.jpeg') } // Remplace par ton image locale ou un lien
      style={styles.background}
    >

      <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
      {/* Overlay noir transparent */}
      <View style={styles.overlay} />

      {/* Contenu en bas */}
      <View style={styles.content}>
        {/* Ligne 1 : grand texte */}
        <Text style={styles.title}>
          Un veterinaire toujours à vos cotés
        </Text>

        {/* Ligne 2 : petit texte */}
        <Text style={styles.subtitle}>
          Avec Mokine,béneficiez de l'expertise vétérinaire directement sur votre télepnone.Plus besoin d'attendre,l'aide est à portée de main.
        </Text>

        {/* Ligne 3 : deux traits */}
        <View style={styles.stepper}>
          <View style={styles.inactiveLine} />
          <View style={styles.activeLine} />
        </View>

        {/* Ligne 4 : boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('onboarding3')} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('onboarding3')} style={styles.nextButton}>
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
});

    
    
