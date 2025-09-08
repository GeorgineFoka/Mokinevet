import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Modal,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUserStore } from '../../store';
import { useNavigation } from '@react-navigation/native';

export function Profil() {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    // Logique de déconnexion ici
    console.log("Utilisateur déconnecté");
    setShowLogoutModal(false);
    // Navigation vers l'écran de connexion ou autre
    // navigation.navigate('Login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../../assets/images/veterinaire.jpeg')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editButton}>
                <MaterialIcons name="edit" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Aboubakar,éleveur</Text>
            <Text style={styles.animalCount}>10 animaux suivis</Text>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Compte</Text>
            </View>
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="person" size={24} color="#666" />
                <Text style={styles.menuText}>Mon profil</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <MaterialIcons name="settings" size={24} color="#666" />
                <Text style={styles.menuText}>Mes colliers</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="warning" size={24} color="#F44336" />
                <Text style={styles.menuText}>Mes animaux malades</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Préférences</Text>
            </View>
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="language" size={24} color="#666" />
                <Text style={styles.menuText}>Langue</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <MaterialIcons name="notifications" size={24} color="#666" />
                <Text style={styles.menuText}>Notifications</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <View style={styles.menuItem}>
                <MaterialIcons name="dark-mode" size={24} color="#666" />
                <Text style={styles.menuText}>Mode sombre</Text>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor={darkMode ? '#fff' : '#fff'}
                />
              </View>
            </View>
          </View>

          {/* Autres Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Autres</Text>
            </View>
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="book" size={24} color="#666" />
                <Text style={styles.menuText}>Guide d'utilisation</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <MaterialIcons name="help" size={24} color="#666" />
                <Text style={styles.menuText}>FAQs</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
                <MaterialIcons name="support-agent" size={24} color="#666" />
                <Text style={styles.menuText}>Service client</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <MaterialIcons name="privacy-tip" size={24} color="#666" />
                <Text style={styles.menuText}>Politique de confidentialité</Text>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutClick}>
            <MaterialIcons name="logout" size={24} color="#F44336" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Logout Modal */}
        <Modal
          visible={showLogoutModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCancelLogout}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <MaterialIcons name="warning" size={32} color="#F44336" />
                <Text style={styles.modalTitle}>Déconnexion</Text>
              </View>
              
              <Text style={styles.modalMessage}>
                Êtes-vous sûr de vouloir vous déconnecter? Cette action est irréversible.
              </Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleCancelLogout}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.logoutModalButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Déconnecter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e7c21ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  animalCount: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    marginLeft: 16,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 32,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  logoutModalButton: {
    backgroundColor: '#F44336',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});