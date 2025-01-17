import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SignInSignUp() {
  const router = useRouter(); // Navigation router

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/logo.png')}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to Spontanea</Text>
      <Text style={styles.subtitle}>
        Turn Ordinary Days Into Extraordinary Moments
      </Text>

      {/* Sign In Buttons */}
      <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
        <Text style={styles.socialButtonText}>Sign in with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Sign In / Sign Up Buttons */}
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity
          style={[styles.authButton, styles.signInButton]}
          onPress={() => router.push('/auth/login')} // Navigate to Sign In screen
        >
          <Text style={styles.authButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.authButton, styles.signUpButton]}
          onPress={() => router.push('/auth/signup')} // Navigate to Sign Up screen
        >
          <Text style={styles.authButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  socialButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCC',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },
  authButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  authButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  signInButton: {
    backgroundColor: '#3CB371',
  },
  signUpButton: {
    backgroundColor: '#000',
  },
  authButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
