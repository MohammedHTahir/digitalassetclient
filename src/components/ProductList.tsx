import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  { id: 1, name: 'Digital Art Pack', description: 'High-quality digital art assets', price: 19.99 },
  { id: 2, name: 'UI Kit', description: 'Comprehensive UI kit for web designers', price: 29.99 },
  { id: 3, name: 'Stock Photo Collection', description: 'Diverse collection of stock photos', price: 39.99 },
  { id: 4, name: 'Icon Set', description: 'Versatile icon set for various projects', price: 14.99 },
  { id: 5, name: 'Font Package', description: 'Premium fonts for typography enthusiasts', price: 24.99 },
  { id: 6, name: '3D Model Bundle', description: 'High-quality 3D models for designers', price: 49.99 },
];

const ProductList: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;