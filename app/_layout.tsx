import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Tabs } from 'expo-router'; // Use Tabs for the (tabs) route
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(index)',
};

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Map (tabs) as a Tab Navigator */}
        <Drawer.Screen
          name="Tabs"
          options={{ title: 'Home' }}
          component={Tabs} // This links the (tabs) folder automatically
        />

        {/* Add Generate Adventure */}
        <Drawer.Screen
          name="GenerateAdventure"
          options={{
            title: 'Generate Adventure',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#66D9EF',
            },
            headerTitleStyle: {
              fontFamily: 'SpaceMono',
              fontSize: 18,
            },
          }}
          component={() => <Tabs initialRouteName="GenerateAdventure" />}
        />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}
