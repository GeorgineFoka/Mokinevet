import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For arrow and settings
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For the 'x' close icon

const { width } = Dimensions.get('window');


// Dummy data for notifications with a 'read' status
const initialNotifications = [
  { id: '1', message: 'Votre collier numéro 17 est déjà à moins de 20% de batterie, pensez à le recharger..........', isRead: false },
  { id: '2', message: 'Votre collier numéro 17 est déjà à moins de 20% de batterie, pensez à le recharger..........', isRead: false },
  { id: '3', message: 'Votre collier numéro 17 est déjà à moins de 20% de batterie, pensez à le recharger..........', isRead: false },
  { id: '4', message: 'Votre collier numéro 17 est déjà à moins de 20% de batterie, pensez à le recharger..........', isRead: true }, // Example of a read notification
  { id: '5', message: 'Votre collier numéro 17 est déjà à moins de 20% de batterie, pensez à le recharger..........', isRead: true }, // Example of another read notification
];

const NotificationItem = ({ message, isRead, onClose }) => (
  <View style={[styles.notificationItem, isRead ? styles.notificationRead : styles.notificationUnread]}>
    <View style={styles.placeholderCircle} />
    <Text style={styles.notificationText}>{message}</Text>
    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
      <MaterialCommunityIcons name="close" size={20} color="#000" />
    </TouchableOpacity>
  </View>
);

export function Notifications () {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleCloseNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadNotifications = notifications.filter(notif => !notif.isRead);
  const readNotifications = notifications.filter(notif => notif.isRead);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('paramnotif')} >
          <Ionicons name="settings-sharp" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          placeholderTextColor="#888"
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {unreadNotifications.length > 0 && (
          <>
            <Text style={styles.newTitle}>Nouveau</Text>
            {unreadNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                message={notif.message}
                isRead={notif.isRead}
                onClose={() => handleCloseNotification(notif.id)}
              />
            ))}
          </>
        )}

        {/* You can add a section for "Lu" (Read) notifications here if needed,
            but based on the image, only "Nouveau" (Unread) notifications are prominently shown */}
        {/*
        {readNotifications.length > 0 && (
          <>
            <Text style={styles.readTitle}>Lu</Text>
            {readNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                message={notif.message}
                isRead={notif.isRead}
                onClose={() => handleCloseNotification(notif.id)}
              />
            ))}
          </>
        )}
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerIcon: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  newTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  readTitle: { // Style for "Lu" (Read) section title if you decide to add it
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
  },
  notificationUnread: {
    backgroundColor: '#e0f2f7', // Light blue for unread (matching your image)
  },
  notificationRead: {
    backgroundColor: '#ffffff', // White for read (matching your image)
    borderColor: '#eee',
    borderWidth: 1,
  },
  placeholderCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#d0d0d0', // Slightly darker grey for the circle
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
});