import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export function Veterinaires() {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
       
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
        <Text style={styles.headerTitle}>Vétérinaires</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Rechercher"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Veterinarians Grid */}
      <ScrollView style={styles.veterinariansList}>
        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.gridRow}>
            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.gridRow}>
            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Row 3 */}
          <View style={styles.gridRow}>
            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.vetCard}>
              <View style={styles.vetImageContainer}>
                <Image 
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.vetImage}
                />
              </View>
              <Text style={styles.vetName}>Dr Patrice Nsongang</Text>
              <Text style={styles.vetTitle}>Vétérinaire agréé</Text>
              <Text style={styles.vetExperience}>03 ans d'expérience</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('contactvet')} style={styles.moreButton}>
                <Text style={styles.moreButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00AA5B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginRight: 56,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 45,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  veterinariansList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContainer: {
    paddingTop: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vetCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vetImageContainer: {
    marginBottom: 12,
  },
  vetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  vetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  vetTitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  vetExperience: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  moreButton: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
  },
  moreButtonText: {
    fontSize: 12,
    color: '#00AA5B',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: "#0a7b46",
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
});

