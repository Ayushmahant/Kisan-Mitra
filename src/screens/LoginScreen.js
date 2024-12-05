import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';  // Import LinearGradient

const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!userName || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://192.168.1.112:5000/login', {
                username: userName,
                password: password,
            });

            // Handle success
            console.log('Login successful:', response.data);
            const { token } = response.data;  // You can store the token for further use
            // Navigate to the HomeScreen after successful login
            navigation.navigate('Homepage');
        } catch (error) {
            // Handle error
            console.error('Login error:', error.response ? error.response.data.message : error.message);
            Alert.alert('Login Failed', error.response ? error.response.data.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#F4E7B7', '#FFFAF0']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>← Back</Text>
                    </TouchableOpacity>

                    {/* Content Section */}
                    <View style={styles.content}>
                        {/* Logo Section */}
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../assets/images/farmer-icon1.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Title and Subtitle */}
                        <Text style={styles.title}>Farmer Login</Text>
                        <Text style={styles.subtitle}>Enter your credentials below</Text>

                        {/* Username Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={userName}
                            onChangeText={setUserName}
                            placeholderTextColor="#B86D00"
                        />

                        {/* Password Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#B86D00"
                            secureTextEntry={true}
                        />

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.finishButton}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
                        </TouchableOpacity>

                        {/* Register Link */}
                        <TouchableOpacity
                            style={styles.registerLink}
                            onPress={() => navigation.navigate('RegistrationScreen')}
                        >
                            <Text style={styles.registerText}>Don't have an account? Register here</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

// Styles for the Login Screen
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
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',  // Changed to white for better contrast
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 50,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#B86D00',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    finishButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#B86D00',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    registerLink: {
        marginTop: 20,
    },
    registerText: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
