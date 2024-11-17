export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  Avatar?: File;
}