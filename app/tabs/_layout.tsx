import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import HomeScreen from './index';
import MyAdventuresScreen from './two';
import AboutUsScreen from './profile';
import ContactUsScreen from './contact';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  // Load Fonts
  const [fontsLoaded] = useFonts({
    MontserratBold: Montserrat_700Bold,
    MontserratRegular: Montserrat_400Regular,
    OpenSansRegular: OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Optionally return a loading indicator
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide headers for all tabs
        tabBarIcon: ({ color }) => {
          let iconName: React.ComponentProps<typeof FontAwesome | typeof Entypo>['name'];

          // Define icons based on route names
          if (route.name === 'Home') {
            iconName = 'home';
            return <Entypo name={iconName} size={24} color={color} />;
          } else if (route.name === 'Adventures') {
            iconName = 'compass';
            return <Entypo name={iconName} size={24} color={color} />;
          } else if (route.name === 'About Us') {
            iconName = 'info-with-circle';
            return <Entypo name={iconName} size={24} color={color} />;
          } else if (route.name === 'Contact Us') {
            iconName = 'comments-o';
            return <FontAwesome name={iconName} size={24} color={color} />;
          }

          // Default fallback
          return <FontAwesome name="question-circle" size={24} color={color} />;
        },
        tabBarActiveTintColor: '#FF6F00', // Active tab text color
        tabBarInactiveTintColor: '#1C1C1C', // Inactive tab text color
        tabBarStyle: { 
          backgroundColor: '#66D9EF', // Tab bar background color
          height: 80, // Increase height for better spacing
        },
        tabBarIconStyle: {
          marginTop:5,
          marginBottom: 0, // Adjust icon position lower
          marginRight: 17,
        },
        tabBarLabelStyle: {
          fontFamily: 'OpenSansRegular', // Use custom font for labels
          fontSize: 12, // Set font size for labels
          marginTop: 0, // Add spacing above labels
          marginRight: 17,
          width: '100%',
        },
        tabBarItemStyle: {
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen
        name="Adventures"
        component={MyAdventuresScreen}
        options={{ title: 'My Adventures' }}
      />
      <Tab.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{ title: 'About Us' }}
      />
      <Tab.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{ title: 'Contact Us' }}
      />
    </Tab.Navigator>
  );
}
