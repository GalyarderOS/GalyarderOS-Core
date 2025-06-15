
import { User, Session } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;

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
