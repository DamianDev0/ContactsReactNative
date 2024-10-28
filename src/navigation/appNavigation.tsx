import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import FormScreen from '../screens/FormScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen ';
import { RootStackParamList, MainTabParamList } from '../types/navigation.types';

// Initialize Navigation Stacks
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

interface IconProps {
  color: string;
  size: number;
}

// Tab Icon Components
const HomeIcon: React.FC<IconProps> = ({ color, size }) => (
  <Icon name="home-outline" color={color} size={size} />
);

const FormIcon: React.FC<IconProps> = ({ color, size }) => (
  <Icon name="create-outline" color={color} size={size} />
);

// Bottom Tab Navigator
const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ color, size }) =>
        route.name === 'Home' ? (
          <HomeIcon color={color} size={size} />
        ) : (
          <FormIcon color={color} size={size} />
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
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Form" component={FormScreen} />
  </Tab.Navigator>
);

// Main App Navigation Component
const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  // Check if it's the first launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem('onboardingCompleted');
      setIsFirstLaunch(hasCompletedOnboarding === null);
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={ContactDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
