
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useFirstTimeUser = () => {
  const { user, profile, reloadProfile, loadingProfile } = useAuth();

  const isFirstTimeUser = profile ? !profile.has_completed_onboarding : false;

  const markOnboardingCompleted = async () => {
    if (user && profile) {
      const { error } = await supabase
        .from('profiles')
        .update({ has_completed_onboarding: true })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error marking onboarding as completed:', error.message);
      } else {
        await reloadProfile();
      }
    }
  };

  return {
    isFirstTimeUser,
    markOnboardingCompleted,
    isLoading: loadingProfile,
  };
};
