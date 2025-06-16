// import { User, Session } from '@supabase/supabase-js';
// import { Tables } from '@/integrations/supabase/types';

// TODO: Replace with Bolt's user/session types
export type User = {
  id: string;
  email?: string;
  // add other user properties as needed
};

export type Session = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type Profile = {
  id: string;
  full_name?: string;
  has_completed_onboarding?: boolean;
  avatar_url?: string;
  // add other profile properties as needed
};

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  loadingProfile: boolean;
  reloadProfile: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}
