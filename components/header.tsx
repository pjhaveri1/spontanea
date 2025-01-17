import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter(); // Use router to navigate or open the drawer

  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => router.push('(drawer)')}>
        <Image
          source={require('../assets/images/menu-icon.png')}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 70,
    height: 70,
  },
  menuIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
