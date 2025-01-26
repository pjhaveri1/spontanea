import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useMyAdventures } from './MyAdventuresContext';

type AdventureDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AdventureDetail'
>;

type AdventureDetailRouteProp = RouteProp<RootStackParamList, 'AdventureDetail'>;

interface AdventureDetailProps {
  route: AdventureDetailRouteProp;
}

export default function AdventureDetail({ route }: AdventureDetailProps) {
  const { adventure } = route.params;
  const navigation = useNavigation<AdventureDetailNavigationProp>();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Details' | 'Reviews'>('Overview');

  // Access the context for saving adventures
  const { addAdventure, myAdventures } = useMyAdventures();

  // Check if the adventure is already saved
  const isSaved = myAdventures.some((saved) => saved.id === adventure.id);

  const handleSaveAdventure = () => {
    if (isSaved) {
      Toast.show({
        type: 'info',
        text1: 'Adventure already saved!',
        text2: `${adventure.name} is already in your favorites.`,
      });
    } else {
      addAdventure(adventure);
      Toast.show({
        type: 'success',
        text1: 'Adventure added!',
        text2: `${adventure.name} has been saved to your favorites.`,
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <Text style={styles.description}>
            {adventure.overview || 'Overview content is not available for this adventure.'}
          </Text>
        );
      case 'Details':
        return (
          <Text style={styles.description}>
            {adventure.details || 'Details content is not available for this adventure.'}
          </Text>
        );
      case 'Reviews':
        return (
          <ScrollView horizontal style={styles.reviewsContainer} showsHorizontalScrollIndicator={false}>
            {adventure.reviews && adventure.reviews.length > 0 ? (
              adventure.reviews.map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.description}>No reviews available for this adventure.</Text>
            )}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Adventure Image */}
      <Image source={{ uri: adventure.photos }} style={styles.adventureImage} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButtonContainer}
        >
            <Image
                source={require('../assets/images/back-icon.png')}
                style={styles.backIcon}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveAdventure}>
            <Image
                source={require('../assets/images/heart-icon.png')}
                style={[
                    styles.heartIcon,
                    isSaved ? { tintColor: 'red' } : { tintColor: 'gray' },
                ]}
            />
        </TouchableOpacity>
      </View>


      {/* Adventure Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{adventure.name}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ 5.0 (3.6K)</Text>
          <View style={styles.costContainer}>
            <Text style={styles.cost}>${adventure.budget}</Text>
            <Text style={styles.estimatedCost}>*Estimated Cost</Text>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Overview')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Overview' && styles.activeTab,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Details')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Details' && styles.activeTab,
              ]}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Reviews')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Reviews' && styles.activeTab,
              ]}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.contentContainer}>
          {renderContent()}
        </ScrollView>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image
              source={require('../assets/images/clock-icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{adventure.estimated_duration} Hours</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              source={require('../assets/images/location-icon-2.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{adventure.address}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              source={require('../assets/images/weather-icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>32°C</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('DirectionsPage', { adventure })}
      >
        <Text style={styles.actionButtonText}>Let's go with this!</Text>
      </TouchableOpacity>

      {/* Toast Message */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    zIndex: 10,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
  },
  heartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  adventureImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -55,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  cost: {
    fontSize: 16,
    color: '#00A9A5',
    fontWeight: 'bold',
  },
  estimatedCost: {
    fontSize: 12,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#00A9A5',
    borderBottomWidth: 2,
    borderBottomColor: '#00A9A5',
    paddingBottom: 5,
  },
  contentContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  reviewsContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  reviewCard: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    width: 250,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#00A9A5',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
