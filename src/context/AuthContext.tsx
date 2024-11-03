// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/AuthService';
import {Alert} from 'react-native';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');

      console.log('token stored', storedToken);
      console.log('userId stored', storedUserId);

      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const {data} = await apiService.login(email, password);
      const accessToken = data.accessToken;

      if (accessToken) {
        await AsyncStorage.setItem('token', accessToken);
        await AsyncStorage.setItem('userId', data.id);
        setToken(accessToken);
        setUserId(data.id);
        setIsAuthenticated(true);
        Alert.alert('Login successful', 'Welcome back!');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await apiService.register(email, password);
      Alert.alert('Registration successful', 'Your account has been created successfully!');
    } catch (error: any) {
      console.error('Sign Up error:', error.message);
      setErrorMessage(error.message);
      Alert.alert('Registration failed', error.message);
    } finally {
      setLoading(false);
    }
  };



  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isAuthenticated,
        login,
        logout,
        loading,
        errorMessage,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
