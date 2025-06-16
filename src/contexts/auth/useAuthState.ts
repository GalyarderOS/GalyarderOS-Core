import { useState, useEffect, useCallback } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';
// import { SessionManager } from '@/utils/security';
// import { toast } from '@/hooks/use-toast';
import { Profile, User, Session } from './types';
import { fetchProfile, signOutUser } from './authService';

const mockUser: User = {
  id: 'mock-user-id',
  email: 'user@example.com',
};

const mockSession: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  user: mockUser,
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const signOut = useCallback(async () => {
    // TODO: Replace with Bolt API
    await signOutUser();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  const reloadProfile = useCallback(async () => {
    if (user) {
      setLoadingProfile(true);
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    // TODO: Replace with Bolt's auth state management
    setLoading(true);
    setLoadingProfile(true);

    setTimeout(() => {
      setUser(mockUser);
      setSession(mockSession);
      fetchProfile(mockUser.id).then((profileData) => {
        setProfile(profileData);
        setLoadingProfile(false);
      });
      setLoading(false);
    }, 500);
  }, []);

  return {
    user,
    session,
    profile,
    loading,
    loadingProfile,
    signOut,
    reloadProfile,
  };
};
