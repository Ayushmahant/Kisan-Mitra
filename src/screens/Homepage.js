import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'; // To maintain the gradient theme from the login screen

const HomeScreen = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://192.168.1.112:5000/news'); // Update with your backend URL
        setNewsFeed(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // const renderItem = ({ item }) => (
  //   <View style={styles.postContainer}>
  //     <Image  source={require('../assets/images/seed.png')}style={styles.postImage} />
  //     <View style={styles.postContent}>
  //       <Text style={styles.postTitle}>{item.title}</Text>
  //       <Text style={styles.postDescription}>{item.description}</Text>
  //       <View style={styles.actions}>
  //         <TouchableOpacity style={styles.iconButton}>
  //           <Text style={styles.icon}>❤️</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.iconButton}>
  //           <Text style={styles.icon}>💬</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <Text style={styles.timestamp}>{item.timestamp}</Text>
  //     </View>
  //   </View>
  // );

  return (
    <LinearGradient colors={['#F4E7B7', '#FFFAF0']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={<Text style={styles.header}>Krishi Mitra</Text>}
          data={newsFeed}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.loadingText}>No news available</Text>}
          ListFooterComponent={loading && <Text style={styles.loadingText}>Loading...</Text>}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B86D00',
    textAlign: 'center',
    marginVertical: 20,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
  icon: {
    fontSize: 18,
    color: '#B86D00',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});

export default HomeScreen;
