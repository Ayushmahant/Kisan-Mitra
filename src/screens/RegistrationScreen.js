import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const RegistrationScreen = ({ navigation }) => {
    const [userType, setUserType] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistration = async () => {
        if (!userType || !userName || !password || !firstName || !lastName || !contactNumber || !aadharCard) {
            alert('Please fill all the fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.112:5000/register', {
                usertype: userType,
                username: userName,
                password: password,
                firstname: firstName,
                lastname: lastName,
                contactnumber: contactNumber,
                adharnumber: aadharCard,
            });
            console.log(response.data);
            setLoading(false);
            navigation.navigate('HomeScreen');  // Redirect to home or another screen
        } catch (error) {
            console.error('Error during registration:', error);
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#F4E7B7', '#FFFAF0']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>← Back</Text>
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../assets/images/farmer-icon1.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={styles.title}>Create Your Account</Text>
                        <Text style={styles.subtitle}>Fill in your details below</Text>

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={userType}
                                onValueChange={(itemValue) => setUserType(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select User Type" value="" />
                                <Picker.Item label="Farmer" value="farmer" />
                                <Picker.Item label="Customer" value="customer" />
                            </Picker>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="User Name"
                            value={userName}
                            onChangeText={setUsername}
                            placeholderTextColor="#B86D00"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#B86D00"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor="#B86D00"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor="#B86D00"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChangeText={setContactNumber}
                            keyboardType="numeric"
                            placeholderTextColor="#B86D00"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Aadhar Card Number"
                            value={aadharCard}
                            onChangeText={setAadharCard}
                            keyboardType="numeric"
                            placeholderTextColor="#B86D00"
                        />

                        <TouchableOpacity style={styles.finishButton} onPress={handleRegistration} disabled={loading}>
                            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        marginBottom: 20,
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
        tintColor: '#B86D00',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2C3E50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginBottom: 24,
        textAlign: 'center',
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#B86D00',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#B86D00',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    finishButton: {
        backgroundColor: '#B86D00',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        width: '100%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistrationScreen;
