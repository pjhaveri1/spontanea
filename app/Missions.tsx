import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Missions() {
  const navigation = useNavigation();

  // Sample Data for Missions
  const missions = [
    {
      id: '1',
      level: 'Level 1',
      text: 'Mission 1 Text',
      icon: require('../assets/images/camera-icon.png'),
      gradient: ['#FF7E5F', '#FEB47B'],
    },
    {
      id: '2',
      level: 'Level 2',
      text: 'Mission 2 Text',
      icon: require('../assets/images/location.png'),
      gradient: ['#76B2FE', '#B69EFE'],
    },
    {
      id: '3',
      level: 'Level 3',
      text: 'Mission 3 Text',
      icon: require('../assets/images/star-icon.png'),
      gradient: ['#FF6B6B', '#FFD93D'],
    },
    {
      id: '4',
      level: 'Level 4',
      text: 'Mission 4 Text',
      icon: require('../assets/images/handshake-icon.png'),
      gradient: ['#A1C4FD', '#C2E9FB'],
    },
  ];

  const renderMission = ({ item }: { item: typeof missions[0] }) => (
    <View style={[styles.missionCard, { backgroundColor: item.gradient[0] }]}>
      <View style={styles.missionCardContent}>
        <View>
          <Text style={styles.levelText}>{item.level}</Text>
          <Text style={styles.missionText}>{item.text}</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join now</Text>
          </TouchableOpacity>
        </View>
        <Image source={item.icon} style={styles.missionIcon} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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

      {/* Premium Member Info */}
      <View style={styles.memberInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.memberTitle}>Premium Member</Text>
          <Text style={styles.pointsText}>4685 points</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Missions</Text>
        <Text style={styles.tab}>Achievements</Text>
      </View>

      {/* Mission List */}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
  tab: {
    flex: 1,
    textAlign: 'center',
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
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  missionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
