import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";
import { useAssets } from '@/hooks/useAssets';
import { AssetResponseDto } from '@/types/asset';
import { Download, Search } from 'lucide-react';
import { ProductCategory } from '@/types/product';
import { categoryApi, type Category } from '@/api/category';

const ProductListing: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { assets, loading, error, fetchAssets } = useAssets();
  
  const [searchTerm, setSearchTerm] = useState('Pro');
  const [category, setCategory] = useState('Photos');
  const [sortBy, setSortBy] = useState('name');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, [toast]);

  useEffect(() => {
    fetchAssets({ 
      page: 1, 
      pageSize: 10,
      searchTerm,
      category: category === 'All' ? undefined : category,
      sortBy
    });
  }, [fetchAssets, searchTerm, category, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAssets({ 
      page: 1, 
      pageSize: 10,
      searchTerm,
      category: category === 'All' ? undefined : category,
      sortBy
    });
  };

  const handleAddToCart = (asset: AssetResponseDto) => {
    addToCart({
      id: asset.id.toString(),
      name: asset.name,
      description: asset.description,
      price: asset.price,
      imageUrl: asset.imageUrls[0] || '',
      category: asset.category as ProductCategory
    });
    toast({
      title: "Added to cart",
      description: `${asset.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 flex-wrap items-end">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-8">No products found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} className="flex flex-col">
              <CardHeader>
                <div className="h-48 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={asset.imageUrls[0] || asset.previewUrl} 
                    alt={asset.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{asset.name}</CardTitle>
                <CardDescription>{asset.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">${asset.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{asset.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  By {asset.sellerName} • {asset.downloadCount} downloads
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/product/${asset.id}`}>View Details</Link>
                </Button>
                <Button onClick={() => handleAddToCart(asset)}>
                  <Download className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;