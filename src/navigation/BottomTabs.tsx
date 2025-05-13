import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShowMoreScreen from '../screens/ShowMoreScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '##8D99AE',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '##8D99AE',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Poppins_400Regular',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'ShowMore') iconName = 'search';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="ShowMore"
        component={ShowMoreScreen}
        initialParams={{ query: 'React Native' }}
      />
    </Tab.Navigator>
  );
}
