// src/api/user.ts
import api from "@/lib/axios";
import { User } from "@/types/user";

export const userApi = {
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/User/profile');
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data);
      throw error;
    }
  },

  updateProfile: async (data: FormData): Promise<User> => {
    try {
      // Debug log the FormData contents
      console.log('Sending FormData:');
      for (let pair of data.entries()) {
        console.log('- ', pair[0], '=', pair[1]);
      }

      const response = await api.put<User>('/User/profile', data);
      return response.data;
    } catch (error: any) {
      console.error('Full error response:', error.response?.data);
      throw error;
    }
  },
};