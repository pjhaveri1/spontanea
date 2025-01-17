import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header'; // Adjust path as needed

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Contact Us</Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} placeholder="Enter your name" />

          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} placeholder="Enter your surname" />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Enter your message"
            multiline
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    paddingTop: 20, // Optional spacing above content
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    width: '90%', // Form spans the full container width
    maxWidth: 400, // Add a max width for larger screens
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333333',
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
