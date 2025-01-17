import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on /modal keeps a back button present.
  initialRouteName: '(tabs)', // Set the initial screen to the tab-based layout
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font, // Load FontAwesome for icons
  });

  // Catch any font loading errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Optionally return a loading indicator while fonts are loading
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tab-based screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal screen */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

        {/* Non-tab screen: Generate Adventure */}
        <Stack.Screen
          name="GenerateAdventure"
          options={{
            headerShown: false, // Show the header
            title: "Generate Adventure", // Customize the header title
            headerStyle: {
              backgroundColor: "#66D9EF", // Customize the header background color
            },
            headerTitleStyle: {
              fontFamily: 'SpaceMono', // Use a custom font for the title
              fontSize: 18,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}