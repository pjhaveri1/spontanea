import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { Linking } from 'react-native';

type Activity = {
    id: string;
    name: string;
    category: string;
    budget: number;
    estimated_duration: number;
    address: string;
    photos: string;
    overview: string;
    details: string;
    reviews: { user: string; rating: number; comment: string }[];
    directions?: string[];
    latitude: number;
    longitude: number;
};

type RootStackParamList = {
    SeeAllActivities: { activities: Activity[] };
    AdventureDetail: { adventure: Activity };
};

type SeeAllActivitiesRouteProp = RouteProp<RootStackParamList, 'SeeAllActivities'>;

export default function SeeAllActivities() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<SeeAllActivitiesRouteProp>();
    const { activities } = route.params;

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMapStyle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleActivityPress = (activity: Activity) => {
        navigation.navigate('AdventureDetail', { adventure: activity });
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity 
                style={[styles.backButton, { backgroundColor: isDarkMode ? 'black' : 'white' }]}
                onPress={() => navigation.goBack()}
            >
                <Image 
                    source={
                        isDarkMode 
                        ? require('../assets/images/back-icon-light.png') 
                        : require('../assets/images/back-icon.png')
                    }
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            {/* Map */}
            <MapView
                style={styles.map}
                customMapStyle={isDarkMode ? darkMapStyle : []}
                initialRegion={{
                    latitude: 22.3964,
                    longitude: 114.1095,
                    latitudeDelta: 0.3,
                    longitudeDelta: 0.4,
                }}
                onPress={toggleMapStyle}
            >
                {activities.map((activity) => (
                    <Marker
                        key={activity.id}
                        coordinate={{
                            latitude: activity.latitude,
                            longitude: activity.longitude,
                        }}
                        title={activity.name}
                        description={`Price: $${activity.budget}`}
                        onPress={() =>
                            Linking.openURL(
                                `https://www.google.com/maps/dir/?api=1&destination=${activity.latitude},${activity.longitude}`
                            ).catch((err) =>
                                console.error('Error opening Google Maps', err)
                            )
                        }
                    />
                ))}
            </MapView>


            {/* Suggested Activities Section */}
            <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsHeader}>All Recommended Activities</Text>
                <FlatList
                    horizontal
                    data={activities}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => handleActivityPress(item)}
                        >
                            <Image source={{ uri: item.photos }} style={styles.cardImage} />
                            <Text style={styles.cardName}>{item.name}</Text>
                            <Text style={styles.cardPrice}>from ${item.budget}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    map: {
        width: '100%',
        height: '63%',
    },
    suggestionsContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    suggestionsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    card: {
        width: 150,
        height: 200,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardPrice: {
        fontSize: 14,
        color: '#FF4500',
    },
});

/* Dark Map Styling */
const darkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#212121' }],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#212121' }],
    },
];
