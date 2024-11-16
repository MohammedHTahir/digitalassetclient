import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, CreditCard, Settings, History, Upload } from 'lucide-react';
import { userApi } from '@/api/user';
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ProfileFormData {
  username: string;
  bio: string;
  avatarUrl?: string;
}

const UserProfile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    username: '',
    bio: '',
    avatarUrl: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await userApi.getProfile();
        setProfileData(profile);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Handler for avatar file upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadData = new FormData();
      
      uploadData.append('file', file);
      uploadData.append('username', profileData.username);
      uploadData.append('bio', profileData.bio);

      const response = await userApi.updateProfile(uploadData);
      console.log(response.avatarUrl);
      // Update the profile data with the response
      setProfileData({
        username: response.username,
        bio: response.bio,
        avatarUrl: response.avatarUrl
      });
      
      await refreshUser(); // This should update the user context with new avatar URL
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
};

  // Handler for profile data updates
  const handleProfileUpdate = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      
      // Append all profile fields
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await userApi.updateProfile(formData);
      await refreshUser();
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handler for form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="relative group">
            {(user?.avatarUrl || profileData.avatarUrl) ? (
              <img 
                src={profileData.avatarUrl || user?.avatarUrl} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <label 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 
                         rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={isUploading}
                name="Avatar"
                multiple={false}
              />
              <Upload className="w-6 h-6 text-white" />
            </label>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{profileData.username || user?.username}</h1>
            <p className="text-gray-500">Role: {user?.role}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">User ID</dt>
                      <dd>{profileData.username || user?.username}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="capitalize">{user?.role}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                  <CardDescription>Your activity overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Total Purchases</dt>
                      <dd>0</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                      <dd>0</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Purchase History
                </CardTitle>
                <CardDescription>View all your purchases and downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-4" />
                  <p>No purchases yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Display Name</Label>
                    <Input
                      id="username"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button 
                    onClick={handleProfileUpdate}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Order updates
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      New product alerts
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Newsletter
                    </label>
                  </div>
                </div>
                
                <Separator />

                <div>
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;