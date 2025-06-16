// import { supabase } from '@/integrations/supabase/client';
// import { User } from '@supabase/supabase-js';
import { Profile } from './types';
import { User } from './types'; // Import our own User type

// TODO: Replace with Bolt API
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  console.log('Fetching profile for user:', userId);
  return {
    id: userId,
    full_name: 'Mock User',
    has_completed_onboarding: true,
  };
};

export const ensureProfileExists = async (user: User): Promise<void> => {
  console.log('Ensuring profile exists for user:', user.id);
  // No-op for now
};

export const signUpUser = async (email: string, password: string, fullName: string) => {
  console.log('Signing up user:', email, fullName);
  return { error: null };
};

export const signInUser = async (email: string, password: string) => {
  console.log('Signing in user:', email);
  return { error: null };
};

export const signInWithGoogleUser = async () => {
  console.log('Signing in with Google');
  return { error: null };
};

export const signOutUser = async () => {
  console.log('Signing out user');
};
