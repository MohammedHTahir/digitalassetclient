import api from '@/lib/axios';



export const authApi = {
  login: (email: string, password: string) => {
    const payload = {
      email: email,
      password: password
    };
    
    return api.post('/auth/login', payload);
  },
  
  register: (username: string, email: string, password: string, role: string) => {
    const payload = {
      Username: username,
      Email: email,
      Password: password,
      Role: role
    };
    
    return api.post('/auth/register', payload);
  }
};