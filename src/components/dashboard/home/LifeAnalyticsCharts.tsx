
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar
} from 'recharts';
import { TrendingUp, BarChart3, Activity, Target } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface LifeAnalyticsChartsProps {
  stats: {
    lifeBalanceScore: number;
    focusHoursToday: number;
    activeHabits: number;
    activeGoals: number;
    totalPortfolioValue: number;
    savingsRate: number;
    habitStreak: number;
  };
}

const LifeAnalyticsCharts = ({ stats }: LifeAnalyticsChartsProps) => {
  const { language } = useTheme();

  const t = {
    en: {
      lifeAnalytics: "Life Analytics Dashboard",
      description: "Comprehensive insights into your life optimization journey",
      lifeBalance: "Life Balance Radar",
      monthlyProgress: "Monthly Progress Trends",
      weeklyStats: "Weekly Performance",
      personal: "Personal",
      financial: "Financial",
      productivity: "Productivity",
      health: "Health",
      relationships: "Relationships",
      spirituality: "Spirituality"
    },
    id: {
      lifeAnalytics: "Dashboard Analitik Hidup",
      description: "Wawasan komprehensif perjalanan optimisasi hidup Anda",
      lifeBalance: "Radar Keseimbangan Hidup",
      monthlyProgress: "Tren Kemajuan Bulanan",
      weeklyStats: "Performa Mingguan",
      personal: "Pribadi",
      financial: "Finansial",
      productivity: "Produktivitas",
      health: "Kesehatan",
      relationships: "Hubungan",
      spirituality: "Spiritualitas"
    }
  }[language];

  // Radar chart data for life balance
  const radarData = [
    { subject: t.personal, A: 85, fullMark: 100 },
    { subject: t.financial, A: Math.min(stats.savingsRate * 2, 100), fullMark: 100 },
    { subject: t.productivity, A: Math.min((stats.focusHoursToday / 8) * 100, 100), fullMark: 100 },
    { subject: t.health, A: 78, fullMark: 100 },
    { subject: t.relationships, A: 72, fullMark: 100 },
    { subject: t.spirituality, A: 65, fullMark: 100 },
  ];

  // Monthly progress data
  const monthlyData = [
    { month: 'Jan', personal: 65, financial: 45, productivity: 70 },
    { month: 'Feb', personal: 72, financial: 52, productivity: 75 },
    { month: 'Mar', personal: 78, financial: 68, productivity: 82 },
    { month: 'Apr', personal: 85, financial: Math.min(stats.savingsRate * 2, 100), productivity: Math.min((stats.focusHoursToday / 8) * 100, 100) },
  ];

  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', habits: 4, focus: 6.5, goals: 2 },
    { day: 'Tue', habits: 5, focus: 7.2, goals: 3 },
    { day: 'Wed', habits: 3, focus: 5.8, goals: 2 },
    { day: 'Thu', habits: 5, focus: 8.1, goals: 4 },
    { day: 'Fri', habits: 4, focus: 7.5, goals: 3 },
    { day: 'Sat', habits: 3, focus: 4.2, goals: 1 },
    { day: 'Sun', habits: stats.activeHabits, focus: stats.focusHoursToday, goals: stats.activeGoals },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.lifeAnalytics}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Life Balance Radar */}
        <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">{t.lifeBalance}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                A: { label: 'Score', color: '#8b5cf6' },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" fontSize={10} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={8} />
                  <Radar
                    name="Life Balance"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">{t.monthlyProgress}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                personal: { label: t.personal, color: '#8b5cf6' },
                financial: { label: t.financial, color: '#10b981' },
                productivity: { label: t.productivity, color: '#f59e0b' },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" fontSize={10} />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="productivity" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="financial" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="personal" 
                    stackId="1" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">{t.weeklyStats}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                habits: { label: 'Habits', color: '#10b981' },
                focus: { label: 'Focus (h)', color: '#8b5cf6' },
                goals: { label: 'Goals', color: '#f59e0b' },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" fontSize={10} />
                  <YAxis fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="habits" fill="#10b981" radius={2} />
                  <Bar dataKey="focus" fill="#8b5cf6" radius={2} />
                  <Bar dataKey="goals" fill="#f59e0b" radius={2} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default LifeAnalyticsCharts;
