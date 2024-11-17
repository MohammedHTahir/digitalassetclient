import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '@/api/auth';
import { userApi } from '@/api/user';
import { useToast } from "@/components/ui/use-toast";
import { authService } from '@/services/auth';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (username: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserProfile = async () => {
    try {
      const userData = await userApi.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          await fetchUserProfile();
        } catch (error) {
          console.error('Error during auth initialization:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

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
      const response = await authApi.login(email, password);
      const newToken = response.data.token;
      
      // Set token first
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Add a small delay before fetching profile
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Then fetch user profile
      await fetchUserProfile();
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });
      
      return response;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    
    toast({
      title: "Logged out",
      description: "Your session has expired. Please log in again."
    });
  };

  const refreshUser = async () => {
    await fetchUserProfile();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      register,
      logout, 
      refreshUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};