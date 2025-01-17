import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header'; // Adjust path as needed

type ProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AboutUs'>;
};

export default function AboutUs({ navigation }: ProfileProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Content */}
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        At Spontanea, we believe in turning everyday moments into extraordinary
        adventures. Our mission is to help you embrace the unexpected and
        discover joy in spontaneity.
      </Text>
      <Text style={styles.subtitle}>Spontaneity:</Text>
      <Text style={styles.text}>
        Celebrate the joy of living in the moment.
      </Text>
      <Text style={styles.subtitle}>Simplicity:</Text>
      <Text style={styles.text}>
        Easy-to-use features to make planning effortless.
      </Text>
      <Text style={styles.subtitle}>Discovery:</Text>
      <Text style={styles.text}>
        Helping you find hidden gems and new experiences.
      </Text>

      {/* Call to Action Text */}
      <Text style={styles.callToAction}>
        Ready to make every moment count? Start your adventure today with Spontanea!
      </Text>

      {/* Generate Adventure Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GenerateAdventure')}
      >
        <Text style={styles.buttonText}>GENERATE ADVENTURE</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Have feedback or suggestions? Contact us at support@spontanea.com.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: -20,
    marginBottom: 25,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666666',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
  callToAction: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333333',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginTop: 20,
  },
});
