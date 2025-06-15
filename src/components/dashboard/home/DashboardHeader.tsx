import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/contexts/ThemeContext';
import InteractiveAIChatbot from './InteractiveAIChatbot';
import { DashboardStats } from '@/types/dashboard';

export interface DashboardHeaderProps {
  stats: DashboardStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ stats }) => {
  const { theme, language } = useTheme();

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

  // Use theme-aware color for dot pattern
  const dotColor = theme === 'dark' ? 'hsl(var(--muted))' : 'hsl(var(--border))';
  const encodedDotColor = encodeURIComponent(dotColor);
  const dotPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodedDotColor}' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="relative overflow-hidden">
      {/* Background is inherited from OSStyleLayout for consistency */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url("${dotPattern}")` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-background/50 backdrop-blur-md rounded-3xl flex items-center justify-center border shadow-2xl">
                <Crown className="h-10 w-10 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Badge and Welcome Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur-md">
              GalyarderOS v2.0
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              {t.welcome}
            </h1>
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
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-6 border text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{stats.lifeBalanceScore}%</div>
            <div className="text-muted-foreground text-sm mb-3">{t.lifeBalance}</div>
            <Progress value={stats.lifeBalanceScore} className="h-2 bg-muted" />
          </div>

          {/* Today's Focus */}
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-6 border text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{stats.focusHoursToday}h</div>
            <div className="text-muted-foreground text-sm mb-3">{t.todaysFocus}</div>
            <Progress value={Math.min((stats.focusHoursToday / 8) * 100, 100)} className="h-2 bg-muted" />
          </div>

          {/* Active Systems */}
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-6 border text-center">
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
