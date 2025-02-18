import axios from 'axios';
import { MissingPerson, SearchParams } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL
});

export const missingPersonsApi = {
  getAll: async (params?: SearchParams) => {
    try {
      const response = await api.get<MissingPerson[]>('/missing-persons', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch missing persons:', error);
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
      console.error('Failed to create missing person:', error);
      throw error;
    }
  }
};