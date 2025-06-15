
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DashboardHeader } from './home/DashboardHeader';
import DashboardContent from './home/DashboardContent';
import DashboardLoader from './home/DashboardLoader';
import WelcomeCenter from './WelcomeCenter';
import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';

const DashboardHome = () => {
  const { stats, loading } = useDashboardStats();
  const { isFirstTimeUser, markOnboardingCompleted, isLoading: isFirstTimeUserLoading } = useFirstTimeUser();

  const handleWelcomeClose = () => {
    markOnboardingCompleted();
  };

  if (loading || isFirstTimeUserLoading) {
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
        isOpen={isFirstTimeUser} 
        onClose={handleWelcomeClose} 
      />
    </div>
  );
};

export default DashboardHome;
