
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  Timer,
  Brain,
  FileText,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  ArrowRight,
  Activity,
  Zap
} from 'lucide-react';
import AIAssistant from './AIAssistant';
import NotionAI from './NotionAI';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    goalsCompleted: { value: 0, total: 0 },
    activeHabits: { value: 0, total: 0 },
    focusHours: { value: 0, total: 8 },
    memoriesCaptured: { value: 0, total: null }
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showNotionAI, setShowNotionAI] = useState(false);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Load goals data
      const { data: goals } = await supabase
        .from('goals')
        .select('status')
        .eq('user_id', user.id);

      const completedGoals = goals?.filter(goal => goal.status === 'completed').length || 0;
      const totalGoals = goals?.length || 0;

      // Load habits data
      const { data: habits } = await supabase
        .from('habits')
        .select('is_active')
        .eq('user_id', user.id);

      const activeHabits = habits?.filter(habit => habit.is_active).length || 0;
      const totalHabits = habits?.length || 0;

      // Load focus sessions for today
      const today = new Date().toISOString().split('T')[0];
      const { data: focusSessions } = await supabase
        .from('focus_sessions')
        .select('duration_minutes, was_completed')
        .eq('user_id', user.id)
        .gte('completed_at', today);

      const todayFocusMinutes = focusSessions?.reduce((total, session) => {
        return session.was_completed ? total + session.duration_minutes : total;
      }, 0) || 0;

      // Load memories count
      const { data: memories } = await supabase
        .from('memories')
        .select('id')
        .eq('user_id', user.id);

      const memoriesCount = memories?.length || 0;

      // Load recent activity logs
      const { data: activities } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(4);

      setStats({
        goalsCompleted: { value: completedGoals, total: totalGoals },
        activeHabits: { value: activeHabits, total: totalHabits },
        focusHours: { value: Math.round(todayFocusMinutes / 60 * 10) / 10, total: 8 },
        memoriesCaptured: { value: memoriesCount, total: null }
      });

      setRecentActivities(activities || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsArray = [
    { 
      label: 'Goals Achieved', 
      value: stats.goalsCompleted.value, 
      total: stats.goalsCompleted.total, 
      icon: Target, 
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Completed objectives'
    },
    { 
      label: 'Active Habits', 
      value: stats.activeHabits.value, 
      total: stats.activeHabits.total, 
      icon: Calendar, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Daily rituals maintained'
    },
    { 
      label: 'Focus Hours Today', 
      value: stats.focusHours.value, 
      total: stats.focusHours.total, 
      icon: Clock, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Deep work sessions'
    },
    { 
      label: 'Memories Captured', 
      value: stats.memoriesCaptured.value, 
      total: stats.memoriesCaptured.total, 
      icon: BookOpen, 
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Knowledge preserved'
    }
  ];

  const quickActions = [
    {
      icon: <Timer className="h-5 w-5 text-purple-600" />,
      title: 'Start Focus Session',
      description: 'Begin deep work',
      badge: '25 min',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-700'
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: 'Review Habits',
      description: 'Check daily progress',
      badge: `${stats.activeHabits.value} active`,
      bgColor: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-700'
    },
    {
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      title: 'Capture Memory',
      description: 'Store new insight',
      badge: 'Quick add',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-700'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin"></div>
          <Sparkles className="h-6 w-6 text-[#FFD700] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFD700]/5 to-transparent rounded-2xl p-8 border border-[#FFD700]/20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-[#FFD700]" />
                <span className="text-sm font-medium text-gray-600">Welcome back</span>
              </div>
              <h1 className="text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Playfair Display' }}>
                Ready to Achieve Greatness?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Your personal operating system is ready to help you make today extraordinary.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center shadow-xl">
                <Activity className="h-12 w-12 text-[#1a1a1a]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-300" 
                onClick={() => setShowAIAssistant(true)}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">AI Assistant</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">Intelligent guidance</CardDescription>
                </div>
              </div>
              <p className="text-gray-600">
                Get personalized productivity insights and strategic recommendations
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                Start Conversation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 hover:border-orange-300" 
                onClick={() => setShowNotionAI(true)}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Workspace AI</CardTitle>
                  <CardDescription className="text-orange-600 font-medium">Content management</CardDescription>
                </div>
              </div>
              <p className="text-gray-600">
                Seamlessly manage your workspace and knowledge base
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                Open Workspace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsArray.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="border-2 border-gray-100 hover:border-[#FFD700]/30 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold text-gray-600">{stat.label}</CardTitle>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-[#1a1a1a]">
                    {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                  </div>
                  {stat.total && (
                    <div className="space-y-1">
                      <Progress 
                        value={stat.total > 0 ? (stat.value / stat.total) * 100 : 0} 
                        className="h-2"
                      />
                      <p className="text-xs text-gray-500">
                        {Math.round(stat.total > 0 ? (stat.value / stat.total) * 100 : 0)}% complete
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-2 border-gray-100 hover:border-[#FFD700]/30 hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-[#FFD700]" />
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                Jump into your most important activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${action.bgColor}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {action.icon}
                    </div>
                    <div>
                      <span className={`font-semibold ${action.textColor}`}>{action.title}</span>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/80 shadow-sm">
                    {action.badge}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-2 border-gray-100 hover:border-[#FFD700]/30 hover:shadow-xl transition-all duration-500">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-[#FFD700]" />
                <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                Your latest achievements and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-[#FFD700] to-[#FFC700] rounded-full mt-2 shadow-sm"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#1a1a1a]">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs border-[#FFD700]/30 text-[#1a1a1a]">
                            {activity.module}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500 mb-1">No recent activity</p>
                    <p className="text-xs text-gray-400">Start using the platform to see your progress here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Modals */}
      <AIAssistant 
        isOpen={showAIAssistant} 
        onClose={() => setShowAIAssistant(false)} 
      />

      <NotionAI 
        isOpen={showNotionAI} 
        onClose={() => setShowNotionAI(false)} 
      />
    </div>
  );
};

export default DashboardHome;
