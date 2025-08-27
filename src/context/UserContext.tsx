import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  joinDate: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: { username: string; email: string; bio: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Migrate old key (movieverse_user) to new branding (bingibo_user)
    const oldKey = 'movieverse_user';
    const newKey = 'bingibo_user';
    const savedOld = localStorage.getItem(oldKey);
    const savedNew = localStorage.getItem(newKey);
    if (!savedNew && savedOld) {
      localStorage.setItem(newKey, savedOld);
      localStorage.removeItem(oldKey);
    }
    const savedUser = localStorage.getItem(newKey);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    if (!email || password.length < 6) return false;
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return false;
      const u = await res.json();
      const uNorm: User = { id: String(u.id), username: u.username, email: u.email, bio: u.bio, joinDate: u.joinDate };
      setUser(uNorm);
      localStorage.setItem('bingibo_user', JSON.stringify(uNorm));
      return true;
    } catch {
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    if (!username || !email || password.length < 6) return false;
    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (!res.ok) return false;
      const u = await res.json();
      const uNorm: User = { id: String(u.id), username: u.username, email: u.email, bio: u.bio, joinDate: u.joinDate };
      setUser(uNorm);
      localStorage.setItem('bingibo_user', JSON.stringify(uNorm));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bingibo_user');
  };

  const updateProfile = (data: { username: string; email: string; bio: string }) => {
    if (!user) return;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    fetch(`${baseUrl}/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((u: any) => {
        const updatedUser: User = { id: String(u.id), username: u.username, email: u.email, bio: u.bio, joinDate: u.joinDate };
        setUser(updatedUser);
        localStorage.setItem('bingibo_user', JSON.stringify(updatedUser));
      })
      .catch(() => {});
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};