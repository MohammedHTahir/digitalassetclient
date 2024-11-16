import api from "@/lib/axios";
import { User } from "@/types/user";

export interface ProfileResponse {
  username: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

export const userApi = {
  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await api.get<ProfileResponse>('/User/profile');
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data);
      throw error;
    }
  },

  updateProfile: async (data: FormData): Promise<ProfileResponse> => {
    try {
      const response = await api.put<ProfileResponse>('/User/profile', data, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [(data) => data],
      });
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data);
      throw error;
    }
  },
};