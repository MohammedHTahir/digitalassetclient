import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";
import { assetApi } from '@/api/assets';
import type { AssetResponseDto } from '@/types/asset';
import { Download, Star, Clock, User, Tag, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<AssetResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        if (!id) return;
        const data = await assetApi.getById(parseInt(id));
        setAsset(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const handleAddToCart = () => {
    if (!asset) return;

    addToCart({
      id: asset.id.toString(),
      name: asset.name,
      description: asset.description,
      price: asset.price,
      imageUrl: asset.imageUrls[0] || '',
      category: asset.category
    });
    
    toast({
      title: "Added to cart",
      description: `${asset.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  if (error || !asset) {
    return <div className="container mx-auto mt-8">Error: {error || 'Asset not found'}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{asset.name}</CardTitle>
            <span className="text-2xl font-bold">${asset.price.toFixed(2)}</span>
          </div>
          <CardDescription>{asset.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={asset.imageUrls[0] || asset.previewUrl} 
                alt={asset.name} 
                className="w-full rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {asset.imageUrls.slice(1).map((url, index) => (
                  <img 
                    key={index} 
                    src={url} 
                    alt={`${asset.name} preview ${index + 2}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Star className="text-yellow-500" />
                <span>{asset.rating} rating</span>
                <FileDown />
                <span>{asset.downloadCount} downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Created by {asset.sellerName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Last updated: {new Date(asset.lastUpdated || asset.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Included Files:</h3>
                <ul className="list-disc list-inside">
                  {asset.includedFiles.map((file) => (
                    <li key={file.name}>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside">
              {asset.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {asset.documentation && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Documentation</h3>
              <div className="prose max-w-none">
                {asset.documentation}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => window.open(asset.previewUrl, '_blank')}>
            Preview
          </Button>
          <Button onClick={handleAddToCart}>
            <Download className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetail;