import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText } from 'lucide-react';
import HeroSection from './home/HeroSection';
import PersonalStatsSection from './home/PersonalStatsSection';
import ModuleStatsOverview from './home/ModuleStatsOverview';
import FinanceModulesSection from './home/FinanceModulesSection';

interface DashboardHomeProps {
  onOpenAIAssistant: () => void;
  onOpenNotionAI: () => void;
}

const DashboardHome = ({ onOpenAIAssistant, onOpenNotionAI }: DashboardHomeProps) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPortfolioValue: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    totalDebt: 0,
    wealthGoals: 0,
    investments: 0,
    activeHabits: 0,
    habitStreak: 0,
    focusHoursToday: 0,
    notesCount: 0,
    reflectionEntries: 0,
    activeGoals: 0
  });
  const [loading, setLoading] = useState(true);
  const { data: realTimeData, isConnected, notifications } = useRealTimeData();

  useEffect(() => {
    if (user) {
      loadAllUserStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAllUserStats = async () => {
    if (!user) return;

    try {
      // Load financial data
      const { data: portfolios } = await supabase
        .from('investment_portfolios')
        .select('total_value')
        .eq('user_id', user.id);

      const totalPortfolioValue = portfolios?.reduce((sum, portfolio) => sum + (portfolio.total_value || 0), 0) || 0;

      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: transactions } = await supabase
        .from('cashflow_transactions')
        .select('amount, type')
        .eq('user_id', user.id)
        .gte('transaction_date', currentMonth + '-01');

      let monthlyIncome = 0;
      let monthlyExpenses = 0;

      transactions?.forEach(transaction => {
        if (transaction.type === 'income') {
          monthlyIncome += transaction.amount;
        } else {
          monthlyExpenses += transaction.amount;
        }
      });

      const { data: debts } = await supabase
        .from('debts')
        .select('remaining_amount')
        .eq('user_id', user.id);

      const totalDebt = debts?.reduce((sum, debt) => sum + debt.remaining_amount, 0) || 0;

      const { data: wealthGoals } = await supabase
        .from('wealth_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active');

      const { data: investments } = await supabase
        .from('investments')
        .select('id')
        .eq('user_id', user.id);

      // Load personal data
      const { data: habits } = await supabase
        .from('habits')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true);

      const { data: goals } = await supabase
        .from('goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active');

      const { data: memories } = await supabase
        .from('memories')
        .select('id')
        .eq('user_id', user.id);

      // Calculate focus hours for today
      const today = new Date().toISOString().slice(0, 10);
      const { data: focusSessions } = await supabase
        .from('focus_sessions')
        .select('duration_minutes')
        .eq('user_id', user.id)
        .gte('completed_at', today + 'T00:00:00')
        .lte('completed_at', today + 'T23:59:59');

      const focusHoursToday = focusSessions?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) / 60 || 0;

      // Get habit streak (simplified - just count recent completions)
      const { data: habitLogs } = await supabase
        .from('habit_logs')
        .select('id')
        .eq('user_id', user.id)
        .gte('completed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      setStats({
        totalPortfolioValue,
        monthlyIncome,
        monthlyExpenses,
        totalDebt,
        wealthGoals: wealthGoals?.length || 0,
        investments: investments?.length || 0,
        activeHabits: habits?.length || 0,
        habitStreak: Math.min(habitLogs?.length || 0, 7),
        focusHoursToday: Math.round(focusHoursToday * 10) / 10,
        notesCount: memories?.length || 0,
        reflectionEntries: Math.floor(Math.random() * 5) + 1, // Mock data for now
        activeGoals: goals?.length || 0
      });

    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <HeroSection stats={stats} />
      <PersonalStatsSection stats={stats} />
      <ModuleStatsOverview stats={stats} />
      <FinanceModulesSection stats={stats} />
      
      {/* AI Tools Section */}
      <section className="space-y-5">
        <div className="flex items-baseline space-x-5">
          <h3 className="text-2xl font-extrabold font-playfair text-foreground">AI Tools</h3>
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-300 block" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card className="border bg-card hover:shadow-lg transition-all duration-200 h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400/50 via-blue-400/40 to-blue-300/60 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Brain className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold font-playfair text-foreground">AI Assistant</CardTitle>
              <p className="text-sm text-muted-foreground font-playfair">Personal AI assistant for productivity</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button onClick={onOpenAIAssistant} variant="outline" className="w-full">
                Open Assistant
              </Button>
            </CardContent>
          </Card>

          <Card className="border bg-card hover:shadow-lg transition-all duration-200 h-full">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-400/50 via-slate-400/40 to-slate-300/60 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg font-bold font-playfair text-foreground">Notion AI</CardTitle>
              <p className="text-sm text-muted-foreground font-playfair">AI-powered knowledge management</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Button onClick={onOpenNotionAI} variant="outline" className="w-full">
                Open Notion AI
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {notifications.length > 0 && (
        <div className="fixed top-20 right-6 space-y-2 z-40">
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border backdrop-blur-md ${
                notification.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' :
                notification.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600' :
                notification.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-600' :
                'bg-blue-500/10 border-blue-500/20 text-blue-600'
              }`}
            >
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs opacity-70">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
