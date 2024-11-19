import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/AuthService';
import CustomToast from '../components/CustomToast';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Effect to load the token and check authentication status on initial load
  useEffect(() => {
    loadStoredToken();
  }, []);

  // Function to load the token from AsyncStorage
  const loadStoredToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const storedUserId = await AsyncStorage.getItem('userId');
    
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  // Function to handle login
  const login = async (email: string, password: string) => {
    setLoading(true);
    resetMessages();

    try {
      const { data } = await apiService.login(email, password);
      handleLoginSuccess(data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle successful login
  const handleLoginSuccess = (data: any) => {
    const { accessToken, id } = data;
    if (accessToken) {
      storeToken(accessToken, id);
      setSuccessMessage('Login successful! Welcome back!');
    } else {
      throw new Error('Token not found in response');
    }
  };

  // Function to store the token in AsyncStorage
  const storeToken = async (token: string, userId: string) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  };

  // Function to handle sign up
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    resetMessages();

    try {
      await apiService.register(email, password);
      setSuccessMessage('Registration successful! Your account has been created.');
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle errors
  const handleError = (message: string) => {
    console.error(message);
    setErrorMessage('An error occurred. Please try again!');
  };

  // Function to reset success and error messages
  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Function to handle logout
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
        successMessage,
        signUp,
      }}
    >
      {children}
      {errorMessage && <CustomToast type="error" text1="Error" text2={errorMessage} />}
      {successMessage && <CustomToast type="success" text1="Success" text2={successMessage} />}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
