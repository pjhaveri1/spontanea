import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

type Adventure = {
  photos: string;
  name: string;
  estimated_duration: string;
  category: string;
  address: string;
};

export default function AdventureResults() {
  const route = useRoute();
  const { duration, budget, category }: { duration: number; budget: number[]; category: string } = route.params as any; // Type assertion to access route params
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdventures = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5001/adventures/filter', {
          params: { duration, budget, category },
        });
        setAdventures(response.data);
      } catch (error) {
        console.error('Error fetching adventures:', error);
      }
      setLoading(false);
    };

    fetchAdventures();
  }, [duration, budget, category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adventure Options</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          {adventures.map((adventure, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: adventure.photos }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{adventure.name}</Text>
              <Text style={styles.cardSubtitle}>{adventure.address}</Text>
              <Text style={styles.cardSubtitle}>
                {adventure.estimated_duration} | {adventure.category}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#666' },
});
