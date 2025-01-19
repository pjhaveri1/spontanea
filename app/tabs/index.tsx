import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator 
} from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { OpenSans_700Bold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import Header from '/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/components/header'; // Adjust path as needed

export default function Index() {
    const router = useRouter(); // Initialize the router object

    const [fontsLoaded] = useFonts({
        MontserratBold: Montserrat_700Bold,
        MontserratRegular: Montserrat_400Regular,
        OpenSansRegular: OpenSans_400Regular,
        OpenSansBold: OpenSans_700Bold,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* Reusable Header */}
            <Header />

            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.userName}>Prachi Jhaveri</Text>
            </View>

            {/* Tagline Section */}
            <Text style={styles.tagline} numberOfLines={1} ellipsizeMode="tail">
                Let’s <Text style={styles.boldText}>start</Text> your <Text style={styles.boldText}>adventure</Text>
            </Text>

            <Text style={styles.subTagline}>Small Adventures, Big Joys</Text>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.generateButton}
                    onPress={() => router.push('/GenerateAdventure')} // Navigate to GenerateAdventure
                >
                    <Text style={styles.buttonText}>GENERATE ADVENTURE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.surpriseButton}>
                    <Text style={styles.buttonText}>SURPRISE ME!</Text>
                </TouchableOpacity>
            </View>

            {/* Personal Recommendations Section */}
            <View style={styles.recommendations}>
                <Text style={styles.recommendationHeader}>Personal Recommendations</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All ></Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Scrollable Cards */}
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                style={styles.horizontalScroll}
            >
                <View style={styles.card}>
                    <Image
                        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/big-buddha.jpg')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Big Buddha</Text>
                    <Text style={styles.cardRating}>⭐ 4.5</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/brides-pool.jpg')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Bride’s Pool</Text>
                    <Text style={styles.cardRating}>⭐ 4.7</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        source={require('/Users/PrachiJhaveri_1/Desktop/Spontanea/spontanea/assets/images/disneyland.jpeg')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>Disneyland</Text>
                    <Text style={styles.cardRating}>⭐ 5.0</Text>
                </View>
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
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30,
    },
    generateButton: {
        backgroundColor: "#FF4500",
        paddingVertical: 15,
        width: 320,
        borderRadius: 65,
        marginBottom: 22,
    },
    surpriseButton: {
        backgroundColor: "#00A9A5",
        paddingVertical: 15,
        width: 320,
        borderRadius: 65,
    },
    buttonText: {
        fontFamily: 'MontserratBold',
        color: "white",
        fontSize: 22,
        textAlign: "center",
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
