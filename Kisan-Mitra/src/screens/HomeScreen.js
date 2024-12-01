import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Wheat-field.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(237, 215, 136, 0)', 'rgba(237, 215, 136, 0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/images/farmer-icon1.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Farmer's Market</Text>
              <Text style={styles.subtitle}>A bridge to the farmers</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                <Text style={styles.buttonText}>Login as Farmer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('CustomerLoginScreen')}
              >
                <Text style={styles.buttonText}>Login as Customer</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('RegistrationScreen')}
            >
              <Text style={styles.buttonText}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
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
    tintColor: 'rgb(184, 109, 0)',
    opacity: 0.9,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '110%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#B86D00',
    height: 60,
    width: '200',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default HomeScreen;
