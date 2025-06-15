
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-indigo-950/30">
      <DashboardHeader stats={stats} />
      <DashboardContent stats={stats} />
    </div>
  );
};

export default DashboardHome;
