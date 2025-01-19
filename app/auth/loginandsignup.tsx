import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginAndSignup() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login' as never); // Navigate to Login page
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never); // Navigate to Signup page
  };

  const handleSocialLogin = (platform: string) => {
    console.log(`${platform} Login pressed`);
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/logo.png')}
        style={styles.logo}
      />

      {/* White Box Container */}
      <View style={styles.whiteBox}>
        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Spontanea</Text>
          <Text style={styles.subtitle}>
            Turn Ordinary Days Into Extraordinary Moments
          </Text>
        </View>

        {/* Social Login Buttons */}
        <TouchableOpacity
          style={[styles.socialButton, styles.appleButton]}
          onPress={() => handleSocialLogin('Apple')}
        >
          <Text style={styles.socialButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={() => handleSocialLogin('Google')}
        >
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => handleSocialLogin('Facebook')}
        >
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.divider} />
        </View>

        {/* Sign In and Sign Up Buttons */}
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity
            style={[styles.authButton, styles.signInButton]}
            onPress={handleLogin}
          >
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authButton, styles.signUpButton]}
            onPress={handleSignup}
          >
            <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66D9EF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  logo: {
    width: 141,
    height: 149,
    marginBottom: 20,
  },
  whiteBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  socialButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666666',
  },
  authButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  authButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  signInButton: {
    backgroundColor: '#00A9A5',
  },
  signUpButton: {
    backgroundColor: '#000000',
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
