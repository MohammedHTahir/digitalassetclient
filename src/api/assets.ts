import api from '@/lib/axios';
import type { AssetFilterDto, AssetResponseDto, PaginatedResponse } from '@/types/asset';

export const assetApi = {
  getAll: async (filter: AssetFilterDto): Promise<PaginatedResponse<AssetResponseDto>> => {
    try {
      const response = await api.get('/Asset', { 
        params:filter,        
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch assets: ${error.message}`);
      }
      throw new Error('Failed to fetch assets');
    }
  },

  getById: async (id: number): Promise<AssetResponseDto> => {
    try {
      const response = await api.get(`/Asset/${id}`, {
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch asset: ${error.message}`);
      }
      throw new Error('Failed to fetch asset');
    }
  },

  upload: async (formData: FormData): Promise<AssetResponseDto> => {
    try {
      const response = await api.post('/Asset/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000 // 30 second timeout for uploads
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to upload asset: ${error.message}`);
      }
      throw new Error('Failed to upload asset');
    }
  },

  purchase: async (id: number): Promise<void> => {
    try {
      await api.post(`/Asset/${id}/purchase`, null, {
        timeout: 10000
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to purchase asset: ${error.message}`);
      }
      throw new Error('Failed to purchase asset');
    }
  },

  download: async (id: number): Promise<Blob> => {
    try {
      const response = await api.get(`/Asset/${id}/download`, {
        responseType: 'blob',
        timeout: 30000 // 30 second timeout for downloads
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to download asset: ${error.message}`);
      }
      throw new Error('Failed to download asset');
    }
  }
};