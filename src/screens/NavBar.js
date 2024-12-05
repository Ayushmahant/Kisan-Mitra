import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import AddPostScreen from './screens/AddPostScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#FFFAF0' },  // Same color as the login theme
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? '#B86D00' : '#888' }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? '#B86D00' : '#888' }}>🔍</Text>
            ),
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            tabBarLabel: 'Add Post',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? '#B86D00' : '#888' }}>➕</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? '#B86D00' : '#888' }}>🔔</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? '#B86D00' : '#888' }}>👤</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default nav;
