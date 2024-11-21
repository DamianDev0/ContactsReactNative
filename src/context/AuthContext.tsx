import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/AuthService';
import CustomToast from '../components/CustomToast';
import {handleApiError, ApiError} from '../utils/erronHandler';

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string,name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStoredToken();
  }, []);

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

  const login = async (email: string, password: string) => {
    setLoading(true);
    resetMessages();

    try {
      const {data} = await apiService.login(email, password);
      const {accessToken, id} = data;
      if (accessToken) {
        await storeToken(accessToken, id);
        setSuccessMessage('Login successful! Welcome back!');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error: unknown) {
      const apiError = handleApiError(error);
      handleError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    resetMessages();

    try {
      await apiService.register(email, password, name);
      setSuccessMessage(
        'Registration successful! Your account has been created.',
      );
    } catch (error: unknown) {
      const apiError = handleApiError(error);
      handleError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: ApiError) => {
    setErrorMessage(error.message || 'An unexpected error occurred.');
  };

  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const storeToken = async (token: string, userId: string) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userId', userId);
    setToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'userId']);
    setUserId(null);
    setIsAuthenticated(false);
    setToken(null);
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
      }}>
      {children}
      {errorMessage && (
        <CustomToast type="error" text1="Error" text2={errorMessage} />
      )}
      {successMessage && (
        <CustomToast type="success" text1="Success" text2={successMessage} />
      )}
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
