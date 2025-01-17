import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding1() {
  const router = useRouter(); // Initialize router for navigation

  return (
    <View style={styles.container}>
      {/* Onboarding Image */}
      <Image
        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/onboarding-1.png')}
        style={styles.image}
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Find Hidden Gems Around You</Text>
      <Text style={styles.subtitle}>
        Uncover unique spots you never knew existed.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding/onboarding2")} // Navigate to the next onboarding screen
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity onPress={() => router.replace("/auth/loginandsignup")}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDF3F5',
    padding: 20,
  },
  image: {
    width: '80%',
    height: '40%',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
