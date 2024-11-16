export interface AssetResponseDto {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  createdAt: string;
  lastUpdated?: string;
  seller: SellerDto;
  imageUrls: string[];
  previewUrl: string;
  category: string;
  subCategory: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  status: AssetStatusDto;
  version: string;
  features: string[];
  compatibilities: string[];
  includedFiles: AssetFileDto[];
  documentation: string;
  updateHistory: AssetUpdateDto[];
  fileUrl: string;
  sellerName: string;
}

export interface AssetFilterDto {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  sortBy?: string;
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}


export enum AssetStatusDto {
  Pending = 0,
  Active = 1,
  UnderReview = 2,
  Rejected = 3
}

export interface AssetUpdateDto {
  updateDate: string;
  version: string;
  description: string;
}

export interface AssetFileDto {
  fileName: string; 
  fileType: string;
  fileSize: number;
}

export interface SellerDto {
  id: number;
  name: string;
}