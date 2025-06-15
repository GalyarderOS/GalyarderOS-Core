
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DashboardHeader } from './home/DashboardHeader';
import DashboardContent from './home/DashboardContent';
import DashboardLoader from './home/DashboardLoader';

const DashboardHome = () => {
  const { stats, loading } = useDashboardStats();

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
    </div>
  );
};

export default DashboardHome;
