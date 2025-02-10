import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary, CameraOptions } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

export default function MissionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get mission details
  const { missionTitle, missionDescription, missionPrompt } = route.params as {
    missionTitle: string;
    missionDescription: string;
    missionPrompt: string;
  };

  const [photo, setPhoto] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);

  // Open Camera
  const takePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.assets?.length) {
        setPhoto(response.assets[0]?.uri || null);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  // Open Gallery
  const choosePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.assets?.length) {
        setPhoto(response.assets[0]?.uri || null);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  // Handle Mission Submission
  const handleSubmit = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header with back button only */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Mission Details Card */}
        <View style={styles.missionCard}>
          <Image source={require('../assets/images/Pattern.png')} style={styles.missionImage} />
          <Text style={styles.missionTitle}>{missionTitle}</Text>
          <Text style={styles.missionDescription}>{missionDescription}</Text>
          <Text style={styles.missionPrompt}>{missionPrompt}</Text>
        </View>

        {/* Camera & Upload Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Image source={require('../assets/images/camera-icon.png')} style={styles.buttonIcon} />
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={choosePhoto}>
            <Image source={require('../assets/images/upload-icon.png')} style={styles.buttonIcon} />
            <Text style={styles.uploadButtonText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Display Taken/Uploaded Photo */}
        {photo && (
          <Animated.View style={[styles.photoContainer, { opacity: fadeAnim }]}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
          </Animated.View>
        )}

        {/* Submit Mission Button (Always Visible) */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>✅ Submit & Earn Points</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal */}
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/images/checkmark.png')} style={styles.successIcon} />
            <Text style={styles.modalTitle}>Mission Completed!</Text>
            <Text style={styles.modalText}>You have successfully submitted your mission.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Missions' as never);
              }}
            >
              <Text style={styles.modalButtonText}>Back to Missions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    paddingTop: 38,
    paddingLeft:11,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  missionCard: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  missionImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  missionDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  missionPrompt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    marginTop: 20,
  },
  photoButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#FFF',
  },
  photoButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  photoContainer: {
    marginTop: 20,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#76B2FE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    width: width * 0.8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    width: 85,
    height: 71,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#76B2FE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
