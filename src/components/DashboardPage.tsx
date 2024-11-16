import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download,
  DollarSign,
  ShoppingCart,
  Star,
  BarChart2,
  PackageOpen
} from 'lucide-react';
import { useAssets } from '@/hooks/useAssets';

const DashboardPage: React.FC = () => {
  const { assets, loading, error, fetchAssets } = useAssets();

  useEffect(() => {
    fetchAssets({ 
      page: 1, 
      pageSize: 5,
    });
  }, [fetchAssets]);

  const stats = [
    { title: 'Total Sales', value: '$1,234', icon: DollarSign },
    { title: 'Downloads', value: '856', icon: Download },
    { title: 'Active Products', value: assets?.length || '0', icon: ShoppingCart },
    { title: 'Avg Rating', value: '4.8', icon: Star },
  ];

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <BarChart2 className="w-8 h-8 text-gray-400" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : assets && assets.length > 0 ? (
            <div className="divide-y">
              {assets.map((asset) => (
                <div key={asset.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={asset.imageUrls[0] || '/default-image.jpg'} 
                      alt={asset.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{asset.name}</h3>
                      <p className="text-sm text-gray-500">${asset.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {asset.downloadCount} downloads
                    </span>
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{asset.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <PackageOpen className="w-12 h-12 mb-2" />
              <p>No products available yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardPage; 