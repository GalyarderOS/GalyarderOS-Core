// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';

export const useFirstTimeUser = () => {
  // const { user, profile, reloadProfile, loadingProfile } = useAuth();

  const isFirstTimeUser = false; // Mock value

  const markOnboardingCompleted = async () => {
    // TODO: Replace with Bolt API
    console.log('Marking onboarding as completed');
  };

  return {
    isFirstTimeUser,
    markOnboardingCompleted,
    isLoading: false, // Mock value
  };
};
