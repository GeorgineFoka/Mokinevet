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
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



export function Discussions() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussions</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('veterinaires')} style={styles.addButton}>
          <View style={styles.addButtonCircle}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
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

      {/* Discussion List */}
      <ScrollView style={styles.discussionsList}>
        {/* Dr Patricia Moungeng */}
        <TouchableOpacity style={styles.discussionItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <View style={styles.discussionContent}>
            <Text style={styles.discussionName}>Dr Patricia Moungeng</Text>
            <Text style={styles.discussionMessage}>Bonjour Dr...</Text>
          </View>
          <View style={styles.discussionMeta}>
            <Text style={styles.discussionTime}>14:10</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Dr Olivia Banga */}
        <TouchableOpacity style={styles.discussionItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>O</Text>
          </View>
          <View style={styles.discussionContent}>
            <Text style={styles.discussionName}>Dr Olivia Banga</Text>
            <Text style={styles.discussionMessage}>Salut très chère</Text>
          </View>
          <View style={styles.discussionMeta}>
            <Text style={styles.discussionTime}>Hier</Text>
          </View>
        </TouchableOpacity>

        {/* Dr Samuelson */}
        <TouchableOpacity style={styles.discussionItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
          <View style={styles.discussionContent}>
            <Text style={styles.discussionName}>Dr Samuelson</Text>
            <Text style={styles.discussionMessage}></Text>
          </View>
          <View style={styles.discussionMeta}>
            <Text style={styles.discussionTime}>23/01/2025</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginTop:10,
  },
  addButton: {
    marginLeft: 16,
  },
  addButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 35,
     backgroundColor: "#0a7b46",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 30,
   
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  discussionsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  discussionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  discussionContent: {
    flex: 1,
  },
  discussionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  discussionMessage: {
    fontSize: 14,
    color: '#666',
  },
  discussionMeta: {
    alignItems: 'flex-end',
  },
  discussionTime: {
    fontSize: 12,
    color: '#00AA5B',
  },
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00AA5B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: "#0a7b46",
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
});

