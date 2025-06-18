
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/useTheme";
import {
  User,
  Calendar,
  Timer,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  BookMarked,
  Zap,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRealTimeData } from "@/hooks/useRealTimeData";

interface PersonalStatsSectionProps {
  stats: {
    activeHabits: number;
    habitStreak: number;
    focusHoursToday: number;
    notesCount: number;
    reflectionEntries: number;
    activeGoals: number;
  };
}

const trans = {
  en: {
    personalModules: "Personal System Overview",
    description: "Real-time insights from your life management modules",
    connected: "Live Data Connected",
    offline: "Offline Mode"
  },
  id: {
    personalModules: "Ikhtisar Sistem Pribadi",
    description: "Wawasan real-time dari modul manajemen hidup Anda",
    connected: "Data Live Terhubung",
    offline: "Mode Offline"
  }
};

const PersonalStatsSection = ({ stats }: PersonalStatsSectionProps) => {
  const { language } = useTheme();
  const t = trans[language];
  const { data: realTimeData, isConnected } = useRealTimeData();

  const personalModules = [
    {
      group: "Digital Soul Layer",
      color: "from-primary to-muted/50",
      modules: [
        {
          id: "identity",
          title: "Identity Core",
          description: "Core values & character development",
          icon: <User className="h-6 w-6" />,
          value: "87%",
          subtitle: "Identity clarity score",
          gradient: "from-blue-400/50 via-indigo-400/40 to-indigo-300/60",
          progress: 87
        },
        {
          id: "vision",
          title: "Vision Architecture", 
          description: "Life goals & strategic planning",
          icon: <Target className="h-6 w-6" />,
          value: `${stats.activeGoals} Goals`,
          subtitle: "Active life goals",
          gradient: "from-purple-400/50 via-pink-400/40 to-pink-300/60",
          progress: Math.min((stats.activeGoals / 5) * 100, 100)
        },
      ],
    },
    {
      group: "Life Balance",
      color: "from-green-500 to-emerald-300",
      modules: [
        {
          id: "balance",
          title: "Life Balance",
          description: "Work-life harmony metrics",
          icon: <Activity className="h-6 w-6" />,
          value: "78%",
          subtitle: "Balance score this week",
          gradient: "from-emerald-400/50 via-green-400/40 to-green-300/60",
          progress: 78
        },
        {
          id: "ritual",
          title: "Ritual Engine",
          description: "Daily routines & systems",
          icon: <CheckCircle className="h-6 w-6" />,
          value: "12/15",
          subtitle: "Rituals completed today",
          gradient: "from-teal-400/50 via-cyan-400/40 to-cyan-300/60",
          progress: 80
        }
      ]
    },
    {
      group: "Productivity Engine",
      color: "from-orange-500 to-red-300",
      modules: [
        {
          id: "habits",
          title: "Daily Habits",
          description: "Habit tracking & streaks",
          icon: <Calendar className="h-6 w-6" />,
          value: `${stats.habitStreak} days`,
          subtitle: `${stats.activeHabits} active habits`,
          gradient: "from-green-400/50 via-emerald-400/40 to-emerald-300/60",
          progress: Math.min((stats.habitStreak / 30) * 100, 100)
        },
        {
          id: "focus",
          title: "Focus Sessions",
          description: "Deep work & productivity",
          icon: <Timer className="h-6 w-6" />,
          value: `${stats.focusHoursToday}h`,
          subtitle: "Focused today",
          gradient: "from-orange-400/50 via-red-400/40 to-red-300/60",
          progress: Math.min((stats.focusHoursToday / 8) * 100, 100)
        },
        {
          id: "flow",
          title: "Flow State",
          description: "Peak performance tracking",
          icon: <Zap className="h-6 w-6" />,
          value: "3 sessions",
          subtitle: "Flow states this week",
          gradient: "from-yellow-400/50 via-orange-400/40 to-orange-300/60",
          progress: 75
        }
      ]
    },
    {
      group: "Knowledge System",
      color: "from-blue-500 to-blue-300",
      modules: [
        {
          id: "knowledge",
          title: "Knowledge Hub",
          description: "Learning & knowledge management",
          icon: <BookOpen className="h-6 w-6" />,
          value: `${stats.notesCount} Notes`,
          subtitle: "Knowledge entries",
          gradient: "from-cyan-400/50 via-blue-400/40 to-blue-300/60",
          progress: Math.min((stats.notesCount / 50) * 100, 100)
        },
        {
          id: "reflection",
          title: "Daily Reflection",
          description: "Self-awareness & growth",
          icon: <BookMarked className="h-6 w-6" />,
          value: `${stats.reflectionEntries} entries`,
          subtitle: "This week's reflections",
          gradient: "from-indigo-400/50 via-purple-400/40 to-purple-300/60",
          progress: Math.min((stats.reflectionEntries / 7) * 100, 100)
        },
        {
          id: "analytics",
          title: "Life Analytics",
          description: "Personal metrics & insights",
          icon: <TrendingUp className="h-6 w-6" />,
          value: "↗ 15%",
          subtitle: "Overall improvement",
          gradient: "from-pink-400/50 via-rose-400/40 to-rose-300/60",
          progress: 82
        }
      ]
    }
  ];

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {t.personalModules}
            </h2>
            <p className="text-xl text-muted-foreground font-playfair max-w-2xl">
              {t.description}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: isConnected ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                isConnected 
                  ? 'bg-green-500/10 border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border-red-500/20 text-red-600'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-sm font-medium">{isConnected ? t.connected : t.offline}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <div className="relative z-10 space-y-8">
        {personalModules.map((group, idx) => (
          <section key={group.group} className="space-y-5">
            <div className="flex items-baseline space-x-5">
              <h3 className="text-2xl font-extrabold font-playfair text-foreground">{group.group}</h3>
              <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${group.color} block`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.modules.map((module, index) => (
                <Card key={module.id} className="border bg-card hover:shadow-lg transition-all duration-200 h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      {module.icon}
                    </div>
                    <CardTitle className="text-lg font-bold font-playfair text-foreground">{module.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-playfair">{module.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="space-y-3">
                      <div className="text-2xl font-bold font-playfair text-foreground">{module.value}</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-playfair">{module.subtitle}</span>
                          <span className="text-xs font-medium text-muted-foreground">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PersonalStatsSection;
