import axios from 'axios';
import {Contact2} from '../interfaces/Contact.interface';

const API_URL = 'http://192.168.89.176:4000/api/v1/contacts';

export interface ApiResponse {
  code: number;
  data: Contact2;
  message: string;
}

// GET: Obtener contacto por ID
export const getContactById = async (
  recordID: string,
  token: string,
): Promise<ApiResponse> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }

  try {
    const response = await axios.get(`${API_URL}/${recordID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contact details:', error);
    throw error;
  }
};

// GET: Obtener todos los contactos
export const getAllContacts = async (token: string): Promise<Contact2[]> => {
  try {
    const response = await axios.get(
      'http://192.168.89.176:4000/api/v1/contacts',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    throw error;
  }
};
// PATCH: Actualizar contacto por ID
export const updateContactById = async (
  recordID: string,
  updateContactData: Partial<Contact2>,
  token: string,
): Promise<ApiResponse> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }

  try {
    const response = await axios.patch(
      `${API_URL}/${recordID}`,
      updateContactData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// DELETE: Eliminar contacto por ID
export const deleteContactById = async (
  recordID: string,
  token: string,
): Promise<void> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }

  console.log(`Attempting to delete contact with ID: ${recordID}`); // Log the ID
  try {
    await axios.delete(`${API_URL}/${recordID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(
      'Error deleting contact:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};
