import axios from 'axios';
import { MissingPerson, SearchParams } from '../types';

const API_URL = import.meta.env.VITE_API_URL;
console.log('Using API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const missingPersonsApi = {
  getAll: async (params?: SearchParams) => {
    try {
      console.log('Fetching with params:', params);
      const response = await api.get<MissingPerson[]>('/missing-persons', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  create: async (formData: FormData) => {
    try {
      const response = await api.post<MissingPerson>('/missing-persons', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};