import axios from './axios.config';

export const servicesApi = {
  getAll: () => axios.get('/services'),
  getById: (id) => axios.get(`/services/${id}`),
  getBySlug: (slug) => axios.get(`/services/slug/${slug}`),
  create: (data) => axios.post('/services', data),
  update: (id, data) => axios.put(`/services/${id}`, data),
  delete: (id) => axios.delete(`/services/${id}`),
};