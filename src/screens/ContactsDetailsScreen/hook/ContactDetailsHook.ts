import {useState, useEffect} from 'react';
import {
  ApiResponse,
  getContactById,
  updateContactById,
  deleteContactById,
} from '../../../services/ContactsManager';
import {useAuth} from '../../../context/AuthContext';
import {Contact2} from '../../../interfaces/Contact.interface';
import {useNavigation} from '@react-navigation/native';
import {getWeatherData} from '../../../services/weatherService';
import {WeatherResponse} from '../../../types/weather.types';

export const useContactDetails = (
  recordID: string,
  initialContact: Contact2,
) => {
  const {token} = useAuth();
  const navigation = useNavigation();
  const [contactData, setContactData] = useState<Contact2>(initialContact);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | null >(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContactDetails = async () => {
      if (!token) {
        console.error('No token found, user is not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response: ApiResponse = await getContactById(recordID, token);

        if (isMounted) {
          if (response.code === 200) {
            setContactData(response.data);

            const {latitude, longitude} = response.data;
            if (latitude != null && longitude != null) {
              fetchWeather(latitude, longitude); // Fetch weather data when contact data is loaded
            } else {
              setWeatherError('Invalid latitude or longitude');
            }
          } else {
            console.error('Error fetching contact details:', response.message);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching contact details:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        setWeatherLoading(true);
        const data = await getWeatherData(latitude, longitude);
        if (isMounted) {
          setWeather(data);
        }
      } catch (error) {
        if (isMounted) {
          setWeatherError('Error fetching weather data');
          console.error('Error fetching weather data:', error);
        }
      } finally {
        if (isMounted) {
          setWeatherLoading(false);
        }
      }
    };

    fetchContactDetails();

    return () => {
      isMounted = false;
    };
  }, [recordID, token]);

  const updateContact = async (updatedData: Partial<Contact2>) => {
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    try {
      const response: ApiResponse = await updateContactById(
        recordID,
        updatedData,
        token,
      );
      if (response.code === 200) {
        setContactData(response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (refreshContacts: Function) => {
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    try {
      await deleteContactById(recordID, token);
      setToastMessage('Delete contact successfully');
      setToastType('success');
      refreshContacts();
      navigation.goBack();
    } catch (error) {
      setToastMessage('Error deleting contact');
      setToastType('error');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveContact = async (
    updatedContact: {
      name: string;
      phone: string;
      email: string;
      latitude: number;
      longitude: number;
    },
    refreshContacts: Function,
  ) => {
    await updateContact(updatedContact);
    await refreshContacts();
    closeModal();
  };

  return {
    contactData,
    loading,
    weather,
    weatherLoading,
    weatherError,
    isModalVisible,
    toastMessage,
    toastType,
    setModalVisible,
    setToastMessage,
    setToastType,
    updateContact,
    deleteContact,
    handleSaveContact,
    closeModal,
  };
};
