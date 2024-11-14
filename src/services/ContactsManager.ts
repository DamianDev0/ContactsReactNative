import axios from 'axios';
import { Contact } from '../interfaces/Contact.interface';
import { ApiResponse } from '../types/apiresponse';
import { BACKEND_URL } from '@env';

const API_URL = `${BACKEND_URL}/contacts`;

const getContactById = async (
  recordID: string,
  token: string,
): Promise<ApiResponse> => {
  if (!token) {
    throw new Error('No token found, user is not authenticated.');
  }
  const response = await axios.get(`${API_URL}/${recordID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getAllContacts = async (
  token: string,
  page: number,
  limit: number,
): Promise<Contact[]> => {
  const response = await axios.get(`${API_URL}/pagination/${page}/${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (Array.isArray(response.data.data.data)) {
    return response.data.data.data;
  } else {
    throw new Error('Data is not an array');
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
      updateData instanceof FormData ? 'multipart/form-data' : 'application/json',
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
    headers: { Authorization: `Bearer ${token}` },
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

export {
  getContactById,
  getAllContacts,
  updateContactById,
  deleteContactById,
  createOneContact,
};
