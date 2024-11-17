// components/profile/ProfileHeader.tsx
import { Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
  isUploading: boolean;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function ProfileHeader({ user, isUploading, onAvatarUpload }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative group">
          {/* Avatar section */}
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-gray-100 shadow-md">
              <span className="text-3xl font-bold text-gray-600">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {/* Upload controls */}
          <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onAvatarUpload}
              disabled={isUploading}
            />
            <Upload className="w-6 h-6 text-white" />
          </label>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        {/* User info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            <Badge variant="secondary" className="text-sm">
              {user.role}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">{user.bio || 'No bio added yet'}</p>
          <UserStats />
        </div>
      </div>
    </div>
  );
}

// Stats subcomponent
function UserStats() {
  return (
    <div className="flex space-x-4 mt-4">
      <StatItem label="Member since" value="November 2023" />
      <StatItem label="Downloads" value="23" />
      <StatItem label="Uploads" value="5" />
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}