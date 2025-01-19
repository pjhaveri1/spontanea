import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { View, Text, StyleSheet, Image } from 'react-native';
import TabLayout from './tabs/_layout';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // Hide headers globally
          drawerPosition: 'right', // Open drawer from the right
          drawerStyle: {
            width: 280, // Adjust drawer width
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* Tabs Layout */}
        <Drawer.Screen
          name="Home"
          options={{ title: 'Home' }}
          component={TabLayout}
        />

        {/* Generate Adventure Screen */}
        <Drawer.Screen
          name="GenerateAdventure"
          options={{ title: 'Generate Adventure' }}
          getComponent={() => require('./GenerateAdventure').default}
        />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}

// Custom Drawer Content
function DrawerItem({
  label,
  icon,
  iconType,
}: {
  label: string;
  icon: string;
  iconType: 'FontAwesome' | 'Entypo';
}) {
  const IconComponent = iconType === 'FontAwesome' ? FontAwesome : Entypo;

  return (
    <View style={styles.drawerItem}>
      {/* Ensure IconComponent renders properly */}
      <IconComponent name={icon as any} size={24} color="black" style={styles.icon} />
      <Text style={styles.drawerLabel}>{label}</Text>
    </View>
  );
}

function CustomDrawerContent({ navigation }: any) {
  return (
    <View style={styles.drawerContainer}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/user-photo.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Prachi Jhaveri</Text>
        <Text style={styles.userType}>Premium Member</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Drawer Items */}
      <View style={styles.menuItems}>
        <DrawerItem label="Profile" icon="user" iconType="FontAwesome" />
        <DrawerItem label="Achievements" icon="trophy" iconType="FontAwesome" />
        <DrawerItem label="Sign Out" icon="log-out" iconType="Entypo" />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    marginTop: 60,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1, // Height of the divider line
    backgroundColor: '#DDDDDD', // Light gray color for the divider
    marginVertical: 0, // Spacing around the divider
  },
  menuItems: {
    marginTop: 15,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    marginRight: 10,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#333',
  },
});
