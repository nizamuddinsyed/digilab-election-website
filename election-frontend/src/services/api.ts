import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Candidate interface
export interface Candidate {
  id: number;
  name: string;
  position: string;
  bio_de: string;
  bio_en: string;
  goals_de: string;
  goals_en: string;
  email: string;
  social_links: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  photo_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  total: number;
  active: number;
  inactive: number;
}

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    return response.data;
  },
};

// Candidates API
export const candidatesAPI = {
  getAll: async (activeOnly = false): Promise<Candidate[]> => {
    const url = activeOnly ? '/candidates?active=true' : '/candidates';
    const response = await api.get(url);
    return response.data;
  },
  
  getById: async (id: number): Promise<Candidate> => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },
  
  create: async (formData: FormData): Promise<Candidate> => {
    const response = await api.post('/candidates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  update: async (id: number, formData: FormData): Promise<Candidate> => {
    const response = await api.put(`/candidates/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/candidates/${id}`);
  },
  
  getStats: async (): Promise<Stats> => {
    const response = await api.get('/candidates/admin/stats');
    return response.data;
  },
};

export default api;
