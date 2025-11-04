import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin + '/api';

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
  color?: 'purple' | 'silver' | 'teal';
  created_at: string;
  updated_at: string;
}

export interface Stats {
  total: number;
  active: number;
  inactive: number;
}

export interface Policy {
  id: number;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  color: 'purple' | 'silver' | 'teal';
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BasicTopic {
  id: number;
  title_de: string;
  title_en: string;
  description_de: string;
  description_en: string;
  color: 'purple' | 'silver' | 'teal';
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question_de: string;
  question_en: string;
  answer_de: string;
  answer_en: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title_de: string;
  title_en: string;
  event_date: string;
  event_time: string;
  location_de: string;
  location_en: string;
  description_de: string;
  description_en: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
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

// Policies API
export const policiesAPI = {
  getAll: async (): Promise<Policy[]> => {
    const response = await api.get('/policies');
    return response.data;
  },

  getAllAdmin: async (): Promise<Policy[]> => {
    const response = await api.get('/policies/admin/all');
    return response.data;
  },

  create: async (data: Omit<Policy, 'id' | 'created_at' | 'updated_at' | 'display_order'>): Promise<Policy> => {
    const response = await api.post('/policies', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Policy>): Promise<Policy> => {
    const response = await api.put(`/policies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/policies/${id}`);
  },
};

// Basic Topics API
export const basicTopicsAPI = {
  getAll: async (): Promise<BasicTopic[]> => {
    const response = await api.get('/basic-topics');
    return response.data;
  },

  getAllAdmin: async (): Promise<BasicTopic[]> => {
    const response = await api.get('/basic-topics/admin/all');
    return response.data;
  },

  create: async (data: Omit<BasicTopic, 'id' | 'created_at' | 'updated_at' | 'display_order'>): Promise<BasicTopic> => {
    const response = await api.post('/basic-topics', data);
    return response.data;
  },

  update: async (id: number, data: Partial<BasicTopic>): Promise<BasicTopic> => {
    const response = await api.put(`/basic-topics/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/basic-topics/${id}`);
  },
};

// FAQs API
export const faqsAPI = {
  getAll: async (): Promise<FAQ[]> => {
    const response = await api.get('/faqs');
    return response.data;
  },

  getAllAdmin: async (): Promise<FAQ[]> => {
    const response = await api.get('/faqs/admin/all');
    return response.data;
  },

  create: async (data: Omit<FAQ, 'id' | 'created_at' | 'updated_at' | 'display_order'>): Promise<FAQ> => {
    const response = await api.post('/faqs', data);
    return response.data;
  },

  update: async (id: number, data: Partial<FAQ>): Promise<FAQ> => {
    const response = await api.put(`/faqs/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/faqs/${id}`);
  },
};

// Events API
export const eventsAPI = {
  getAll: async (): Promise<Event[]> => {
    const response = await api.get('/events');
    return response.data;
  },

  getAllAdmin: async (): Promise<Event[]> => {
    const response = await api.get('/events/admin/all');
    return response.data;
  },

  create: async (data: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'display_order'>): Promise<Event> => {
    const response = await api.post('/events', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Event>): Promise<Event> => {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/events/${id}`);
  },
};

export default api;
