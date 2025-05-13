import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import VideoDetailScreen from '../screens/VideoDetailsScreen';
import BottomTabs from '../navigation/BottomTabs';

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  VideoDetail: {
    title: string;
    channelName: string;
    description: string;
    viewCount: number;
    likes: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
