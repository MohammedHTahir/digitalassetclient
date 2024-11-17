import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Download, Clock } from 'lucide-react';
import { userApi } from '@/api/user';
import { useToast } from "@/components/ui/use-toast"
import { SettingsTab } from './profile/tabs/SettingsTab';
import { DownloadsTab } from './profile/tabs/DownloadsTab';
import { ActivityTab } from './profile/tabs/ActivityTab';
import { OverviewTab } from './profile/tabs/OverviewTab';
import { ProfileHeader } from './profile/ProfileHeader';

export default function UserProfile() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      
      // Important: Include all required fields from the DTO
      formData.append('Avatar', file, file.name);
      formData.append('Username', user?.username || '');
      formData.append('Bio', user?.bio || '');

      // Debug logging
      console.log('File being uploaded:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], '=', pair[1]);
      }

      await userApi.updateProfile(formData);
      await refreshUser();
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully"
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.title || "Failed to update profile picture",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
};

  const handleProfileUpdate = async () => {
    try {
      setIsSaving(true);
      const data = new FormData();
      data.append('Username', formData.username);
      data.append('Bio', formData.bio);
      
      await userApi.updateProfile(data);
      await refreshUser();
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader 
          user={user}
          isUploading={isUploading}
          onAvatarUpload={handleAvatarUpload}
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-100">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gray-100">
              <Clock className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-gray-100">
              <Download className="w-4 h-4 mr-2" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-100">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab />
          </TabsContent>

          <TabsContent value="downloads">
            <DownloadsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab
              formData={formData}
              isSaving={isSaving}
              onInputChange={handleInputChange}
              onSave={handleProfileUpdate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}