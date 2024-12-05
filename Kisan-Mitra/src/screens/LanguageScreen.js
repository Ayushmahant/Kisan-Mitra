import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient'; // Import LinearGradient
import { Picker } from '@react-native-picker/picker'; // Import Picker

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default selected language
  const languages = ['English', 'Hindi', 'Marathi', 'Other']; // Sample languages

  const handleSubmit = () => {
    console.log('Selected Language:', selectedLanguage); // You can log the selected language
    navigation.navigate('RegistrationScreen', { language: selectedLanguage }); // Navigate to Registration screen with selected language
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/images/Wheat-field.png')} // Use the same background image
          style={styles.backgroundImage}
          resizeMode="cover" // Cover the entire background
        />
        <LinearGradient
          colors={['rgba(237, 215, 136, 0)', 'rgba(237, 215, 136, 0.8)']} // Gradient from transparent to dark
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Farmer Icon */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/farmer-icon1.png')} // Use your icon file path
                style={styles.logo}
                resizeMode="contain" // Adjust the logo to fit its container
              />
            </View>

            <View style={styles.header}>
              <Text style={styles.title}>Language/भाषा</Text>
              <Text style={styles.subtitle}>Please select your preferred language.</Text>
              <Text style={styles.languagePrompt}>कृपया अपनी पसंदीदा भाषा चुनें...</Text>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLanguage}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                dropdownIconColor="#D9D9D9" // Color of the dropdown arrow
              >
                {languages.map((language) => (
                  <Picker.Item key={language} label={language} value={language} />
                ))}
              </Picker>
            </View>

            {/* Adjusted button order and spacing */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit} // Navigate to Registration on submission
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('HomeScreen')} // Back to Home Screen
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute', // Position it absolutely to cover the screen
    bottom: 0, // Start from the bottom
    left: 0,
    right: 0,
    height: '100%', // Full height
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center the content horizontally
    paddingTop: 40, // Adjust padding for the logo
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center', // Center all content horizontally
  },
  logoContainer: {
    width: 100, // Set width for the logo container
    height: 100, // Set height for the logo container
    marginBottom: 20, // Space between logo and title
    overflow: 'hidden', // Ensure any overflow is hidden
    position: 'relative', // Allow absolute positioning of overlay
  },
  logo: {
    width: '100%',
    height: '100%',
    tintColor: '#B86D00', // Change color of the icon to #B86D00
    opacity: 0.9, // Adjust opacity for blending effect
  },
  header: {
    alignItems: 'center',
    marginBottom: 20, // Adjusted margin
  },
  title: {
    fontSize: 32, // Increased font size for the title
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center', // Center text
  },
  subtitle: {
    fontSize: 20, // Increased font size for the subtitle
    color: '#2C3E50',
    marginBottom: 8, // Space between title and subtitle
    textAlign: 'center', // Center text
  },
  languagePrompt: {
    fontSize: 20, // Increased font size for the language prompt
    color: '#2C3E50',
    marginBottom: 40, // Space between language prompt and picker
    textAlign: 'center', // Center text
  },
  pickerContainer: {
    position: 'relative', // Allow relative positioning for the picker
    width: 176,
    height: 40,
    backgroundColor: '#FFFFFF', // White background for the Picker
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center', // Center the picker items
    marginBottom: 20, // Reduced margin to bring buttons closer
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#000', // Text color for the Picker
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10, // Adjusted margin to reduce space above buttons
  },
  backButton: {
    backgroundColor: '#B86D00', // Changed Back button color
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Make it narrower
  },
  submitButton: {
    backgroundColor: '#B86D00', // Changed Submit button color
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Make it narrower
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSelectionScreen;
