import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import TabLayout from './tabs/_layout';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Point to the (tabs) layout */}
        <Drawer.Screen
          name="Home"
          options={{ title: 'Home' }}
          component={TabLayout}
        />

        {/* Other screens like GenerateAdventure */}
        <Drawer.Screen
          name="GenerateAdventure"
          options={{ title: 'Generate Adventure' }}
          getComponent={() => require('./GenerateAdventure').default}
        />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}
