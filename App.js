// App.js
// Ce fichier gère la navigation entre les différents écrans de l'application.

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavigationContainer } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

// Importation des composants d'écrans.
// Assurez-vous que ces fichiers existent dans votre dossier 'ecrans'.
import { Onboarding1 } from './ecrans/onboarding1';
import { Onboarding2 } from './ecrans/onboarding2';
import { Onboarding3 } from './ecrans/onboarding3';// Importation du nouvel écran de connexion
import { Connexion } from './ecrans/connexion';
import { ForgotPassword } from './ecrans/forgotPassword';
import { ReinitialiserPassword, RenitialiserPassword } from './ecrans/reinitialiserPassword';
import { VerifierPassword } from './ecrans/verifierPassword';
import { Passwordreinitialiser } from './ecrans/passwordReinitialiser';
import { Inscription } from './ecrans/inscription';
import { Verifieremail } from './ecrans/verifiermail';
import { Accueil } from './ecrans/accueil';
import { Langue } from './ecrans/langue';
import { Notification, Notifications } from './ecrans/notifications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Discussions } from './ecrans/discussions';
import { Prediagnostic } from './ecrans/prediagnostic';
import { Paramnotif } from './ecrans/paramnotif';
import { Veterinaires } from './ecrans/veterinaires';
import { Contactvet } from './ecrans/contactvet';
import { Marketplace } from './ecrans/marketplace';
import { Profil } from './ecrans/profil';



const Stack = createNativeStackNavigator();


// --- Création du Tab Navigator ---
const Tab = createBottomTabNavigator();

 function MyTabs() {
  return (
  
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // cache l'entête
          tabBarActiveTintColor: "#0a7b46", // couleur active
          tabBarInactiveTintColor: "gray",  // couleur inactive
          tabBarStyle: { backgroundColor: "#fff", height: 60 }, // style
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }, // texte
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={Accueil}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Discussion"
          component={Discussions}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat-processing-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Marketplace"
          component={Marketplace}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  
  );
}


export default function App() {
  const linking = {
    prefixes: ['mokine://'],  // ton scheme
    config: {
      screens: {
        Onboarding1: 'verify', // myapp://verify
      },
    },
  };
  return (
    
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Homepage'>
          <Stack.Screen 
            name="onboarding1" 
            component={Onboarding1} 
            options={{
              headerShown: false // Cache l'en-tête pour cet écran
            }} 
          />

          <Stack.Screen 
            name="Homepage" 
            component={MyTabs} 
            options={{
              headerShown: false
            }} 
          />
         

                  
          <Stack.Screen 
            name="onboarding2" 
            component={Onboarding2} 
            options={{
              headerShown: false
            }} 
          />
         
                  
          <Stack.Screen 
            name="onboarding3" 
            component={Onboarding3} 
            options={{
              headerShown: false
            }} 
          />
          {/* Ajout du nouvel écran de connexion */}
          <Stack.Screen
            name="connexion"
            component={Connexion}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="forgotpassword"
            component={ForgotPassword}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="verifierpassword"
            component={VerifierPassword}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="passwordreinitialiser"
            component={Passwordreinitialiser}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="reinitialiserpassword"
            component={ReinitialiserPassword}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="inscription"
            component={Inscription}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="verifieremail"
            component={Verifieremail}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="accueil"
            component={Accueil}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="langue"
            component={Langue}
            options={{
              headerShown: false
            }}
          />
           <Stack.Screen
            name="notifications"
            component={Notifications}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="prediagnostic" 
            component={Prediagnostic}
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="paramnotif" 
            component={Paramnotif}
            options={{
              headerShown: false
            }} 
          />
           <Stack.Screen 
            name="veterinaires" 
            component={Veterinaires}
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="contactvet" 
            component={Contactvet}
            options={{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="profil" 
            component={Profil}
            options={{
              headerShown: false
            }} 
          />
          
          
          
        
        
        
        
        
        </Stack.Navigator>
      </NavigationContainer>
    
    
  );
}
