import { useState, useCallback } from 'react';
import { assetApi } from '@/api/assets';
import type { AssetResponseDto, PaginatedResponse } from '@/types/asset';
import { useToast } from '@/components/ui/use-toast';

interface FetchAssetsParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  category?: string;
  sortBy?: string;
}

export function useAssets() {
  const [assets, setAssets] = useState<AssetResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<any>, 'items'>>({
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const { toast } = useToast();

  const fetchAssets = useCallback(async (params: FetchAssetsParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await assetApi.getAll({
        page: params.page,
        pageSize: params.pageSize,
        searchTerm: params.searchTerm,
        category: params.category,
        sortBy: params.sortBy
      });

      setAssets(response.items);
      setPagination({
        totalCount: response.totalCount,
        page: response.page,
        pageSize: response.pageSize,
        totalPages: Math.ceil(response.totalCount / response.pageSize),
        hasNextPage: response.page * response.pageSize < response.totalCount,
        hasPreviousPage: response.page > 1
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch assets';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const purchaseAsset = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await assetApi.purchase(id);
      toast({
        title: 'Success',
        description: 'Asset purchased successfully'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to purchase asset';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const downloadAsset = useCallback(async (id: number, filename: string) => {
    try {
      setLoading(true);
      const blob = await assetApi.download(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download asset';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    assets,
    loading,
    error,
    pagination,
    fetchAssets,
    purchaseAsset,
    downloadAsset
  };
}