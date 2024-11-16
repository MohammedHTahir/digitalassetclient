import { Code, Paintbrush, Music, Camera, Film, BookOpen, Gamepad, Briefcase, Palette, Headphones } from 'lucide-react';

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

export const products: Product[] = [
  {
    id: '1',
    name: 'Pro Photo Editor',
    description: 'Advanced photo editing software with AI-powered features.',
    price: 49.99,
    category: 'software',
    imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&auto=format&fit=crop&q=60',
    featured: true,
    rating: 4.8,
    sales: 1200,
    author: 'TechCorp',
    tags: ['photo editing', 'AI', 'professional']
  },
  {
    id: '2',
    name: 'Beat Maker Studio',
    description: 'Professional-grade music production software.',
    price: 79.99,
    category: 'audio',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=60',
    featured: true,
    rating: 4.9,
    sales: 850,
    author: 'AudioLabs',
    tags: ['music production', 'beats', 'studio']
  },
  {
    id: '3',
    name: 'Code Snippets Pack',
    description: 'A collection of reusable code snippets for web developers.',
    price: 29.99,
    category: 'software',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60',
    rating: 4.6,
    sales: 3000,
    author: 'DevTools Inc',
    tags: ['development', 'code', 'web']
  },
  {
    id: '4',
    name: 'Minimalist Icon Pack',
    description: 'A set of 1000+ minimalist icons for modern UI design.',
    price: 19.99,
    category: 'graphics',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60',
    featured: true,
    rating: 4.7,
    sales: 5600,
    author: 'DesignStudio',
    tags: ['icons', 'UI', 'minimal']
  },
  {
    id: '5',
    name: 'Ambient Sounds Collection',
    description: 'High-quality ambient sounds for relaxation and focus.',
    price: 14.99,
    category: 'audio',
    imageUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=500&auto=format&fit=crop&q=60',
    rating: 4.5,
    sales: 2300,
    author: 'SoundScape',
    tags: ['ambient', 'relaxation', 'focus']
  },
  {
    id: '6',
    name: 'Nature Photography Bundle',
    description: 'A collection of 100 high-resolution nature photographs.',
    price: 39.99,
    category: 'photos',
    imageUrl: 'https://images.unsplash.com/photo-1500531359996-c89a0e63e49c?w=500&auto=format&fit=crop&q=60',
    rating: 4.9,
    sales: 1800,
    author: 'NatureShots',
    tags: ['nature', 'photography', 'high-res']
  },
  {
    id: '7',
    name: 'Business Plan Templates',
    description: 'Professional business plan templates for startups.',
    price: 24.99,
    category: 'business',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60',
    rating: 4.6,
    sales: 920,
    author: 'BizPro',
    tags: ['business', 'planning', 'startup']
  },
  {
    id: '8',
    name: 'Indie Game Assets',
    description: 'Complete game asset pack for indie developers.',
    price: 34.99,
    category: 'games',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
    rating: 4.7,
    sales: 750,
    author: 'GameArt',
    tags: ['game development', 'assets', 'indie']
  }
];

export const categories: { id: ProductCategory; name: string; icon: any; description: string }[] = [
  { id: 'software', name: 'Software', icon: Code, description: 'Development tools and applications' },
  { id: 'graphics', name: 'Graphics', icon: Paintbrush, description: 'Visual assets and design resources' },
  { id: 'audio', name: 'Audio', icon: Music, description: 'Sound effects and music tracks' },
  { id: 'photos', name: 'Photos', icon: Camera, description: 'High-quality stock photography' },
  { id: 'videos', name: 'Videos', icon: Film, description: 'Video footage and animations' },
  { id: 'ebooks', name: 'eBooks', icon: BookOpen, description: 'Digital books and guides' },
  { id: 'games', name: 'Games', icon: Gamepad, description: 'Game assets and templates' },
  { id: 'business', name: 'Business', icon: Briefcase, description: 'Business templates and tools' },
  { id: 'design', name: 'Design', icon: Palette, description: 'Design resources and templates' },
  { id: 'music', name: 'Music', icon: Headphones, description: 'Music production tools' }
];

export const getCategoryIcon = (category: ProductCategory) => {
  const categoryData = categories.find(c => c.id === category);
  return categoryData?.icon || Code;
};

export const getCategoryInfo = (category: ProductCategory) => {
  return categories.find(c => c.id === category);
};