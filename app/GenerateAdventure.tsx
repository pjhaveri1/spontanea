import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';

export default function GenerateAdventure() {
  const [duration, setDuration] = useState(5); // Default duration in hours
  const [budgetRange, setBudgetRange] = useState([50, 150]); // Default budget range
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Single selected category

  const navigation = useNavigation();

  const categories = [
    { id: '1', name: 'Nature', image: require('../assets/images/nature.jpg') },
    { id: '2', name: 'Outdoor Activities', image: require('../assets/images/outdoor.jpg') },
    { id: '3', name: 'Beach', image: require('../assets/images/beach.jpg') },
    { id: '4', name: 'Urban Adventures', image: require('../assets/images/urban.jpg') },
    { id: '5', name: 'Food & Drink', image: require('../assets/images/food.jpg') },
    { id: '6', name: 'Hidden Gems', image: require('../assets/images/hidden.jpg') },
    { id: '7', name: 'Nightlife', image: require('../assets/images/nightclub.jpg') },
    { id: '8', name: 'Others', image: require('../assets/images/other.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Image
            source={require('../assets/images/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Generate Adventure</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Let us find an adventure for you!</Text>

      {/* Duration Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duration</Text>
        <MultiSlider
          values={[duration]}
          sliderLength={340}
          min={1}
          max={24}
          step={1}
          onValuesChange={(value) => setDuration(value[0])}
          selectedStyle={{ backgroundColor: '#00A9A5' }}
          unselectedStyle={{ backgroundColor: '#DDDDDD' }}
          markerStyle={{
            height: 22,
            width: 22,
            borderRadius: 11,
            backgroundColor: '#FF6F00',
            borderWidth: 2,
            borderColor: '#FFFFFF',
          }}
        />
        <Text style={styles.sliderLabel}>{duration} hours</Text>
      </View>

      {/* Budget Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget</Text>
        <View style={styles.sliderContainer}>
          {/* Wave Background Image */}
          <Image
            source={require('../assets/images/budget-wave.png')}
            style={styles.sliderBackgroundImage}
          />

          {/* Transparent Left Overlay */}
          <View
            style={[
              styles.overlay,
              {
                width: `${(budgetRange[0] / 500) * 100}%`, // Left overlay width
                left: 0,
              },
            ]}
          />

          {/* Transparent Right Overlay */}
          <View
            style={[
              styles.overlay,
              {
                width: `${((500 - budgetRange[1]) / 500) * 100}%`, // Right overlay width
                right: 0,
              },
            ]}
          />

          {/* Highlighted Wave */}
          <Image
            source={require('../assets/images/highlighted-wave.png')}
            style={styles.sliderBackgroundImage}
          />

          {/* Wrapper for MultiSlider */}
          <View style={styles.sliderWrapper}>
            <MultiSlider
              values={[budgetRange[0], budgetRange[1]]}
              sliderLength={350}
              min={0}
              max={500}
              step={10}
              onValuesChange={(values) => setBudgetRange(values)}
              selectedStyle={{ backgroundColor: '#00A9A5' }}
              unselectedStyle={{ backgroundColor: '#DDDDDD' }}
              markerStyle={{
                height: 22,
                width: 22,
                borderRadius: 11,
                backgroundColor: '#FF6F00',
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}
            />
          </View>
        </View>
        <Text style={styles.sliderLabel}>
          ${budgetRange[0]} - ${budgetRange[1]}
        </Text>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesWrapper}>
          <View style={styles.categoryRow}>
            {categories.slice(0, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryContainer}
                onPress={() => setSelectedCategory(item.id)}
                accessibilityLabel={`Select ${item.name} category`}
              >
                <View
                  style={[
                    styles.categoryCircle,
                    selectedCategory === item.id && styles.selectedCategory,
                  ]}
                >
                  <Image source={item.image} style={styles.categoryImage} />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.selectedCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.categoryRow}>
            {categories.slice(4).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryContainer}
                onPress={() => setSelectedCategory(item.id)}
                accessibilityLabel={`Select ${item.name} category`}
              >
                <View
                  style={[
                    styles.categoryCircle,
                    selectedCategory === item.id && styles.selectedCategory,
                  ]}
                >
                  <Image source={item.image} style={styles.categoryImage} />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.selectedCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Start Button */}
      <View style={styles.fixedStartButtonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => console.log('Adventure Started')} // Replace with actual functionality
          accessibilityLabel="Start the adventure"
        >
          <Text style={styles.startButtonText}>LET'S START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 45,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  sliderLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 0,
    color: '#666666',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  sliderBackgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    zIndex: 2,
  },
  sliderWrapper: {
    zIndex: 3,
    marginTop: 45,
    width: '100%',
  },
  categoriesWrapper: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 180,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '22%',
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectedCategory: {
    borderColor: '#FF6F00',
    borderWidth: 3,
  },
  categoryImage: {
    width: '90%',
    height: '90%',
    borderRadius: 35,
  },
  categoryText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 5,
    color: '#333333',
    width: '100%',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  fixedStartButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
