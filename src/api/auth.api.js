import axios from './axios.config';

export const authApi = {
  login: (email, password) => axios.post('/auth/login', { email, password }),
  verify2FA: (userId, token) => axios.post('/auth/verify-2fa', { userId, token }),
  forgotPassword: (email) => axios.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => axios.put(`/auth/reset-password/${token}`, { password }),
  getMe: () => axios.get('/auth/me'),
  logout: () => axios.post('/auth/logout'),
};