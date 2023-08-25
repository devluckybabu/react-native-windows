import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'app/screens/HomeScreen';
import { ExploreScreen, ProfileScreen } from 'app/screens';
import { Icons } from 'app/components';


const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'darkblue'
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.MaterialCommunityIcons
              name="home" size={size} color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.MaterialCommunityIcons
              name="magnify" size={size} color={color}
            />
          )
        }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icons.MaterialCommunityIcons
              name="account" size={size} color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTab