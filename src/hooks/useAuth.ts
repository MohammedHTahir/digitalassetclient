import { useState, useEffect } from 'react';

interface User {
  username: string;
  // Add other user properties as needed
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  return {
    user,
    // Add other auth-related methods as needed
  };
} 