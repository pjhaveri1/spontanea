import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Opening() {
  const navigation = useNavigation();

  useEffect(() => {
    // Redirect to LoginAndSignup after 2 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('LoginSignup' as never);
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')} // Update path as necessary
        style={styles.logo}
      />
      <Text style={styles.tagline}>SMALL ADVENTURES, BIG JOYS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66D9EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height:140, // Adjusted for better scaling
    marginBottom: 0,
  },
  tagline: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
