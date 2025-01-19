import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header"; // Adjust the path as needed

export default function Adventure() {
  return (
      <View style={styles.container}>
        {/* Header */}
        <Header />
  
        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>My Favourite Adventures</Text>
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
      paddingTop: 0, // Optional spacing above content
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333333',
    },
  });
  