import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import FormScreen from '../screens/FormScreen/FormScreen';
import ContactDetailScreen from '../screens/ContactsDetailsScreen/ContactDetailScreen ';
import {RootStackParamList, MainTabParamList} from '../types/navigation.types';
import TabBarIcon from './TabBarIcon';
import MapScreen from '../screens/MapScreen/MapSreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({color, size}) => (
        <TabBarIcon routeName={route.name} color={color} size={size} />
      ),
      tabBarActiveTintColor: '#85c1e9',
      tabBarInactiveTintColor: '#000',
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
        borderTopColor: '#dddddd',
        height: 55,
      },
      tabBarLabelStyle: {
        fontSize: 11,
      },
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Form" component={FormScreen} />
    <Tab.Screen name="Map" component={MapScreen} />
  </Tab.Navigator>
);

// Main App Navigation Component
const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        'onboardingCompleted',
      );
      setIsFirstLaunch(hasCompletedOnboarding === null);
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Main'}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={ContactDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
