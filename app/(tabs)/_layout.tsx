import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { SafeAreaView } from "react-native";

// Function for tab bar icons
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Tab Layout Component
export default function TabLayout() {
  const colorScheme = useColorScheme();

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6F00", // Active tab text color
        tabBarInactiveTintColor: "#1C1C1C", // Inactive tab text color
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'OpenSansRegular', // Apply Open Sans for tab labels
          marginTop: 12,
          marginRight: 7,
        },
        tabBarStyle: { backgroundColor: "#66D9EF" }, // Background color of the tab bar
        tabBarIconStyle: {
          marginBottom: -8, // Moves the icon downwards
          marginTop: 4,
          marginRight: 7,
        },
        headerShown: useClientOnlyValue(false, false),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'My Adventures',
          tabBarIcon: ({ color }) => <Entypo name="compass" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'About Us',
          tabBarIcon: ({ color }) => <Entypo name="info-with-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact Us',
          tabBarIcon: ({ color }) => <FontAwesome name="comments-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
