import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Profil() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="green" />
        </TouchableOpacity>
        <Text style={styles.title}>Profil</Text>
      </View>

      {/* Avatar et infos */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // remplace par ton image
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="edit" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.name}>Aboubakar, éleveur</Text>
        <Text style={styles.subText}>10 animaux suivis</Text>
      </View>

      {/* Section Compte */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>

        <TouchableOpacity style={styles.item}>
          <Icon name="user" size={20} color="black" />
          <Text style={styles.itemText}>Mon profil</Text>
          <MaterialIcons name="chevron-right" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="cow" size={22} color="black" />
          <Text style={styles.itemText}>Mes colliers</Text>
          <MaterialIcons name="chevron-right" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="cow" size={22} color="red" />
          <Text style={styles.itemText}>Mes animaux malades</Text>
          <MaterialIcons name="chevron-right" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Section Préférences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>

        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="web" size={22} color="black" />
          <Text style={styles.itemText}>Langue</Text>
          <MaterialIcons name="expand-more" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={22} color="black" />
          <Text style={styles.itemText}>Notifications</Text>
          <MaterialIcons name="chevron-right" size={22} color="black" />
        </TouchableOpacity>

        <View style={styles.item}>
          <Ionicons name="moon-outline" size={22} color="black" />
          <Text style={styles.itemText}>Mode sombre</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        </View>
      </View>

      {/* Déconnexion */}
      <TouchableOpacity style={styles.logout}>
        <MaterialIcons name="logout" size={22} color="red" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editIcon: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 15,
    position: 'absolute',
    bottom: 30,
    right: 150,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  subText: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    marginTop: 15,
    backgroundColor: '#f5fff5',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 8,
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 8,
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
});
