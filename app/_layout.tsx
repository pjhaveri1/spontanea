import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import TabLayout from './tabs/_layout';
import GenerateAdventure from './GenerateAdventure';
import Opening from './opening';
import LoginAndSignup from './auth/loginandsignup';
import Login from './auth/login';
import Signup from './auth/signup';
import Home from './tabs/index';
import AdventureResults from './AdventureResults';
import AdventureDetail from './AdventureDetail';
import DirectionsPage from './DirectionsPage';
import { RootStackParamList } from '../types';
import { MyAdventuresProvider } from './MyAdventuresContext';
import SeeAllActivities from './SeeAllActivities';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator<RootStackParamList>(); // Use typed navigator

export default function RootLayout() {
  return (
    <>
      <MyAdventuresProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack.Navigator
            initialRouteName="Opening"
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: () => ({
                cardStyle: { opacity: 1 },
              }),
            }}
          >
            <Stack.Screen name="Opening" component={Opening} />
            <Stack.Screen name="LoginSignup" component={LoginAndSignup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={MainDrawerNavigator} />
            <Stack.Screen name="GenerateAdventure" component={GenerateAdventure} />
            <Stack.Screen name="AdventureResults" component={AdventureResults} />
            <Stack.Screen name="AdventureDetail" component={AdventureDetail} />
            <Stack.Screen name="DirectionsPage" component={DirectionsPage} />
            <Stack.Screen name="SeeAllActivities" component={SeeAllActivities} />
          </Stack.Navigator>
        </ThemeProvider>
      </MyAdventuresProvider>
      {/* Toast Message Component */}
      <Toast />
    </>
  );
}

// Drawer Navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 280,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabLayout} />
      <Drawer.Screen
        name="GenerateAdventure"
        options={{ title: 'Generate Adventure' }}
        component={GenerateAdventure}
      />
    </Drawer.Navigator>
  );
}

// Custom Drawer Content
function CustomDrawerContent({ navigation }: any) {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.profileSection}>
        <Image
          source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/user-photo.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Prachi Jhaveri</Text>
        <Text style={styles.userType}>Free Member</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.menuItems}>
        <DrawerItem
          label="Profile"
          icon="user"
          iconType="FontAwesome"
          onPress={() => navigation.navigate('Profile')}
        />
        <DrawerItem
          label="Achievements"
          icon="star"
          iconType="FontAwesome"
          onPress={() => navigation.navigate('Achievements')}
        />
        <DrawerItem
          label="Sign Out"
          icon="log-out"
          iconType="Entypo"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginSignup' }],
            })
          }
        />
      </View>
    </View>
  );
}

// DrawerItem Component
function DrawerItem({
  label,
  icon,
  iconType,
  onPress,
}: {
  label: string;
  icon: string;
  iconType: 'FontAwesome' | 'Entypo';
  onPress: () => void;
}) {
  const IconComponent = iconType === 'FontAwesome' ? FontAwesome : Entypo;
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <IconComponent name={icon as any} size={24} color="black" style={styles.icon} />
      <Text style={styles.drawerLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  drawerContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  profileSection: { marginTop: 60, marginBottom: 30, alignItems: 'center' },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  userType: { fontSize: 14, color: '#666' },
  divider: { height: 1, backgroundColor: '#DDDDDD', marginVertical: 10 },
  menuItems: { marginTop: 15 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  icon: { marginRight: 10 },
  drawerLabel: { fontSize: 16, color: '#333' },
});
