import axios from 'axios';
import {Contact} from '../interfaces/Contact.interface';
import {ApiResponse} from '../types/apiresponse';

const API_URL = 'http://192.168.1.2:4000/api/v1/contacts';

const getContactById = async (
  recordID: string,
  token: string,
): Promise<ApiResponse> => {
  if (!token) {throw new Error('No token found, user is not authenticated.');}
  const response = await axios.get(`${API_URL}/${recordID}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

const getAllContacts = async (token: string): Promise<Contact[]> => {
  const response = await axios.get(API_URL, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data.data;
};

const updateContactById = async (
  recordID: string,
  updateData: FormData | Partial<Contact>,
  token: string,
): Promise<ApiResponse<Contact>> => {
  if (!token) {throw new Error('No token found, user is not authenticated.');}
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
  if (!token) {throw new Error('No token found, user is not authenticated.');}
  await axios.delete(`${API_URL}/${recordID}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export {getContactById, getAllContacts, updateContactById, deleteContactById};
