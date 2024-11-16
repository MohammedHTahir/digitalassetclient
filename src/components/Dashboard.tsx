import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user.username}!</CardTitle>
            <CardDescription>Manage your account and view your purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Purchases</CardTitle>
            <CardDescription>Access your digital downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Purchases</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sell Your Products</CardTitle>
            <CardDescription>Start selling your digital goods</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Create Listing</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;