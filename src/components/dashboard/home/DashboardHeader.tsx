
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/contexts/ThemeContext';
import InteractiveAIChatbot from './InteractiveAIChatbot';
import { DashboardStats } from '@/types/dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export interface DashboardHeaderProps {
  stats: DashboardStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ stats }) => {
  const { language } = useTheme();
  const { user, profile, loadingProfile } = useAuth();

  const t = {
    en: {
      welcome: "Welcome to Your Personal OS",
      subtitle: "Master life by design, powered by data",
      lifeBalance: "Life Balance Score",
      todaysFocus: "Today's Focus",
      activeElements: "Active Systems"
    },
    id: {
      welcome: "Selamat Datang di OS Pribadi Anda",
      subtitle: "Kuasai hidup dengan desain, didukung data",
      lifeBalance: "Skor Keseimbangan Hidup",
      todaysFocus: "Fokus Hari Ini",
      activeElements: "Sistem Aktif"
    }
  }[language];

  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;
  const displayName = profile?.full_name || user?.email;

  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-b from-muted/20 to-background">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              {loadingProfile ? (
                <Skeleton className="w-20 h-20 rounded-3xl" />
              ) : (
                <>
                  <Avatar className="w-20 h-20 border-2 border-primary/20 shadow-lg">
                    <AvatarImage src={avatarUrl} alt="User avatar" />
                    <AvatarFallback className="bg-card">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Badge and Welcome Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {loadingProfile ? (
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-12 w-3/4" />
              </div>
            ) : (
              <>
                <Badge variant="outline" className="mb-4 bg-card/80 backdrop-blur-md">
                  {displayName}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {t.welcome}
                </h1>
              </>
            )}
          </motion.div>

          {/* === AI Chatbot Moved Here === */}
          <div className="max-w-2xl mx-auto flex flex-col justify-center my-8">
            <InteractiveAIChatbot />
          </div>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Life Balance Score */}
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border text-center transition-all hover:bg-card hover:shadow-lg">
            <div className="text-3xl font-bold text-foreground mb-2">{stats.lifeBalanceScore}%</div>
            <div className="text-muted-foreground text-sm mb-3">{t.lifeBalance}</div>
            <Progress value={stats.lifeBalanceScore} className="h-2 bg-muted" />
          </div>

          {/* Today's Focus */}
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border text-center transition-all hover:bg-card hover:shadow-lg">
            <div className="text-3xl font-bold text-foreground mb-2">{stats.focusHoursToday}h</div>
            <div className="text-muted-foreground text-sm mb-3">{t.todaysFocus}</div>
            <Progress value={Math.min((stats.focusHoursToday / 8) * 100, 100)} className="h-2 bg-muted" />
          </div>

          {/* Active Systems */}
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border text-center transition-all hover:bg-card hover:shadow-lg">
            <div className="text-3xl font-bold text-foreground mb-2">{stats.activeHabits + stats.activeGoals}</div>
            <div className="text-muted-foreground text-sm mb-3">{t.activeElements}</div>
            <Progress value={Math.min(((stats.activeHabits + stats.activeGoals) / 10) * 100, 100)} className="h-2 bg-muted" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeader;
