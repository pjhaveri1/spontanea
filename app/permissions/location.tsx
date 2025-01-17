import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Location() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enable Location Services</Text>
      <Text style={styles.subtitle}>
        Get the best recommendations of things to do near you.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Turn On Location</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
