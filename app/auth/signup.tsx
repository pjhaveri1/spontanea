import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New Account</Text>
      <TextInput style={styles.input} placeholder="Your Name *" />
      <TextInput style={styles.input} placeholder="Email *" />
      <TextInput style={styles.input} placeholder="Password *" secureTextEntry />
      <TextInput style={styles.input} placeholder="Phone Number *" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By creating an account, you agree to our{' '}
        <Text style={styles.link}>Terms and Conditions</Text>.
      </Text>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.link}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DDF3F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});
