import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Opening() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay for the splash screen
    const timer = setTimeout(() => {
      router.replace('/onboarding/onboarding1'); // Navigate to onboarding1
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.tagline}>Small Adventures, Big Joys</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  tagline: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
