
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, Target, Calendar, Timer, BookOpen, Brain, 
  Activity, CheckCircle, Zap, BookMarked, TrendingUp, Clock 
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface PersonalSystemsGridProps {
  stats: {
    activeRituals: number;
    ritualStreak: number;
    focusHoursToday: number;
    weeklyFocusHours: number;
    notesCount: number;
    reflectionEntries: number;
    activeGoals: number;
    completedGoalsThisMonth: number;
    calendarEventsThisWeek: number;
  };
}

const PersonalSystemsGrid = ({ stats }: PersonalSystemsGridProps) => {
  const { language } = useTheme();

  const t = {
    en: {
      personalSystems: "Personal Development Systems",
      description: "Track your growth across all life dimensions",
      identity: "Identity Core",
      vision: "Vision & Goals",
      balance: "Life Balance",
      ritual: "Ritual Engine",
      calendar: "Calendar",
      focus: "Focus Engine",
      knowledge: "Knowledge Hub",
      reflection: "Reflection",
      analytics: "Life Analytics",
      active: "Active",
      streak: "Streak",
      today: "Today",
      week: "This Week",
      month: "This Month",
      entries: "Entries",
      complete: "Complete",
      sessions: "Sessions",
      improvement: "Improvement",
      events: "Events"
    },
    id: {
      personalSystems: "Sistem Pengembangan Pribadi",
      description: "Lacak pertumbuhan Anda di semua dimensi kehidupan",
      identity: "Inti Identitas",
      vision: "Visi & Tujuan",
      balance: "Keseimbangan Hidup",
      ritual: "Mesin Ritual",
      calendar: "Kalender",
      focus: "Mesin Fokus",
      knowledge: "Hub Pengetahuan",
      reflection: "Refleksi",
      analytics: "Analitik Hidup",
      active: "Aktif",
      streak: "Beruntun",
      today: "Hari Ini",
      week: "Minggu Ini",
      month: "Bulan Ini",
      entries: "Entri",
      complete: "Lengkap",
      sessions: "Sesi",
      improvement: "Peningkatan",
      events: "Acara"
    }
  }[language];

  const personalModules = [
    {
      id: "identity",
      title: t.identity,
      icon: <User className="h-5 w-5" />,
      value: t.complete,
      metric: "Profile Set",
      progress: 100,
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      id: "vision",
      title: t.vision,
      icon: <Target className="h-5 w-5" />,
      value: stats.activeGoals,
      metric: `${stats.completedGoalsThisMonth} completed ${t.month}`,
      progress: Math.min((stats.activeGoals / 5) * 100, 100),
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      id: "balance",
      title: t.balance,
      icon: <Activity className="h-5 w-5" />,
      value: "78%",
      metric: "Balance score",
      progress: 78,
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderGradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      id: "ritual",
      title: t.ritual,
      icon: <CheckCircle className="h-5 w-5" />,
      value: `${stats.activeRituals}`,
      metric: `${stats.ritualStreak} day ${t.streak}`,
      progress: Math.min((stats.ritualStreak / 30) * 100, 100),
      gradient: "from-teal-500/20 to-cyan-500/20",
      borderGradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-500/10 to-cyan-500/10"
    },
    {
      id: "calendar",
      title: t.calendar,
      icon: <Calendar className="h-5 w-5" />,
      value: `${stats.calendarEventsThisWeek}`,
      metric: `${t.events} ${t.week}`,
      progress: Math.min((stats.calendarEventsThisWeek / 20) * 100, 100),
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      id: "focus",
      title: t.focus,
      icon: <Timer className="h-5 w-5" />,
      value: `${stats.focusHoursToday}h`,
      metric: `${stats.weeklyFocusHours}h ${t.week}`,
      progress: Math.min((stats.focusHoursToday / 8) * 100, 100),
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      id: "knowledge",
      title: t.knowledge,
      icon: <BookOpen className="h-5 w-5" />,
      value: stats.notesCount,
      metric: `${t.entries} saved`,
      progress: Math.min((stats.notesCount / 50) * 100, 100),
      gradient: "from-violet-500/20 to-purple-500/20",
      borderGradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-500/10 to-purple-500/10"
    },
    {
      id: "reflection",
      title: t.reflection,
      icon: <BookMarked className="h-5 w-5" />,
      value: stats.reflectionEntries,
      metric: `${t.entries} ${t.week}`,
      progress: Math.min((stats.reflectionEntries / 7) * 100, 100),
      gradient: "from-indigo-500/20 to-purple-500/20",
      borderGradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10"
    },
    {
      id: "analytics",
      title: t.analytics,
      icon: <TrendingUp className="h-5 w-5" />,
      value: "↗ 15%",
      metric: `Overall ${t.improvement}`,
      progress: 82,
      gradient: "from-pink-500/20 to-rose-500/20",
      borderGradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/10 to-rose-500/10"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.personalSystems}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {personalModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
            className="group"
          >
            <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="pb-3 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${module.borderGradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{module.icon}</div>
                </div>
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-center space-y-3">
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{module.value}</div>
                <div className="space-y-2">
                  <Progress value={module.progress} className="h-2" />
                  <div className="text-xs text-slate-600 dark:text-slate-400">{module.metric}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PersonalSystemsGrid;
