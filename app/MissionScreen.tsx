import React, { useState, useEffect, useContext } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { PointsContext } from '../app/PointsContext'; // adjust the path as needed

const { width } = Dimensions.get('window');

export default function MissionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure the serializable parameters from route.params.
  const { missionTitle, missionDescription, missionPrompt, missionPoints, missionId } = route.params as {
    missionTitle: string;
    missionDescription: string;
    missionPrompt: string;
    missionPoints: number;
    missionId: string;
  };

  // Access the global PointsContext to award points and mark the mission as completed.
  const { completeMission } = useContext(PointsContext);

  const [photo, setPhoto] = useState<string | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);

  // Request camera and media library permissions when the component mounts
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'Camera and media library permissions are needed for this feature.'
        );
      }
    })();
  }, []);

  // Open the camera to take a photo
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (result.canceled) {
        console.log('User canceled camera');
        return;
      }
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setPhoto(uri);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Camera Error', 'An error occurred while taking a photo.');
    }
  };

  // Open the image library to choose a photo
  const choosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (result.canceled) {
        console.log('User canceled image selection');
        return;
      }
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setPhoto(uri);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Gallery Error', 'An error occurred while selecting a photo.');
    }
  };

  // Handle mission submission:
  // Award points and mark the mission as completed using the global completeMission function.
  const handleSubmit = () => {
    if (!photo) {
      Alert.alert('No Photo', 'Please upload a photo before submitting.');
      return;
    }
    completeMission(missionId, missionPoints);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header with back button remains unchanged */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Mission Details Card with LinearGradient background */}
        <LinearGradient colors={['#FFF', '#F0F4F8']} style={styles.missionCard}>
          <Image source={require('../assets/images/Pattern.png')} style={styles.missionImage} />
          <Text style={styles.missionTitle}>{missionTitle}</Text>
          <Text style={styles.missionDescription}>{missionDescription}</Text>
          <Text style={styles.missionPrompt}>{missionPrompt}</Text>
        </LinearGradient>

        {/* Camera & Upload Buttons with refined styling */}
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

        {/* Display the selected/taken photo */}
        {photo && (
          <Animated.View style={[styles.photoContainer, { opacity: fadeAnim }]}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
          </Animated.View>
        )}

        {/* Submit Mission Button with gradient background */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>✅ Submit & Earn Points</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal with refined styling */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/images/checkmark.png')} style={styles.successIcon} />
            <Text style={styles.modalTitle}>Mission Completed!</Text>
            <Text style={styles.modalText}>You earned {missionPoints} points!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    paddingTop: 38,
    paddingLeft: 11,
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
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    // Apply shadow and elevation for a modern look
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 20,
  },
  missionImage: {
    width: '100%',
    height: 160,
    borderRadius: 15,
    marginBottom: 15,
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  missionDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  missionPrompt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.85,
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
    width: width * 0.8,
    height: width * 0.8,
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
    marginTop: 25,
    alignItems: 'center',
    width: width * 0.85,
    // Optional: Add a subtle shadow to the button
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  successIcon: {
    width: 90,
    height: 80,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#76B2FE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
