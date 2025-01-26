import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useMyAdventures } from './MyAdventuresContext';

type DirectionsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DirectionsPage'
>;

type DirectionsPageRouteProp = RouteProp<RootStackParamList, 'DirectionsPage'>;

interface DirectionsPageProps {
  route: DirectionsPageRouteProp;
}

export default function DirectionsPage({ route }: DirectionsPageProps) {
  const { adventure } = route.params;
  const navigation = useNavigation<DirectionsPageNavigationProp>();

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

  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${adventure.latitude},${adventure.longitude}`;
    Linking.openURL(url).catch((err) =>
      Toast.show({
        type: 'error',
        text1: 'Error opening map',
        text2: 'An error occurred while opening the map.',
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={{ uri: adventure.photos }} style={styles.backgroundImage} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      {/* White Box */}
      <View style={styles.whiteBox}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>{adventure.name}</Text>
          <View style={styles.row}>
            <Text style={styles.rating}>⭐ 5.0 (3.6K)</Text>
            <View style={styles.costContainer}>
              <Text style={styles.cost}>${adventure.budget}</Text>
              <Text style={styles.estimatedCost}>*Estimated Cost</Text>
            </View>
          </View>

          {/* Tab */}
          <View style={styles.tabContainer}>
            <Text style={styles.activeTab}>Route</Text>
          </View>

          {/* Interactive Map */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: adventure.latitude,
              longitude: adventure.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleOpenMap} // Open external map app when map is clicked
          >
            <Marker
              coordinate={{
                latitude: adventure.latitude,
                longitude: adventure.longitude,
              }}
              title={adventure.name}
              description={adventure.address}
            />
          </MapView>

          {/* Directions */}
          <Text style={styles.sectionTitle}>Directions</Text>
          {adventure.directions && adventure.directions.length > 0 ? (
            adventure.directions.map((step: string, index: number) => (
              <Text key={index} style={styles.directionStep}>
                {`${index + 1}. ${step}`}
              </Text>
            ))
          ) : (
            <Text style={styles.directionStep}>No directions available.</Text>
          )}

          {/* Additional Info */}
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
        </ScrollView>
      </View>

      {/* Toast Message */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  backgroundImage: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    marginTop: 40,
  },
  backIcon: { width: 24, height: 24 },
  heartIcon: { width: 24, height: 24 },
  whiteBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '15%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContent: { flexGrow: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rating: { fontSize: 16, color: '#666' },
  costContainer: { alignItems: 'flex-end' },
  cost: { fontSize: 20, color: '#00A9A5', fontWeight: 'bold' },
  estimatedCost: { fontSize: 12, color: '#666' },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A9A5',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#00A9A5',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  directionStep: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { width: 30, height: 30, marginRight: 5 },
  infoText: { fontSize: 14, color: '#333' },
});
