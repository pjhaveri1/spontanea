import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserProfile() {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationNotifications, setLocationNotifications] = useState(true);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const togglePushNotifications = () =>
    setPushNotifications((previousState) => !previousState);
  const toggleLocationNotifications = () =>
    setLocationNotifications((previousState) => !previousState);

  // Language options
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  // Function to change language
  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    setLanguageModalVisible(false);
    // Add logic to handle language change, e.g., using i18n or context
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require('../assets/images/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Image
          source={require('../assets/images/user-photo.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>Prachi Jhaveri</Text>
          <Text style={styles.userMembership}>Premium Member</Text>
        </View>
      </View>

      {/* Membership Card */}
      <View style={styles.membershipCard}>
        <Text style={styles.membershipText}>Premium Member</Text>
        <Text style={styles.pointsText}>4685 points</Text>
        <Image
          source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/crown-icon.png')} // Replace with your crown icon
          style={styles.crownIcon}
        />
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Personal Information</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Change Password</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Push notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={togglePushNotifications}
          />
        </View>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Share Location</Text>
          <Switch
            value={locationNotifications}
            onValueChange={toggleLocationNotifications}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Contact support</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Privacy policy</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Text style={styles.sectionItemText}>Terms of services</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.sectionItemText}>{selectedLanguage}</Text>
          <Image
            source={require('../assets/images/arrow-right-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => changeLanguage(item)}
                >
                  <Text style={styles.languageButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setLanguageModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userMembership: {
    fontSize: 14,
    color: '#777',
  },
  membershipCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  membershipText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsText: {
    color: '#FFF',
    fontSize: 14,
  },
  crownIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFA500',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14.5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  sectionItemText: {
    fontSize: 14,
    color: '#333',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  languageButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FF4500',
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
