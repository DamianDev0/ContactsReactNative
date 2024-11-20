import axios from 'axios';
import {Contact} from '../interfaces/Contact.interface';
import {ApiResponse} from '../types/apiresponse';

const API_URL = 'https://closetoyoudeltabackend.onrender.com/api/v1/contacts';

const getContactById = async (
  recordID: string,
  token: string,
): Promise<ApiResponse> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }
  const response = await axios.get(`${API_URL}/${recordID}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

const getAllContacts = async (
  token: string,
  page: number,
  limit: number,
): Promise<Contact[]> => {
  try {
    const response = await axios.get(`${API_URL}/pagination`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit },
    });

    if (Array.isArray(response.data.data.data)) {
      return response.data.data.data;
    } else {
      throw new Error('Data is not an array');
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }
};

const updateContactById = async (
  recordID: string,
  updateData: FormData | Partial<Contact>,
  token: string,
): Promise<ApiResponse<Contact>> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type':
      updateData instanceof FormData
        ? 'multipart/form-data'
        : 'application/json',
  };
  const response = await axios.patch(`${API_URL}/${recordID}`, updateData, {
    headers,
  });
  return response.data as ApiResponse<Contact>;
};

const deleteContactById = async (
  recordID: string,
  token: string,
): Promise<void> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }
  await axios.delete(`${API_URL}/${recordID}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

const createOneContact = async (
  token: string,
  newContactData: FormData,
): Promise<Contact> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  const response = await axios.post(`${API_URL}/oneContact`, newContactData, {
    headers,
  });

  return response.data.data;
};

const getFilteredContacts = async (
  token: string,
  searchText: string,
  searchType: 'name' | 'email' | 'phone',
  page: number,
  limit: number,
): Promise<Contact[]> => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      headers: {Authorization: `Bearer ${token}`},
      params: {
        [searchType]: searchText,
        page: page,
        limit: limit,
      },
    });

    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error('Data is not an array');
    }
  } catch (error) {
    console.error('Error fetching filtered contacts:', error);
    throw new Error('Failed to fetch filtered contacts');
  }
};

export {
  getContactById,
  getAllContacts,
  updateContactById,
  deleteContactById,
  createOneContact,
  getFilteredContacts,
};
