
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Profile } from './types';

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  } catch (e) {
    console.error('Error fetching profile:', e);
    return null;
  }
};

export const ensureProfileExists = async (user: User): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('user_id', user.id)
    .single();

  if (error && error.code === 'PGRST116') {
    console.log('No profile found for user, creating one.');
    const newUserProfile = {
      user_id: user.id,
      full_name: user.user_metadata?.full_name || user.email,
      email: user.email,
      avatar_url: user.user_metadata?.avatar_url,
    };

    const { error: createError } = await supabase.from('profiles').insert(newUserProfile);

    if (createError) {
      console.error('Error creating profile:', createError.message);
    } else {
      console.log('Profile created successfully.');
    }
  } else if (error) {
    console.error("Error checking for profile:", error);
  }
};

export const signUpUser = async (email: string, password: string, fullName: string) => {
  const redirectUrl = `${window.location.origin}/dashboard`;
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        full_name: fullName
      }
    }
  });
  return { error };
};

export const signInUser = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { error };
};

export const signInWithGoogleUser = async () => {
  const redirectUrl = `${window.location.origin}/dashboard`;
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl
    }
  });
  return { error };
};

export const signOutUser = async () => {
  await supabase.auth.signOut();
};
