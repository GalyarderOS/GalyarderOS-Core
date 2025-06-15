
import { useState, useEffect } from 'react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DashboardHeader } from './home/DashboardHeader';
import DashboardContent from './home/DashboardContent';
import DashboardLoader from './home/DashboardLoader';
import WelcomeCenter from './WelcomeCenter';
import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';

const DashboardHome = () => {
  const { stats, loading } = useDashboardStats();
  const { isFirstTime, hasCompletedWelcome, markWelcomeCompleted } = useFirstTimeUser();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (isFirstTime && !hasCompletedWelcome) {
      setShowWelcome(true);
    }
  }, [isFirstTime, hasCompletedWelcome]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    markWelcomeCompleted();
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <DashboardLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader stats={stats} />
      <DashboardContent stats={stats} />
      
      <WelcomeCenter 
        isOpen={showWelcome} 
        onClose={handleWelcomeClose} 
      />
    </div>
  );
};

export default DashboardHome;
