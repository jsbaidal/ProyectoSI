import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { mockApi } from '../services/mockApi';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'worker' | 'admin';
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: 'client' | 'worker';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && localStorage.getItem('userId')) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await mockApi.get('/api/auth/me');
      const userData = response.data.data as User;
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await mockApi.post('/api/auth/login', { email, password });
    const loginData = response.data.data as { user: User; token: string };
    if (loginData && loginData.user && loginData.token) {
      setToken(loginData.token);
      setUser(loginData.user);
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('userId', loginData.user.id);
    }
  };

  const register = async (data: RegisterData) => {
    const response = await mockApi.post('/api/auth/register', data);
    const registerData = response.data.data as { user: User; token: string };
    if (registerData && registerData.user && registerData.token) {
      setToken(registerData.token);
      setUser(registerData.user);
      localStorage.setItem('token', registerData.token);
      localStorage.setItem('userId', registerData.user.id);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

