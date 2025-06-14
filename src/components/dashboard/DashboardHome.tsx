
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
  Award,
  Star,
  Trophy
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
      bgColor: 'bg-primary/5',
      description: 'Objectives completed with distinction'
    },
    { 
      label: 'Active Habits', 
      value: stats.activeHabits.value, 
      total: stats.activeHabits.total, 
      icon: Calendar, 
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      description: 'Daily rituals maintained elegantly'
    },
    { 
      label: 'Focus Hours Today', 
      value: stats.focusHours.value, 
      total: stats.focusHours.total, 
      icon: Clock, 
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      description: 'Deep work sessions accomplished'
    },
    { 
      label: 'Memories Captured', 
      value: stats.memoriesCaptured.value, 
      total: stats.memoriesCaptured.total, 
      icon: BookOpen, 
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      description: 'Knowledge preserved with care'
    }
  ];

  const quickActions = [
    {
      icon: <Timer className="h-5 w-5 text-primary" />,
      title: 'Begin Focus Session',
      description: 'Engage in purposeful deep work',
      badge: '25 minutes',
      bgColor: 'bg-primary/5 hover:bg-primary/10 border border-primary/15',
      textColor: 'text-primary'
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: 'Review Daily Habits',
      description: 'Assess progress with intention',
      badge: `${stats.activeHabits.value} rituals`,
      bgColor: 'bg-primary/5 hover:bg-primary/10 border border-primary/15',
      textColor: 'text-primary'
    },
    {
      icon: <Brain className="h-5 w-5 text-primary" />,
      title: 'Capture New Memory',
      description: 'Preserve valuable insights',
      badge: 'Quick entry',
      bgColor: 'bg-primary/5 hover:bg-primary/10 border border-primary/15',
      textColor: 'text-primary'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <Crown className="h-8 w-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="bg-card/50 rounded-3xl p-10 border border-border/20 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="space-y-6 flex-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-2xl shadow-lg">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase font-serif">Distinguished Member</span>
                    <p className="text-lg text-primary font-serif">Welcome back to excellence</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold mb-4 font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <span className="text-foreground">Ready for Greatness?</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-serif">
                    Your personal operating system stands ready. Transform ambition into achievement with sophisticated precision.
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center shadow-lg border-4 border-card">
                  <Trophy className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="group cursor-pointer border-2 border-primary/15 hover:border-primary/30 transition-all duration-500 bg-card/80 hover:bg-card" 
                onClick={() => setShowAIAssistant(true)}>
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-primary/10 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>AI Concierge</CardTitle>
                    <CardDescription className="text-primary font-semibold font-serif">Your strategic counsel</CardDescription>
                  </div>
                </div>
                <Star className="h-6 w-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-muted-foreground leading-relaxed font-serif">
                Sophisticated artificial intelligence at your service, providing strategic insights and productivity guidance with distinguished expertise.
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg font-serif text-base">
                Consult Your Assistant
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="group cursor-pointer border-2 border-primary/15 hover:border-primary/30 transition-all duration-500 bg-card/80 hover:bg-card" 
                onClick={() => setShowNotionAI(true)}>
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-primary/10 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>Workspace Butler</CardTitle>
                    <CardDescription className="text-primary font-semibold font-serif">Content mastery service</CardDescription>
                  </div>
                </div>
                <Sparkles className="h-6 w-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-muted-foreground leading-relaxed font-serif">
                Elegant knowledge management and content curation, providing seamless organization of your intellectual endeavors with refined precision.
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg font-serif text-base">
                Access Your Workspace
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card className="border-2 border-border/30 hover:border-primary/20 transition-all duration-500 bg-card/80 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground font-serif tracking-wide">{stat.label}</CardTitle>
                  <p className="text-xs text-muted-foreground/70 font-serif leading-relaxed">{stat.description}</p>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bgColor} border border-border/20 shadow-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {stat.total ? `${stat.value}/${stat.total}` : stat.value}
                  </div>
                  {stat.total && (
                    <div className="space-y-3">
                      <Progress 
                        value={stat.total > 0 ? (stat.value / stat.total) * 100 : 0} 
                        className="h-3 bg-muted/30"
                      />
                      <p className="text-xs text-muted-foreground font-serif">
                        {Math.round(stat.total > 0 ? (stat.value / stat.total) * 100 : 0)}% accomplished with distinction
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="border-2 border-border/30 hover:border-primary/20 transition-all duration-500 bg-card/80">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>Swift Actions</CardTitle>
                  <CardDescription className="font-serif text-base">
                    Immediate access to your essential activities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-400 ${action.bgColor} shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-card/80 rounded-xl shadow-sm border border-border/20">
                      {action.icon}
                    </div>
                    <div>
                      <span className={`font-semibold text-base ${action.textColor} font-serif`}>{action.title}</span>
                      <p className="text-sm text-muted-foreground font-serif mt-1">{action.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-card/90 shadow-sm border border-border/30 font-serif px-3 py-1">
                    {action.badge}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Card className="border-2 border-border/30 hover:border-primary/20 transition-all duration-500 bg-card/80">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Achievements</CardTitle>
                  <CardDescription className="font-serif text-base">
                    Your distinguished progress and accomplishments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 1 }}
                      className="flex items-start space-x-4 pb-5 border-b border-border/20 last:border-0"
                    >
                      <div className="w-4 h-4 bg-primary rounded-full mt-2 shadow-sm border-2 border-card"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base font-serif">{activity.action}</p>
                        <div className="flex items-center space-x-3 mt-3">
                          <Badge variant="outline" className="text-xs border-primary/20 text-foreground font-serif px-2 py-1">
                            {activity.module}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-serif">
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-lg font-semibold text-muted-foreground mb-2 font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>Your distinguished journey begins</p>
                    <p className="text-sm text-muted-foreground/80 font-serif max-w-xs mx-auto leading-relaxed">
                      Commence your elegant productivity journey to witness your sophisticated progress unfold here
                    </p>
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
