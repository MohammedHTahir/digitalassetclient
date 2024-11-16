export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  featured?: boolean;
  rating?: number;
  sales?: number;
  author?: string;
  tags?: string[];
}

export type ProductCategory = 
  | 'software' 
  | 'graphics' 
  | 'audio' 
  | 'photos' 
  | 'videos' 
  | 'ebooks'
  | 'games'
  | 'business'
  | 'design'
  | 'music';