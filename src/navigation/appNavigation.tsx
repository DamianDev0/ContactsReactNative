import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import FormScreen from '../screens/FormScreen/FormScreen';
import ContactDetailScreen from '../screens/ContactsDetailsScreen/ContactDetailScreen';
import TabBarIcon from './TabBarIcon';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/Loader';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({color, size}) => (
        <TabBarIcon routeName={route.name} color={color} size={size} />
      ),
      tabBarActiveTintColor: '#34495e',
      tabBarInactiveTintColor: '#000',
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
        borderTopColor: '#dddddd',
        height: 55,
      },
      tabBarLabelStyle: {fontSize: 11},
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Form" component={FormScreen} />
  </Tab.Navigator>
);

const AppNavigation = () => {
  const {isAuthenticated} = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        'onboardingCompleted',
      );
      setIsFirstLaunch(hasCompletedOnboarding === null);
      setLoading(false);
    };
    checkFirstLaunch();
  }, []);

  if (loading) {
    return (
       <Loader />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isFirstLaunch ? 'Onboarding' : isAuthenticated ? 'Main' : 'Login'
        }>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Main" options={{headerShown: false}}>
          {() => (
            <ProtectedRoute>
              <MyTabs />
            </ProtectedRoute>
          )}
        </Stack.Screen>
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
