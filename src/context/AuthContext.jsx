import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.config';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // We'll get navigate from a component that's inside Router
  // For now, we'll handle navigation differently

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Create navigation wrapper functions
  const login = async (email, password, navigate) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.requiresTwoFactor) {
        return { requiresTwoFactor: true, userId: response.data.userId };
      }
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      
      toast.success('Login successful!');
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const verify2FA = async (userId, token, navigate) => {
    try {
      const response = await axios.post('/auth/verify-2fa', { userId, token });
      
      const { token: authToken, user } = response.data;
      localStorage.setItem('token', authToken);
      setUser(user);
      
      toast.success('2FA verification successful!');
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    verify2FA,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};