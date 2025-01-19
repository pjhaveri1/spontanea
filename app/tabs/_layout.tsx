import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // Disable headers for tabs
        tabBarIcon: ({ color }) => {
          let iconName: React.ComponentProps<typeof FontAwesome>['name'];

          switch (route.name) {
            case 'index':
              iconName = 'home';
              break;
            case 'two':
              iconName = 'compass';
              break;
            case 'profile':
              iconName = 'info-circle';
              break;
            case 'contact':
              iconName = 'envelope';
              break;
            default:
              iconName = 'question-circle';
          }

          return <FontAwesome name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: '#FF6F00',
        tabBarInactiveTintColor: '#1C1C1C',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="two" options={{ title: 'My Adventures' }} />
      <Tabs.Screen name="profile" options={{ title: 'About Us' }} />
      <Tabs.Screen name="contact" options={{ title: 'Contact Us' }} />
    </Tabs>
  );
}
