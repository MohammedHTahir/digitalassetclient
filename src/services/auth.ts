import api from '@/lib/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  role: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    console.log('Sending login request...');
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
