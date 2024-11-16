import api from '@/lib/axios';

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/Category', {
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
      }
      throw new Error('Failed to fetch categories');
    }
  }
}; 