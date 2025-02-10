import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Type Navigation Prop
type NavigationProp = StackNavigationProp<RootStackParamList, 'Missions'>;

// Define TypeScript interfaces for Missions
interface Mission {
  id: string;
  level: string;
  text: string;
  icon: any;
  gradient: string[];
}

export default function Missions() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'Missions' | 'Achievements'>('Missions');
  const [completedMissions, setCompletedMissions] = useState<string[]>(['0']); // Level 1 unlocked initially

  // Sample Data for Missions
  const missions: Mission[] = [
    { id: '1', level: 'Level 1', text: 'Complete a fun photo challenge!', icon: require('../assets/images/camera-icon.png'), gradient: ['#FF7E5F', '#FEB47B'] },
    { id: '2', level: 'Level 2', text: 'Snap a creative moment!', icon: require('../assets/images/location.png'), gradient: ['#76B2FE', '#B69EFE'] },
    { id: '3', level: 'Level 3', text: 'Capture a spontaneous shot!', icon: require('../assets/images/star-icon.png'), gradient: ['#FF6B6B', '#FFD93D'] },
    { id: '4', level: 'Level 4', text: 'Show off your best snapshot!', icon: require('../assets/images/handshake-icon.png'), gradient: ['#A1C4FD', '#C2E9FB'] },
  ];

  // Unlock the next mission
  const completeMission = (id: string) => {
    setCompletedMissions((prev) => [...prev, id]);
  };

  // Function to randomly select a photo mission prompt
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

  // Render Missions
  const renderMission = ({ item, index }: { item: Mission; index: number }) => {
    const isLocked = index > 0 && !completedMissions.includes(missions[index - 1].id);
    return (
      <View style={[styles.missionCard, { backgroundColor: isLocked ? '#CCCCCC' : item.gradient[0] }]}> 
        <View style={styles.missionCardContent}>
          <View>
            <Text style={styles.levelText}>{item.level}</Text>
            <Text style={styles.missionText}>{item.text}</Text>
            <TouchableOpacity
              style={[styles.joinButton, isLocked && styles.disabledButton]}
              disabled={isLocked}
              onPress={() => {
                navigation.navigate('MissionScreen', {
                  missionTitle: item.level,
                  missionDescription: item.text,
                  missionPrompt: getRandomPhotoPrompt(),
                });
                completeMission(item.id);
              }}
            >
              <Text style={styles.joinButtonText}>{isLocked ? 'Locked 🔒' : 'Join Now'}</Text>
            </TouchableOpacity>
          </View>
          <Image source={item.icon} style={[styles.missionIcon, isLocked && styles.lockedIcon]} />
        </View>
      </View>
    );
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

      {/* Premium Member Info */}
      <View style={styles.memberInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.memberTitle}>Premium Member</Text>
          <Text style={styles.pointsText}>4685 points</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('Missions')} style={styles.tabContainer}>
          <Text style={[styles.tab, activeTab === 'Missions' && styles.activeTab]}>Missions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Achievements')} style={styles.tabContainer}>
          <Text style={[styles.tab, activeTab === 'Achievements' && styles.activeTab]}>Achievements</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={renderMission}
        contentContainerStyle={styles.missionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
  memberTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#999',
  },
  activeTab: {
    color: '#FF6B6B',
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  missionList: {
    padding: 20,
  },
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
  levelText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  missionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  joinButton: {
    width: 120,  // Ensures button size stays consistent
    height: 40,  // Ensures button height remains the same
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  disabledButton: {
    backgroundColor: '#BBBBBB',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  lockedIcon: {
    opacity: 0.5,
  },
  missionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  achievementList: {
    padding: 20,
    alignItems: 'center',
  },
  achievementCard: {
    width: '45%',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalBadge: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10 },
  modalPoints: { fontSize: 16, fontWeight: 'bold', color: '#FFA500', marginBottom: 5 },
  modalDescription: { fontSize: 14, textAlign: 'center', color: '#777' },
  modalButtons: { flexDirection: 'row', marginTop: 15, width: '100%', justifyContent: 'space-between' },
  backButtonModal: { padding: 10, backgroundColor: '#333', borderRadius: 10, width: '40%', alignItems: 'center' },
  backButtonText: { color: '#FFF', fontWeight: 'bold' },
  shareButton: { padding: 10, backgroundColor: '#FFA500', borderRadius: 10, width: '40%', alignItems: 'center' },
  shareButtonText: { color: '#FFF', fontWeight: 'bold' },
});
