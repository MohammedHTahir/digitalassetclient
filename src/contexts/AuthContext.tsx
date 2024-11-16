import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '@/api/auth';
import { useToast } from "@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const register = async (username: string, email: string, password: string, role: string) => {
    try {
      await authApi.register(username, email, password, role);
      
      await login(email, password);
      
      toast({
        title: "Account created",
        description: "Welcome to Dokan Load!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive"
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Debug point 4: Log values received by login function
      console.log('AuthContext login received:', { 
        email, 
        password,
        emailType: typeof email,
        passwordType: typeof password 
      });
  
      const response = await authApi.login(email, password);
      
      console.log('Response:', response.data);
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast({
      title: "Logged out",
      description: "Successfully signed out"
    });
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      refreshUser
    }}>
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