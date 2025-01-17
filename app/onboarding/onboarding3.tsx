import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding1() {
  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/onboarding-3.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Quick Plans for Busy Days</Text>
      <Text style={styles.subtitle}>
        Spontaneous suggestions that fit your schedule.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
  },
});
