import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type AdventureResultsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AdventureResults'
>;

type AdventureResultsRouteProp = RouteProp<RootStackParamList, 'AdventureResults'>;

interface AdventureResultsProps {
  route: AdventureResultsRouteProp;
}

export default function AdventureResults({ route }: AdventureResultsProps) {
  const { adventures } = route.params;
  const navigation = useNavigation<AdventureResultsNavigationProp>();

  const renderAdventure = ({ item: adventure }: { item: typeof adventures[0] }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AdventureDetail', { adventure })}
    >
      <View key={adventure.id} style={styles.card}>
        <Image source={{ uri: adventure.photos }} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{adventure.name}</Text>
            <View style={styles.cardRow}>
              <View style={styles.iconTextRow}>
                <Image
                  source={require('../assets/images/location-icon.png')}
                  style={styles.icon}
                />
                <Text style={styles.cardDuration}>
                  {adventure.estimated_duration} Hours
                </Text>
              </View>
              <View style={styles.iconTextRow}>
                <Image
                  source={require('../assets/images/pin-icon.png')}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>{adventure.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }
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

      <Text style={styles.title}>Adventures For You</Text>

      {/* Adventure List */}
      <FlatList
        data={adventures}
        keyExtractor={(item) => item.id}
        renderItem={renderAdventure}
        contentContainerStyle={styles.adventureList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  },
  adventureList: {
    paddingHorizontal: 25,
  },
  card: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'transparent',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardContent: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  cardDuration: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
