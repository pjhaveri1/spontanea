import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleSignup = () => {
    if (!isChecked) {
      Alert.alert(
        "Terms and Conditions",
        "You must accept the Terms and Conditions before signing up."
      );
      return;
    }
    console.log('Sign Up pressed');
    navigation.navigate('Home' as never);
  };

  const handleSignIn = () => {
    navigation.navigate('Login' as never);
  };

  const handleBack = () => {
    navigation.navigate('LoginSignup' as never);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* White Box Container */}
      <View style={styles.whiteBox}>
        {/* Welcome Text */}
        <Text style={styles.title}>Register new account</Text>
        <Text style={styles.subtitle}>Please enter your details below</Text>

        {/* Input Fields */}
        <TextInput style={styles.input} placeholder="Your name *" />
        <TextInput style={styles.input} placeholder="Password *" secureTextEntry />
        <TextInput style={styles.input} placeholder="Email *" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Phone number *" keyboardType="phone-pad" />

        {/* Terms and Conditions */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checkedBox]}
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            By creating an account, you agree to our
            <Text style={styles.termsText}> Terms {'\n'}and Conditions</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}> Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
            <Text style={styles.socialButtonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.socialButtonText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
            <Text style={styles.socialButtonText}>f</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles (Includes checkbox updates)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66D9EF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: -40,
    marginBottom: -5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  whiteBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#00A9A5',
    borderColor: '#00A9A5',
  },
  checkmark: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  checkboxText: {
    fontSize: 12,
    color: '#666666',
  },
  termsText: {
    color: '#00A9A5',
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00A9A5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
  },
  signInLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
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
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
