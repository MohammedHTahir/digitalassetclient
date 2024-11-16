import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brush, 
  Camera, 
  Film, 
  Gamepad, 
  Briefcase, 
  Palette, 
  Headphones, 
  BookOpen, 
  Code, 
  Music,
  Sparkles,
  Download
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";
import { useAssets } from '@/hooks/useAssets';
import { AssetResponseDto } from '@/types/asset';
import { categoryApi, type Category } from '@/api/category';
import { ProductCategory } from '@/types/product';


const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { assets, loading, error, fetchAssets, pagination } = useAssets();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const iconMap = {
    brush: Brush,
    camera: Camera,
    film: Film,
    gamepad: Gamepad,
    briefcase: Briefcase,
    palette: Palette,
    headphones: Headphones,
    'book-open': BookOpen,
    code: Code,
    'music-note': Music
   };

  useEffect(() => {
    fetchAssets({ 
      category: "Photos",
      searchTerm: "Pro",
      sortBy: "name",
      page: 1, 
      pageSize: 6 
    });
  }, [fetchAssets]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
      } catch (error) {
        setCategoriesError(error instanceof Error ? error.message : 'Failed to fetch categories');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Dokan Load</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your one-stop marketplace for premium digital downloads. Discover, download, and create.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/products">Start Exploring</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Sparkles className="w-8 h-8 mr-2 text-yellow-500" />
          Featured Products
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets?.map((asset) => (
                <Card key={asset.id} className="flex flex-col">
                  <CardHeader>
                    <div className="h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={asset.imageUrls[0] || '/default-image.jpg'}
                        alt={asset.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardTitle>{asset.name}</CardTitle>
                    <CardDescription>{asset.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
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
            {pagination && (
              <div className="mt-8 flex justify-center gap-4">
                <Button 
                  variant="outline"
                  disabled={!pagination.hasPreviousPage} 
                  onClick={() => fetchAssets({ page: pagination.page - 1, pageSize: pagination.pageSize })}
                >
                  Previous
                </Button>
                <span className="flex items-center">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button 
                  variant="outline"
                  disabled={!pagination.hasNextPage}
                  onClick={() => fetchAssets({ page: pagination.page + 1, pageSize: pagination.pageSize })}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
        {categoriesLoading ? (
          <div>Loading categories...</div>
        ) : categoriesError ? (
          <div>Error: {categoriesError}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
 const IconComponent = iconMap[category.icon as keyof typeof iconMap];
 return (
   <Card key={category.id} className="group hover:shadow-lg transition-shadow">
     <Link to={`/products?category=${category.id}`}>
       <CardHeader className="text-center">
         <div className="w-8 h-8 mx-auto mb-2 group-hover:text-blue-600 transition-colors">
           {IconComponent && <IconComponent />}
         </div>
         <CardTitle className="text-lg">{category.name}</CardTitle>
       </CardHeader>
       <CardContent>
         <CardDescription className="text-sm text-center">
           {category.description}
         </CardDescription>
       </CardContent>
     </Link>
   </Card>
 );
})}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-8">Join thousands of creators making a living on Dokan Load</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/sell">Become a Seller</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;