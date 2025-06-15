
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { Timer, Brain, Zap, Target, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProductivityMetricsProps {{
  stats: {
    focusHoursToday: number;
    weeklyFocusHours: number;
    activeHabits: number;
    habitStreak: number;
    activeGoals: number;
    notesCount: number;
    reflectionEntries: number;
  };
}

const ProductivityMetrics = ({ stats }: ProductivityMetricsProps) => {
  const { language } = useTheme();

  const t = {
    en: {
      productivity: "Productivity Engine",
      description: "Track your focus, habits, and mental performance",
      focusScore: "Focus Score",
      weeklyHours: "Weekly Hours",
      dailyGoal: "Daily Goal",
      habits: "Active Habits",
      streak: "Current Streak",
      knowledge: "Knowledge Base",
      today: "Today",
      week: "This Week",
      excellent: "Excellent",
      good: "Good",
      needsWork: "Needs Work",
      sessions: "Sessions",
      entries: "Entries"
    },
    id: {
      productivity: "Mesin Produktivitas",
      description: "Lacak fokus, kebiasaan, dan performa mental Anda",
      focusScore: "Skor Fokus",
      weeklyHours: "Jam Mingguan",
      dailyGoal: "Target Harian",
      habits: "Kebiasaan Aktif",
      streak: "Streak Saat Ini",
      knowledge: "Basis Pengetahuan",
      today: "Hari Ini",
      week: "Minggu Ini",
      excellent: "Sangat Baik",
      good: "Baik",
      needsWork: "Perlu Perbaikan",
      sessions: "Sesi",
      entries: "Entri"
    }
  }[language];

  const focusScore = Math.round((stats.focusHoursToday / 8) * 100);
  const productivityScore = Math.round(
    (focusScore * 0.4) +
    ((stats.activeHabits / 5) * 25) +
    ((stats.habitStreak / 7) * 25) +
    ((stats.activeGoals / 3) * 10)
  );

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: t.excellent, color: 'bg-green-500' };
    if (score >= 60) return { label: t.good, color: 'bg-yellow-500' };
    return { label: t.needsWork, color: 'bg-red-500' };
  };

  const scoreInfo = getScoreLabel(productivityScore);

  const focusData = [
    { name: 'Mon', hours: 6.5 },
    { name: 'Tue', hours: 7.2 },
    { name: 'Wed', hours: 5.8 },
    { name: 'Thu', hours: 8.1 },
    { name: 'Fri', hours: 7.5 },
    { name: 'Sat', hours: 4.2 },
    { name: 'Sun', hours: stats.focusHoursToday },
  ];

  const circularData = [
    { name: 'Focus', value: focusScore, fill: '#8b5cf6' },
    { name: 'Habits', value: (stats.activeHabits / 5) * 100, fill: '#10b981' },
    { name: 'Goals', value: (stats.activeGoals / 3) * 100, fill: '#f59e0b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.productivity}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
              </div>
            </div>
            <Badge className={`${scoreInfo.color} text-white`}>
              {scoreInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Productivity Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{productivityScore}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">Overall Productivity</div>
            <Progress value={productivityScore} className="h-3" />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Timer className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.focusHoursToday}h</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.today}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Zap className="h-5 w-5 text-yellow-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.weeklyFocusHours}h</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.week}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Calendar className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.activeHabits}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.habits}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Target className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.habitStreak}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.streak}</div>
            </div>
          </div>

          {/* Focus Trend Chart */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Weekly Focus Trend</h4>
            <ChartContainer
              config={{
                hours: { label: 'Hours', color: '#8b5cf6' },
              }}
              className="h-32"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={focusData}>
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Knowledge Section */}
          <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-100">{t.knowledge}</span>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{stats.notesCount}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Notes</div>
              </div>
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{stats.reflectionEntries}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Reflections</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductivityMetrics;
