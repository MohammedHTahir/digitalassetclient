// components/profile/tabs/SettingsTab.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, User } from "lucide-react";

interface SettingsTabProps {
  formData: {
    username: string;
    bio: string;
  };
  isSaving: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => Promise<void>;
}

export function SettingsTab({ formData, isSaving, onInputChange, onSave }: SettingsTabProps) {
  return (
    <div className="grid gap-6">
      {/* Profile Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </CardTitle>
          <CardDescription>Manage your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="username">Display Name</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={onInputChange}
                className="max-w-md"
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={onInputChange}
                placeholder="Tell us about yourself..."
                className="max-w-md"
              />
            </div>

            <Button 
              onClick={onSave}
              disabled={isSaving}
              className="w-fit"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <NotificationOption
              label="Email Notifications"
              description="Receive updates about your account"
            />
            <Separator />
            <NotificationOption
              label="Download Alerts"
              description="Get notified about new downloads"
            />
            <Separator />
            <NotificationOption
              label="Security Alerts"
              description="Important security-related notifications"
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Shield className="w-5 h-5 mr-2" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="font-medium text-red-900">Delete Account</h4>
            <p className="text-sm text-red-600 mt-1">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" size="sm" className="mt-4">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationOption({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch />
    </div>
  );
}