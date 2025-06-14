
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
  Crown,
  ArrowRight,
  Activity,
  Zap,
  Sparkles,
  Award
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
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Completed objectives'
    },
    { 
      label: 'Active Habits', 
      value: stats.activeHabits.value, 
      total: stats.activeHabits.total, 
      icon: Calendar, 
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Daily rituals maintained'
    },
    { 
      label: 'Focus Hours Today', 
      value: stats.focusHours.value, 
      total: stats.focusHours.total, 
      icon: Clock, 
      color: 'text-secondary-foreground',
      bgColor: 'bg-secondary/50',
      description: 'Deep work sessions'
    },
    { 
      label: 'Memories Captured', 
      value: stats.memoriesCaptured.value, 
      total: stats.memoriesCaptured.total, 
      icon: BookOpen, 
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/30',
      description: 'Knowledge preserved'
    }
  ];

  const quickActions = [
    {
      icon: <Timer className="h-5 w-5 text-primary" />,
      title: 'Start Focus Session',
      description: 'Begin deep work',
      badge: '25 min',
      bgColor: 'bg-primary/5 hover:bg-primary/10 border border-primary/20',
      textColor: 'text-primary'
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-accent" />,
      title: 'Review Habits',
      description: 'Check daily progress',
      badge: `${stats.activeHabits.value} active`,
      bgColor: 'bg-accent/5 hover:bg-accent/10 border border-accent/20',
      textColor: 'text-accent'
    },
    {
      icon: <Brain className="h-5 w-5 text-secondary-foreground" />,
      title: 'Capture Memory',
      description: 'Store new insight',
      badge: 'Quick add',
      bgColor: 'bg-secondary/20 hover:bg-secondary/30 border border-secondary/30',
      textColor: 'text-secondary-foreground'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          <Crown className="h-6 w-6 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-transparent rounded-2xl p-8 border border-accent/20 old-money-card">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Crown className="h-7 w-7 text-accent" />
                <span className="text-sm font-medium text-muted-foreground tracking-wide">Welcome back, distinguished member</span>
              </div>
              <h1 className="text-4xl font-bold old-money-heading" style={{ fontFamily: 'Playfair Display' }}>
                Ready to Achieve Greatness?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl old-money-subheading">
                Your personal operating system awaits your command. Transform ambition into achievement.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center soft-shadow-lg">
                <Award className="h-12 w-12 text-accent-foreground" />
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
          <Card className="old-money-card group cursor-pointer border-2 border-primary/20 hover:border-primary/40" 
                onClick={() => setShowAIAssistant(true)}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl soft-shadow group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold old-money-heading">AI Concierge</CardTitle>
                  <CardDescription className="text-primary font-medium old-money-subheading">Personal guidance</CardDescription>
                </div>
              </div>
              <p className="text-muted-foreground old-money-subheading">
                Your sophisticated assistant for strategic insights and productivity counsel
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground soft-shadow-lg old-money-button">
                Consult Assistant
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
          <Card className="old-money-card group cursor-pointer border-2 border-accent/20 hover:border-accent/40" 
                onClick={() => setShowNotionAI(true)}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-accent to-accent/80 rounded-xl soft-shadow group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold old-money-heading">Workspace Butler</CardTitle>
                  <CardDescription className="text-accent font-medium old-money-subheading">Content mastery</CardDescription>
                </div>
              </div>
              <p className="text-muted-foreground old-money-subheading">
                Elegant knowledge management and content curation at your service
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground soft-shadow-lg old-money-button">
                Access Workspace
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
            <Card className="old-money-card border-2 border-border hover:border-accent/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold text-muted-foreground old-money-subheading">{stat.label}</CardTitle>
                  <p className="text-xs text-muted-foreground/80 old-money-subheading">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} border border-border/50`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold old-money-heading">
                    {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                  </div>
                  {stat.total && (
                    <div className="space-y-2">
                      <Progress 
                        value={stat.total > 0 ? (stat.value / stat.total) * 100 : 0} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground old-money-subheading">
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
          <Card className="old-money-card border-2 border-border hover:border-accent/30">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-accent" />
                <CardTitle className="text-xl font-bold old-money-heading">Quick Actions</CardTitle>
              </div>
              <CardDescription className="old-money-subheading">
                Swift access to your most essential activities
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
                    <div className="p-2 bg-card rounded-lg soft-shadow">
                      {action.icon}
                    </div>
                    <div>
                      <span className={`font-semibold ${action.textColor} old-money-subheading`}>{action.title}</span>
                      <p className="text-sm text-muted-foreground old-money-subheading">{action.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-card/80 soft-shadow border border-border/50">
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
          <Card className="old-money-card border-2 border-border hover:border-accent/30">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-accent" />
                <CardTitle className="text-xl font-bold old-money-heading">Recent Activity</CardTitle>
              </div>
              <CardDescription className="old-money-subheading">
                Your latest achievements and distinguished progress
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
                      className="flex items-start space-x-3 pb-4 border-b border-border last:border-0"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mt-2 soft-shadow"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm old-money-subheading">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs border-accent/30 text-foreground old-money-subheading">
                            {activity.module}
                          </Badge>
                          <span className="text-xs text-muted-foreground old-money-subheading">
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm font-medium text-muted-foreground mb-1 old-money-subheading">Your journey begins now</p>
                    <p className="text-xs text-muted-foreground/80 old-money-subheading">Start using the platform to see your distinguished progress here</p>
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
