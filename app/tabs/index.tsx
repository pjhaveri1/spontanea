import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator, 
    Modal
} from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { OpenSans_700Bold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/types';
import Header from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header';
import { generatedAdventures } from '../GenerateAdventure'; // Import adventures from GenerateAdventure
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Activity {
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
    longitude: number;
    latitude: number;
}

const recommendedActivities: Activity[] = [
    {
        id: '1',
        name: 'Big Buddha',
        category: 'Cultural Site',
        budget: 189,
        estimated_duration: 2,
        address: 'Lantau Island',
        photos: 'https://houseofcoco.net/wp-content/uploads/images/2128c933605a742081178ab020749475bc1e501d-931x697.jpg',
        overview: 'A large bronze statue of Buddha, symbolizing peace and harmony.',
        details: 'The Big Buddha is a major center of Buddhism in Hong Kong.',
        reviews: [
            { user: 'Alice', rating: 4.4, comment: 'A must-visit for peace and tranquility.' },
            { user: 'John', rating: 4.7, comment: 'Great views and cultural significance.' },
        ],
        directions: ['Take the MTR to Tung Chung Station', 'Switch to Ngong Ping 360 cable car'],
        latitude: 22.25230,
        longitude: 114.03230,
    },
    {
        id: '2',
        name: 'Bride’s Pool',
        category: 'Natural Site',
        budget: 80,
        estimated_duration: 3,
        address: 'Tai Po',
        photos: 'https://forsomethingmore.com/wp-content/uploads/2020/05/Brides-Pool-Hong-Kong-COVER1-2.jpg',
        overview: 'A serene waterfall with a tragic love story behind its name.',
        details: 'Perfect for a quiet retreat and connection with nature.',
        reviews: [
            { user: 'Sophia', rating: 3.8, comment: 'The sound of the waterfall is so soothing!' },
        ],
        directions: ['Take bus 275R from Tai Po Market', 'Follow hiking trail to Bride’s Pool'],
        latitude: 22.48270,
        longitude: 114.24410,
    },
    {
        id: '3',
        name: 'Disneyland',
        category: 'Theme Park',
        budget: 699,
        estimated_duration: 6,
        address: 'Lantau Island',
        photos: 'https://www.discoverhongkong.com/eng/explore/attractions/the-ultimate-guide-to-hong-kong-disneyland.thumb.800.480.png?ck=1730184312',
        overview: 'A magical place for families and friends to create unforgettable memories.',
        details: 'Enjoy thrilling rides, amazing parades, and spectacular fireworks.',
        reviews: [
            { user: 'Michael', rating: 4.6, comment: 'A magical day with the family!' },
        ],
        directions: ['Take the MTR to Sunny Bay Station', 'Switch to Disneyland Resort Line'],
        latitude: 22.3130,
        longitude: 114.0413,
    },
    {
        id: '4',
        name: 'Water World Ocean Park',
        category: 'Theme Park',
        budget: 499,
        estimated_duration: 6,
        address: 'Aberdeen',
        photos: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1627023373/blog/rb2jcfxng8ompttpmyx3.jpg',
        overview: 'Just minutes from Hong Kong’s urban center, Water World Ocean Park Hong Kong transports you into a year-round, all-weather seaside water park, hidden in a natural wonderland.',
        details: 'Fully immerse yourself in the enticing experiences with 27 indoor and outdoor attractions across five zones within Water World!',
        reviews: [
            { user: 'John', rating: 5, comment: 'The kids loved it and so did the adults!' },
        ],
        directions: ['take the MTR South Island Line and get off at Ocean Park Station for direct access to Ocean Parks park entrance for interchange to The Shuttle Bus. ', 'The Shuttle Bus route runs to and from the Ocean Park Main Entrance, connecting the Water World in just 15 minutes.'],
        latitude: 22.238309496982172,
        longitude: 114.16907248932108,
    },
];

// Combine both sets of activities
const allActivities = [...recommendedActivities, ...generatedAdventures];

type NavigationProp = StackNavigationProp<RootStackParamList, 'AdventureDetail'>;

export default function Index() {
    const navigation = useNavigation<NavigationProp>();

    const [fontsLoaded] = useFonts({
        MontserratBold: Montserrat_700Bold,
        MontserratRegular: Montserrat_400Regular,
        OpenSansRegular: OpenSans_400Regular,
        OpenSansBold: OpenSans_700Bold,
    });

    const [showPopup, setShowPopup] = useState(false);

    // Randomly trigger the pop-up within 3-10 seconds after page load
    useEffect(() => {
        const delay = Math.random() * (10000 - 3000) + 3000; // Between 3-10 sec
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, delay);
        
        return () => clearTimeout(timer);
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const handleActivityPress = (activity: Activity) => {
        navigation.navigate('AdventureDetail', { adventure: activity });
    };

    const handleSurpriseMe = () => {
        const randomActivity =
            allActivities[Math.floor(Math.random() * allActivities.length)];
        navigation.navigate('AdventureDetail', { adventure: randomActivity });
    };

    const collectVoucher = async () => {
        try {
            const newVoucher = {
                id: new Date().getTime().toString(), // Unique ID
                title: "10% off at % Arabica",
                description: "Enjoy an extra 10% off at % Arabica!",
                date: new Date().toLocaleDateString(),
            };
    
            // Get existing vouchers
            const existingVouchers = await AsyncStorage.getItem("vouchers");
            const vouchersArray = existingVouchers ? JSON.parse(existingVouchers) : [];
    
            // Add new voucher
            vouchersArray.push(newVoucher);
    
            // Save updated vouchers back to storage
            await AsyncStorage.setItem("vouchers", JSON.stringify(vouchersArray));
    
            // Close modal after collecting
            setShowPopup(false);
            alert("Voucher collected successfully!");
        } catch (error) {
            console.error("Error saving voucher:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Header />

             {/* Pop-up Modal */}
             <Modal visible={showPopup} transparent animationType="none">
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        {/* Close Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowPopup(false)}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>

                        {/* Pop-up Content */}
                        <Text style={styles.popupText}>Enjoy an extra</Text>
                        <Text style={styles.popupDiscount}>10% off</Text>
                        <Text style={styles.popupText}>At Arabica</Text>

                        {/* Call to Action */}
                        <TouchableOpacity style={styles.ctaButton} onPress={collectVoucher}>
                            <Text style={styles.ctaText}>Get 10% off</Text>
                        </TouchableOpacity>

                        {/* No Thanks Option */}
                        <TouchableOpacity onPress={() => setShowPopup(false)}>
                            <Text style={styles.noThanks}>No, Thanks</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.userName}>Prachi Jhaveri</Text>
            </View>

            <Text style={styles.tagline} numberOfLines={1} ellipsizeMode="tail">
                Let’s <Text style={styles.boldText}>start</Text> your <Text style={styles.boldText}>adventure</Text>
            </Text>

            <Text style={styles.subTagline}>Small Adventures, Big Joys</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.generateButton}
                    onPress={() => navigation.navigate('GenerateAdventure')}
                >
                    <Text style={styles.buttonText}>GENERATE ADVENTURE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.surpriseButton} onPress={handleSurpriseMe}>
                    <Text style={styles.buttonText}>SURPRISE ME!</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.recommendations}>
                <Text style={styles.recommendationHeader}>Daily Recommendations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SeeAllActivities', { activities: recommendedActivities })}>
                    <Text style={styles.seeAll}>See All ></Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
            >
                {recommendedActivities.slice(0, 3).map((activity) => (
                    <TouchableOpacity 
                        key={activity.id} 
                        style={styles.card} 
                        onPress={() => handleActivityPress(activity)}
                    >
                        <Image source={{ uri: activity.photos }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{activity.name}</Text>
                        <Text style={styles.cardRating}>⭐ {activity.reviews[0]?.rating || 'N/A'}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    welcomeSection: {
        alignItems: 'flex-start',
        marginTop: -10,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: 'MontserratRegular',
        color: '#333333',
        marginBottom: 5,
    },
    userName: {
        fontSize: 24,
        fontFamily: 'MontserratBold',
        color: '#333333',
    },
    tagline: {
        fontSize: 26.5,
        fontFamily: 'MontserratRegular',
        textAlign: 'left',
        marginBottom: 5,
    },
    boldText: {
        fontFamily: 'MontserratBold',
    },
    subTagline: {
        fontSize: 18,
        fontFamily: 'OpenSansBold',
        color: '#FF4500',
        marginBottom: 25,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#A25C37', // Adjust to match your UI
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    closeButton: { position: 'absolute', top: 10, right: 10 },
    closeText: { fontSize: 18, color: '#FFF' },
    popupText: { fontSize: 16, color: '#FFF', marginVertical: 5 },
    popupDiscount: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
    ctaButton: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    ctaText: { fontSize: 16, fontWeight: 'bold', color: '#A25C37' },
    noThanks: { fontSize: 14, color: '#FFF', marginTop: 10, textDecorationLine: 'underline' },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
    },
    generateButton: {
        backgroundColor: '#FF4500',
        paddingVertical: 15,
        width: 320,
        borderRadius: 65,
        marginBottom: 22,
    },
    surpriseButton: {
        backgroundColor: '#00A9A5',
        paddingVertical: 15,
        width: 320,
        borderRadius: 65,
    },
    buttonText: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
    recommendations: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    recommendationHeader: {
        fontSize: 15,
        fontFamily: 'MontserratBold',
        marginBottom: 10,
    },
    seeAll: {
        fontFamily: 'OpenSansRegular',
        color: '#FF4500',
        fontSize: 14,
        marginBottom: 10,
    },
    horizontalScroll: {
        marginBottom: 20,
        overflow: 'visible',
    },
    card: {
        width: 150,
        height: 210,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 10,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    cardImage: {
        width: '100%',
        height: 130,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 16,
        fontFamily: 'MontserratBold',
        marginTop: 5,
        textAlign: 'center',
    },
    cardRating: {
        fontSize: 14,
        fontFamily: 'OpenSansRegular',
        color: '#333333',
        marginTop: 5,
        marginBottom: 8,
        textAlign: 'center',
    },
});
