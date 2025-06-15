
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useFirstTimeUser = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [hasCompletedWelcome, setHasCompletedWelcome] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && profile) {
      // Check if user has completed initial setup
      const hasSetupIdentity = profile.full_name && profile.full_name !== user.email;
      const welcomeCompleted = localStorage.getItem(`welcome_completed_${user.id}`);
      
      setIsFirstTime(!hasSetupIdentity);
      setHasCompletedWelcome(!!welcomeCompleted);
    }
  }, [user, profile]);

  const markWelcomeCompleted = () => {
    if (user) {
      localStorage.setItem(`welcome_completed_${user.id}`, 'true');
      setHasCompletedWelcome(true);
    }
  };

  return {
    isFirstTime,
    hasCompletedWelcome,
    markWelcomeCompleted
  };
};
