import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Image, 
    Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; // Import QR Code Library
import { Voucher } from '../types'; // Import the Voucher type from types.ts

export default function VouchersScreen() {
    const navigation = useNavigation();
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [message, setMessage] = useState<string>(''); // Add a message state

    // Load vouchers from AsyncStorage when screen opens
    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const storedVouchers = await AsyncStorage.getItem("vouchers");
                if (storedVouchers) {
                    setVouchers(JSON.parse(storedVouchers));
                }
            } catch (error) {
                console.error("Error loading vouchers:", error);
            }
        };

        fetchVouchers();
    }, []);

    // Function to add a voucher (only if it doesn't already exist)
    const addVoucher = async (newVoucher: Voucher) => {
        try {
            // Fetch existing vouchers from AsyncStorage
            const storedVouchers = await AsyncStorage.getItem("vouchers");
            const vouchers = storedVouchers ? JSON.parse(storedVouchers) : [];

            // Check if the voucher already exists by matching the ID
            const isVoucherExist = vouchers.some((voucher: Voucher) => voucher.id === newVoucher.id);

            if (!isVoucherExist) {
                // Add the voucher if it doesn't exist
                vouchers.push(newVoucher);
                await AsyncStorage.setItem("vouchers", JSON.stringify(vouchers));
                setVouchers(vouchers);  // Update state to reflect the new list of vouchers
                setMessage("Voucher collected successfully!");  // Show success message
            } else {
                setMessage("You have already collected this voucher.");  // Show message if voucher exists
            }
        } catch (error) {
            console.error("Error adding voucher:", error);
            setMessage("Error adding voucher. Please try again.");  // Show error message
        }
    };

    // Function to remove a voucher
    const removeVoucher = async (id: string) => {
        try {
            const updatedVouchers = vouchers.filter(voucher => voucher.id !== id);
            setVouchers(updatedVouchers);
            await AsyncStorage.setItem("vouchers", JSON.stringify(updatedVouchers));
        } catch (error) {
            console.error("Error removing voucher:", error);
        }
    };

    // Open QR code modal
    const openQRCodeModal = (voucher: Voucher) => {
        setSelectedVoucher(voucher);
        setShowQRCodeModal(true);
    };

    // Close QR code modal
    const closeQRCodeModal = () => {
        setShowQRCodeModal(false);
        setSelectedVoucher(null);
    };

    // Function to calculate expiry date (1 month after collection)
    const calculateExpiryDate = (collectionDate: string) => {
        // Ensure the collection date is in YYYY-MM-DD format
        const formattedDate = formatDate(collectionDate);
        const date = new Date(formattedDate);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            console.error("Invalid collection date:", collectionDate);
            return 'Invalid date';
        }

        date.setMonth(date.getMonth() + 1); // Adding one month
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    // Function to format date to YYYY-MM-DD
    const formatDate = (dateString: string) => {
        const dateParts = dateString.split('/');
        let date: Date;

        // Check if the date is in DD/MM/YYYY format
        if (dateParts.length === 3) {
            const [day, month, year] = dateParts;
            // Construct the date in YYYY-MM-DD format
            date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        } else {
            date = new Date(dateString);
        }

        // Check for invalid date
        if (isNaN(date.getTime())) {
            console.error("Invalid date:", dateString);
            return 'Invalid date';
        }

        // Return the date in YYYY-MM-DD format
        return date.toISOString().split('T')[0]; 
    };

    return (
        <View style={styles.container}>
            {/* Header with Back Button and Logo */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.header}>My Vouchers</Text>
            
            {/* Display message */}
            {message ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            ) : null}

            {vouchers.length === 0 ? (
                <Text style={styles.noVouchers}>No vouchers collected yet.</Text>
            ) : (
                <FlatList
                    data={vouchers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.voucherCard}>
                            <Text style={styles.voucherTitle}>{item.title}</Text>
                            <Text style={styles.voucherDescription}>{item.description}</Text>
                            <Text style={styles.voucherDate}>Collected: {formatDate(item.date)}</Text>
                            <Text style={styles.voucherExpiry}>Expiry Date: {calculateExpiryDate(item.date)}</Text>

                            {/* QR Code Button */}
                            <TouchableOpacity 
                                style={styles.viewQRCodeButton}
                                onPress={() => openQRCodeModal(item)}
                            >
                                <Text style={styles.viewQRCodeText}>View QR Code</Text>
                            </TouchableOpacity>

                            {/* Remove Button */}
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => removeVoucher(item.id)}
                            >
                                <Text style={styles.deleteText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* QR Code Modal */}
            {showQRCodeModal && selectedVoucher && (
                <Modal
                    visible={showQRCodeModal}
                    transparent
                    animationType="none"
                    onRequestClose={closeQRCodeModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.qrCodeContainer}>
                            <QRCode 
                                value={selectedVoucher.id}  // Use voucher ID or any unique value to generate QR
                                size={200}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={closeQRCodeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        marginTop: 20,
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
        marginTop: 20,
    },
    header: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 20, 
        color: '#4F4F4F' 
    },
    noVouchers: { 
        textAlign: 'center', 
        fontSize: 16, 
        color: '#888', 
        marginTop: 20 
    },
    voucherCard: { 
        backgroundColor: '#F5F5F5', 
        padding: 20, 
        borderRadius: 15, 
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginHorizontal: 5
    },
    voucherTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#333',
        marginBottom: 5,
    },
    voucherDescription: { 
        fontSize: 14, 
        marginVertical: 8, 
        color: '#555',
        textAlign: 'left'
    },
    voucherDate: { 
        fontSize: 12, 
        color: '#777',
        marginBottom: 5 
    },
    voucherExpiry: {
        fontSize: 12, 
        color: '#FF6347',
        marginBottom: 5
    },
    deleteButton: { 
        marginTop: 10, 
        backgroundColor: '#FF6347', 
        paddingVertical: 12, 
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.9,
    },
    deleteText: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    viewQRCodeButton: {
        marginTop: 10,
        backgroundColor: '#00A9A5',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.9,
    },
    viewQRCodeText: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrCodeContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 250,
        height: 300,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageContainer: {
        backgroundColor: '#4CAF50', // Green background for success
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    message: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
