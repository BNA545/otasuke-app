import axios from 'axios';
import { MissingPerson, SearchParams } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export const missingPersonsApi = {
  getAll: async (params?: SearchParams) => {
    const response = await api.get<MissingPerson[]>('/missing-persons', { params });
    return response.data;
  },
  
  create: async (formData: FormData) => {
    const response = await api.post<MissingPerson>('/missing-persons', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};