import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const OTPPage = ({ navigation, route }) => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { username } = route.params; // Receiving the username passed from Login

    // useEffect(() => {
    //     if (timer === 0) return;

    //     const interval = setInterval(() => {
    //         setTimer((prev) => prev - 1);
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [timer]);

    // const handleOtpChange = (value) => {
    //     setOtp(value);
    // };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setIsSubmitting(true);

        try {
            // Assuming your backend handles OTP verification
            const response = await axios.post('http://192.168.1.104:5000/verify-otp', {
                username: username,
                otp: otp,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'OTP verified successfully!');
                navigation.navigate('HomeScreen');
            }
        } catch (error) {
            Alert.alert('Error', 'OTP verification failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            // Trigger backend to resend OTP
            const response = await axios.post('http://192.168.1.104:5000/resend-otp', { username: username });

            if (response.status === 200) {
                Alert.alert('OTP Resent', 'A new OTP has been sent to your phone.');
                setTimer(60); // Reset the timer
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to resend OTP. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>We sent a 6-digit OTP to your phone.</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                value={otp}
                onChangeText={handleOtpChange}
                placeholder="Enter OTP"
                placeholderTextColor="#B86D00"
            />

            <Text style={styles.timer}>Time left: {timer}s</Text>

            <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyOtp}
                disabled={isSubmitting || timer === 0}
            >
                <Text style={styles.buttonText}>{isSubmitting ? 'Verifying...' : 'Verify OTP'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOtp}
                disabled={timer > 0}
            >
                <Text style={styles.resendText}>{timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
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
    timer: {
        fontSize: 16,
        color: '#B86D00',
        marginBottom: 20,
    },
    verifyButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#B86D00',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    resendButton: {
        width: '100%',
        padding: 15,
        borderColor: '#B86D00',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendText: {
        color: '#B86D00',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OTPPage;
