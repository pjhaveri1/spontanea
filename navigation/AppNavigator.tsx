import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Index from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/app/(tabs)/index';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // Hide default header
          drawerStyle: {
            backgroundColor: '#FFFFFF',
            width: 300,
          },
        }}
      >
        <Drawer.Screen name="Home" component={Index} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
