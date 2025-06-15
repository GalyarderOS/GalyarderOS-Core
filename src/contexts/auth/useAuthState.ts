
import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { SessionManager } from '@/utils/security';
import { toast } from '@/hooks/use-toast';
import { Profile } from './types';
import { fetchProfile, ensureProfileExists, signOutUser } from './authService';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const signOut = useCallback(async () => {
    await signOutUser();
    setProfile(null);
  }, []);

  useEffect(() => {
    let sessionManager: SessionManager | null = null;
    if (user) {
      sessionManager = new SessionManager(30 * 60 * 1000, () => {
        toast({
          title: 'Session Expired',
          description: 'You have been logged out due to inactivity.',
        });
        signOut();
      });
    }
    return () => {
      sessionManager?.destroy();
    };
  }, [user, signOut]);

  const loadProfile = async (userId: string) => {
    setLoadingProfile(true);
    try {
      const profileData = await fetchProfile(userId);
      setProfile(profileData);
    } finally {
      setLoadingProfile(false);
    }
  };

  const reloadProfile = async () => {
    if (user) {
      await loadProfile(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle profile fetching asynchronously
        if (session?.user) {
          setTimeout(() => {
            ensureProfileExists(session.user).then(() => {
              loadProfile(session.user.id);
            });
          }, 0);
        } else {
          setProfile(null);
          setLoadingProfile(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
