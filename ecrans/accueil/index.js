
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserStore } from '../../store';

export function Accueil({ route, navigation }) {

  const user = useUserStore((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}></Text>
            </View>
            <Text style={styles.welcome}>Hey, salut </Text>
            <Text style={styles.welcome}>{user?.nom}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('notifications')}>
              <Icon name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcon name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        
        <View style={styles.statsContainer}>
          <View style={styles.card}>
            <View style={[styles.circle, styles.circleGreen]}>
              <Text style={styles.circleText}>72%</Text>
            </View>
            <Text style={styles.cardText}>Collier n°4537fre67</Text>
            <Text style={styles.cardText}>75 bpm</Text>
            <Text style={styles.cardText}>38°C</Text>
            <Text style={styles.cardText}>Actif</Text>
          </View>

          <View style={styles.card}>
            <View style={[styles.circle, styles.circleRed]}>
              <Text style={styles.circleText}>19%</Text>
            </View>
            <Text style={styles.cardText}>Collier n°4537fre67</Text>
            <Text style={styles.cardText}>40 bpm</Text>
            <Text style={styles.cardText}>48°C</Text>
            <Text style={styles.cardText}>Inactif</Text>
          </View>
        </View>

       
        <View style={styles.animauxContainer}>
          <View style={styles.animauxCircle}>
            <Text style={styles.animauxNumber}>10</Text>
          </View>
          <Text style={styles.animauxLabel}>animaux malades</Text>
          <Text style={styles.animauxLabelGreen}>animaux avec colliers</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("prediagnostic")}>
            <MaterialIcon name="brain" size={30} color="black" />
            <Text style={styles.actionText}>Prédiagnostic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} >
            <MaterialIcon name="book-open-outline" size={30} color="black" />
            <Text style={styles.actionText}>Carnet sanitaire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialIcon name="map-marker-outline" size={30} color="black" />
            <Text style={styles.actionText}>Localisation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  profileInitial: { fontWeight: 'bold', fontSize: 16, color: 'black' },
  welcome: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 16 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f0fdf4',
    width: '45%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleGreen: { borderColor: '#16a34a' },
  circleRed: { borderColor: 'red' },
  circleText: { fontWeight: 'bold', color: 'black' },
  cardText: { marginVertical: 2, fontSize: 14, color: 'black' },
  animauxContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  animauxCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  animauxNumber: { fontSize: 32, fontWeight: 'bold', color: 'black' },
  animauxLabel: { fontSize: 16, color: 'black' },
  animauxLabelGreen: { fontSize: 16, color: '#0a7b46' },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionCard: {
    alignItems: 'center',
    width: 100,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
  },
  actionText: { fontSize: 12, marginTop: 4, textAlign: 'center', color: 'black' },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  tab: { alignItems: 'center' },
  tabText: { fontSize: 12, marginTop: 2 },
});