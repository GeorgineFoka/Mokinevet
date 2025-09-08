import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUserStore } from '../../store';


const { width } = Dimensions.get('window');

export function Accueil({route, navigation}) {
   
   const user = useUserStore((state) => state.user);

  // Données d'exemple pour plusieurs colliers
  const colliersData = [
    {
      id: 1,
      percentage: 19,
      percentageColor: '#F44336',
      collarId: 'n°453tfre67',
      heartRate: '75 bpm',
      temperature: '38°c',
      activity: 'Actif',
      activityColor: '#4CAF50',
      location: 'Extreme nord, maroua'
    },
    {
      id: 2,
      percentage: 72,
      percentageColor: '#4CAF50',
      collarId: 'n°453tfre67',
      heartRate: '75 bpm',
      temperature: '38°c',
      activity: 'Inactif',
      activityColor: '#999',
      location: 'Extreme nord, maroua'
    },
    {
      id: 3,
      percentage: 45,
      percentageColor: '#FF9800',
      collarId: 'n°789abc12',
      heartRate: '82 bpm',
      temperature: '39°c',
      activity: 'Actif',
      activityColor: '#4CAF50',
      location: 'Centre, yaoundé'
    },
    {
      id: 4,
      percentage: 90,
      percentageColor: '#2196F3',
      collarId: 'n°654def34',
      heartRate: '68 bpm',
      temperature: '37°c',
      activity: 'Repos',
      activityColor: '#FFC107',
      location: 'Littoral, douala'
    },
    {
      id: 5,
      percentage: 25,
      percentageColor: '#F44336',
      collarId: 'n°321ghi56',
      heartRate: '95 bpm',
      temperature: '40°c',
      activity: 'Actif',
      activityColor: '#4CAF50',
      location: 'Ouest, bafoussam'
    }
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={() => navigation.navigate('profil')}>
              <Image
                source={require('../../assets/images/veterinaire.jpeg')}
                style={styles.profileImage}
              />
               </TouchableOpacity>
              <View>
                
                <Text style={styles.greeting}>salut</Text>
                <Text style={styles.userName}>{user?.nom}</Text>
               
              </View>
            </View>
            
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.notificationButton}>
                <MaterialIcons name="notifications" size={26} color="#000" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeText}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Card */}
          <View style={styles.dashboardCard}>
            <View style={styles.dashboardHeader}>
              <View style={styles.animalCount}>
                <Text style={styles.countNumber}>10</Text>
                <Text style={styles.countLabel}>Animaux sous surveillance</Text>
              </View>
            </View>

            <View style={styles.dashboardContent}>
              <View style={styles.circularProgress}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressNumber}>10</Text>
                  <Text style={styles.progressLabel}>Animaux</Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View style={[styles.statDot, { backgroundColor: '#FFA726' }]} />
                  <Text style={styles.statPercentage}>70%</Text>
                  <Text style={styles.statLabel}>Sains mais à surveiller de près.</Text>
                  <Text style={styles.statCount}>7 animaux</Text>
                </View>

                <View style={styles.statItem}>
                  <View style={[styles.statDot, { backgroundColor: '#8D6E63' }]} />
                  <Text style={styles.statPercentage}>30%</Text>
                  <Text style={styles.statLabel}>cas confirmés (malades)</Text>
                  <Text style={styles.statCount}>3 animaux</Text>
                  <TouchableOpacity>
                    <MaterialIcons name="chevron-right" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Collar Cards - Scrollview Horizontal */}
          <View style={styles.collarSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.collarScrollContainer}
              style={styles.collarScrollView}
            >
              {colliersData.map((collier) => (
                <View key={collier.id} style={styles.collarCard}>
                  <View style={styles.collarHeader}>
                    <View style={[styles.progressRing, { borderColor: collier.percentageColor }]}>
                      <Text style={styles.ringPercentage}>{collier.percentage}%</Text>
                    </View>
                    <View style={styles.collarInfo}>
                      <Text style={styles.collarTitle}>Collier</Text>
                      <Text style={styles.collarId}>{collier.collarId}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.collarStats}>
                    <View style={styles.statRow}>
                      <MaterialIcons name="favorite" size={18} color="#F44336" style={styles.icon} />
                      <Text style={styles.statValue}>{collier.heartRate}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <MaterialIcons name="device-thermostat" size={18} color="#FF9800" style={styles.icon} />
                      <Text style={styles.statValue}>{collier.temperature}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <MaterialIcons name="pets" size={18} color={collier.activityColor} style={styles.icon} />
                      <Text style={styles.statValue}>{collier.activity}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <MaterialIcons name="location-on" size={18} color="#000" style={styles.icon} />
                      <Text style={styles.statValue}>{collier.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* See More Button */}
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>Voir plus</Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFF3E0' }]} onPress={() => navigation.navigate('prediagnostic')}>
              <MaterialIcons name="psychology" size={32} color="#FF9800" />
              <Text style={styles.actionText}>Mokine IA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E8F5E8' }]}>
              <MaterialIcons name="book" size={32} color="#4CAF50" />
              <Text style={styles.actionText}>Carnets sanitaire</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="location-on" size={32} color="#FF9800" />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>
          </View>

          {/* Articles Section */}
          <View style={styles.articlesSection}>
            {[1, 2, 3].map((_, index) => (
              <TouchableOpacity key={index} style={styles.articleCard}>
                <View style={styles.articleHeader}>
                  <Image
                    source={require('../../assets/images/veterinaire.jpeg')}
                    style={styles.doctorAvatar}
                  />
                  <View>
                    <Text style={styles.doctorName}>Dr Patrice Nsongang</Text>
                    <Text style={styles.articleDate}>31 août 2025</Text>
                  </View>
                </View>
                
                <Image
                  source={require('../../assets/images/veterinaire.jpeg')}
                  style={styles.articleImage}
                />
                
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>
                    Tout savoir sur la grippe bovine : symptomes et traitements
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  time: { fontSize: 16, fontWeight: '600', color: '#000' },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  statusIcon: { marginLeft: 5 },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  greeting: { fontSize: 16, color: '#666' },
  userName: { fontSize: 18, fontWeight: '600', color: '#000' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notificationButton: { position: 'relative', marginRight: 15 },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardCard: {
    backgroundColor: '#E8F5E8',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 20,
    padding: 20,
  },
  animalCount: { flex: 1 },
  countNumber: { fontSize: 24, fontWeight: 'bold', color: '#000', marginRight: 8 },
  countLabel: { fontSize: 16, color: '#666', flex: 1 },
  dashboardContent: { flexDirection: 'row', alignItems: 'center' },
  circularProgress: { marginRight: 20 },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#FFA726',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  progressNumber: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  progressLabel: { fontSize: 12, color: '#666' },
  statsContainer: { flex: 1 },
  statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statPercentage: { fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 8 },
  statLabel: { fontSize: 14, color: '#666', flex: 1 },
  statCount: { fontSize: 12, color: '#999', marginRight: 8 },
  
  // Nouveaux styles pour le scroll horizontal des colliers
  collarSection: {
    marginBottom: 15,
  },
  collarScrollView: {
    paddingLeft: 20,
  },
  collarScrollContainer: {
    paddingRight: 20,
  },
  collarCard: {
    width: 280, // Largeur fixe pour chaque carte
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  collarHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  progressRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ringPercentage: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  collarInfo: { flex: 1 },
  collarTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  collarId: { fontSize: 14, color: '#666' },
  collarStats: { marginTop: 10 },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8, width: 20 },
  statValue: { fontSize: 14, color: '#333', flex: 1 },
  seeMoreButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 20,
    marginBottom: 20,
  },
  seeMoreText: { fontSize: 14, color: '#28a745', textDecorationLine: 'underline' },
  actionButtons: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  actionText: { fontSize: 14, color: '#333', fontWeight: '500' },
  articlesSection: { paddingHorizontal: 20, paddingBottom: 100 },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  articleHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  doctorAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  doctorName: { fontSize: 16, fontWeight: '600', color: '#000' },
  articleDate: { fontSize: 12, color: '#666' },
  articleImage: { width: '100%', height: 180 },
  articleContent: { padding: 15 },
  articleTitle: { fontSize: 16, color: '#333', lineHeight: 22 },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  navItem: { flex: 1, alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#666' },
  activeNavLabel: { color: '#28a745' },
});