import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { PointsContext } from '../app/PointsContext'; // adjust the path as needed
import { LinearGradient } from 'expo-linear-gradient';
// Type Navigation Prop
type NavigationProp = StackNavigationProp<RootStackParamList, 'Missions'>;

// Define TypeScript interface for Missions (with a points property)
interface Mission {
  id: string;
  level: string;
  text: string;
  icon: any;
  gradient: readonly [string, string];
  points: number;
}

const { width } = Dimensions.get('window');

// Map badge names to images. Adjust names and paths to match your assets.
const badgeImages: { [key: string]: any } = {
  'Super Member': require('../assets/images/badge-icon.png'),
  'Traveller': require('../assets/images/badge-icon.png'),
  'Reviewer': require('../assets/images/badge-icon.png'),
  'Player': require('../assets/images/badge-icon.png'),
  'Fact Finder': require('../assets/images/badge-icon.png'),
  'Trailblazer': require('../assets/images/badge-icon.png'),
  'Photographer': require('../assets/images/badge-icon.png'),
  'Good Friend': require('../assets/images/badge-icon.png'),
};

export default function Missions() {
  const navigation = useNavigation<NavigationProp>();
  // Destructure points, addPoints, unlockedBadges, newBadges, clearNewBadges,
  // completedMissions, and completeMission from PointsContext
  const {
    points,
    addPoints,
    unlockedBadges,
    newBadges,
    clearNewBadges,
    completedMissions,
    completeMission,
  } = useContext(PointsContext);

  const [activeTab, setActiveTab] = useState<'Missions' | 'Achievements'>('Missions');
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [badgeToShow, setBadgeToShow] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (newBadges && newBadges.length > 0) {
        setBadgeToShow(newBadges[0]);
        setBadgeModalVisible(true);
      }
    }, [newBadges])
  );

  

  const missions: Mission[] = [
    {
      id: '1',
      level: 'Level 1',
      text: 'Complete a fun photo challenge!',
      icon: require('../assets/images/camera-icon.png'),
      gradient: ['#FF7E5F', '#FEB47B'],
      points: 100,
    },
    {
      id: '2',
      level: 'Level 2',
      text: 'Snap a creative moment!',
      icon: require('../assets/images/location.png'),
      gradient: ['#76B2FE', '#B69EFE'],
      points: 150,
    },
    {
      id: '3',
      level: 'Level 3',
      text: 'Capture a spontaneous shot!',
      icon: require('../assets/images/star-icon.png'),
      gradient: ['#FF6B6B', '#FFD93D'],
      points: 200,
    },
    {
      id: '4',
      level: 'Level 4',
      text: 'Show off your best snapshot!',
      icon: require('../assets/images/handshake-icon.png'),
      gradient: ['#A1C4FD', '#C2E9FB'],
      points: 250,
    },
  ];

  // Sample Data for Achievements (badge names here should match those defined in PointsContext)
  const achievements = [
    { id: '1', name: 'Super Member', icon: require('../assets/images/badge-icon.png') },
    { id: '2', name: 'Traveller', icon: require('../assets/images/badge-icon.png') },
    { id: '3', name: 'Reviewer', icon: require('../assets/images/badge-icon.png') },
    { id: '4', name: 'Player', icon: require('../assets/images/badge-icon.png') },
    { id: '5', name: 'Fact Finder', icon: require('../assets/images/badge-icon.png') },
    { id: '6', name: 'Trailblazer', icon: require('../assets/images/badge-icon.png') },
    { id: '7', name: 'Photographer', icon: require('../assets/images/badge-icon.png') },
    { id: '8', name: 'Good Friend', icon: require('../assets/images/badge-icon.png') },
  ];

  const renderMission = ({ item, index }: { item: Mission; index: number }) => {
    const isCompleted = completedMissions.includes(item.id);
    const isLocked = index > 0 && !completedMissions.includes(missions[index - 1].id);
    return (
      <LinearGradient colors={[item.gradient[0], item.gradient[1]]} style={[styles.missionCard, isLocked && styles.lockedCard]}>
        <View style={styles.missionCardContent}>
          <View>
            <Text style={styles.levelText}>{item.level}</Text>
            <Text style={styles.missionText}>{item.text}</Text>
            <TouchableOpacity
              style={[styles.joinButton, (isCompleted || isLocked) && styles.disabledButton]}
              disabled={isCompleted || isLocked}
              onPress={() => {
                navigation.navigate('MissionScreen', {
                  missionTitle: item.level,
                  missionDescription: item.text,
                  missionPrompt: 'Complete this challenge!',
                  missionPoints: item.points,
                  missionId: item.id,
                });
              }}
            >
              <Text style={styles.joinButtonText}>{isCompleted ? 'Completed' : isLocked ? 'Locked 🔒' : 'Join Now'}</Text>
            </TouchableOpacity>
          </View>
          <Image source={item.icon} style={styles.missionIcon} />
        </View>
      </LinearGradient>
    );
  };

  // Render Achievements (grid layout: 2 per row)
  // Locked achievements are shown with lower opacity.
  const renderAchievement = ({ item }: { item: { id: string; name: string; icon: any } }) => {
    const isUnlocked = unlockedBadges.includes(item.name);
    return (
      <LinearGradient
      colors={isUnlocked ? ['#FFA500', '#FFD700'] : ['#F8F8F8', '#D3D3D3']}
      style={[
          styles.achievementCard,
          { opacity: isUnlocked ? 1 : 0.4 }, // Adjust opacity for locked badges
        ]}
      >
        <Image source={item.icon} style={styles.achievementIcon} />
        <Text style={[styles.achievementText, { color: isUnlocked ? '#000' : '#333' }]}> 
          {item.name}
        </Text>
      </LinearGradient>
    );
  };

  // Function to randomly select a photo mission prompt.
  const getRandomPhotoPrompt = () => {
    const photoPrompts = [
      "Take a photo of something yellow!",
      "Capture a creative shadow!",
      "Snap a selfie with a street sign!",
      "Find an interesting pattern to photograph!",
      "Take a picture of your favorite snack!",
    ];
    return photoPrompts[Math.floor(Math.random() * photoPrompts.length)];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Premium Member Info (Points from context) */}
      <View style={styles.memberInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.memberTitle}>Premium Member</Text>
          <Text style={styles.pointsText}>{points} points</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('Missions')} style={styles.tabContainer}>
          <Text style={[styles.tab, activeTab === 'Missions' && styles.activeTab]}>
            Missions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Achievements')} style={styles.tabContainer}>
          <Text style={[styles.tab, activeTab === 'Achievements' && styles.activeTab]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Missions' ? (
        <FlatList
          key="missions"
          data={missions}
          keyExtractor={(item) => item.id}
          renderItem={renderMission}
          contentContainerStyle={styles.missionList}
        />
      ) : (
        <FlatList
          key="achievements"
          data={achievements}
          keyExtractor={(item) => item.id}
          renderItem={renderAchievement}
          numColumns={2}
          contentContainerStyle={styles.achievementList}
        />
      )}

      {/* Badge Modal Pop-up */}
      <Modal
        visible={badgeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBadgeModalVisible(false)}
      >
        <View style={styles.badgeModalContainer}>
          <View style={styles.badgeModalContent}>
            {badgeToShow && (
              <>
                <Image source={badgeImages[badgeToShow]} style={styles.badgeImage} />
                <Text style={styles.badgeText}>
                  Congratulations! You've unlocked the {badgeToShow}!
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.badgeModalButton}
              onPress={() => {
                setBadgeModalVisible(false);
                clearNewBadges(); // Clear new badges after showing
              }}
            >
              <Text style={styles.badgeModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20,
  },
  backButton: { padding: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  logo: { width: 50, height: 50, resizeMode: 'contain' },
  memberInfo: {
    paddingHorizontal: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  pointsText: { fontSize: 14, fontWeight: 'bold', color: '#FF6B6B' },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  tabContainer: { flex: 1, alignItems: 'center' },
  tab: { paddingVertical: 10, fontSize: 16, color: '#999' },
  activeTab: { color: '#FF6B6B', borderBottomWidth: 2, borderBottomColor: '#FF6B6B' },
  missionList: { padding: 20 },
  missionCard: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  missionCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: { fontSize: 14, color: '#FFF', marginBottom: 5 },
  missionText: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  joinButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  disabledButton: { backgroundColor: '#FFFFFF' },
  joinButtonText: { fontSize: 14, fontWeight: 'bold', color: '#FF6B6B' },
  missionIcon: { width: 40, height: 40, resizeMode: 'contain' },
  lockedIcon: { opacity: 0.5 },
  achievementList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  achievementCard: {
    width: '45%',
    margin: 10,
    paddingVertical: 25,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIcon: { width: 60, height: 60, resizeMode: 'contain', marginBottom: 8 },
  achievementText: { fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  // Badge Modal Styles
  badgeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  badgeModalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeModalButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  badgeModalButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
