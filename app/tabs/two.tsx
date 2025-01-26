import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header';
import { useMyAdventures } from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/app/MyAdventuresContext'; // Import the context
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/types';


type NavigationProp = StackNavigationProp<RootStackParamList, 'AdventureDetail'>;

export default function Adventure() {
  const { myAdventures, removeAdventure } = useMyAdventures(); // Get saved adventures and remove method
  const navigation = useNavigation<NavigationProp>();

  const handleRemoveAdventure = (id: string) => {
    removeAdventure(id);
  };

  const renderAdventureItem = ({ item }: { item: typeof myAdventures[0] }) => (
    <TouchableOpacity
      style={styles.adventureCard}
      onPress={() => navigation.navigate('AdventureDetail', { adventure: item })}
    >
      {/* Adventure Image */}
      <Image source={{ uri: item.photos }} style={styles.adventureImage} />

      {/* Heart Icon */}
      <TouchableOpacity
        style={styles.heartIconContainer}
        onPress={() => handleRemoveAdventure(item.id)}
      >
        <Image
          source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/heart-icon.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>

      {/* Overlay with Info */}
      <View style={styles.overlay}>
        <Text style={styles.adventureTitle}>{item.name}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image
              source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/location-icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item.estimated_duration} Hours</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/pin-icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>My Favourite Adventures</Text>

        {/* List of Adventures */}
        {myAdventures.length > 0 ? (
          <FlatList
            data={myAdventures}
            renderItem={renderAdventureItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.noAdventuresText}>No saved adventures yet.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  adventureCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  adventureImage: {
    width: '100%',
    height: 200,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: 'red',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  adventureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#FFF',
  },
  noAdventuresText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
