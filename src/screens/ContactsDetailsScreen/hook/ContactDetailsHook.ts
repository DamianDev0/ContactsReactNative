import { useState, useEffect } from 'react';
import { ApiResponse, getContactById, updateContactById, deleteContactById } from '../../../services/ContactsManager';
import { useAuth } from '../../../context/AuthContext';
import { Contact2 } from '../../../interfaces/Contact.interface';

export const useContactDetails = (recordID: string, initialContact: Contact2) => {
  const { token } = useAuth();
  const [contactData, setContactData] = useState<Contact2>(initialContact);
  const [loading, setLoading] = useState(true);

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
          } else {
            console.error('Error fetching contact details:', response.message);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching contact details:', error);
        }
      } finally {
        if (isMounted) {setLoading(false);}
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
      const response: ApiResponse = await updateContactById(recordID, updatedData, token);
      if (response.code === 200) {
        setContactData(response.data);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async () => {
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    try {
      await deleteContactById(recordID, token);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return { contactData, loading, updateContact, deleteContact };
};
