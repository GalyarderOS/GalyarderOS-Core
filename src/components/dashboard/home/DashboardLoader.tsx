
import { Crown } from 'lucide-react';

const DashboardLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
        <Crown className="h-8 w-8 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default DashboardLoader;
