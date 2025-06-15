import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText } from 'lucide-react';
import DashboardHeader from './home/DashboardHeader';
import LifeOverviewSection from './home/LifeOverviewSection';
import PersonalSystemsGrid from './home/PersonalSystemsGrid';
import FinancialHealthSection from './home/FinancialHealthSection';
import ProductivityMetrics from './home/ProductivityMetrics';
import LifeAnalyticsCharts from './home/LifeAnalyticsCharts';

interface DashboardHomeProps {
  onOpenAIAssistant: () => void;
  onOpenNotionAI: () => void;
}

const DashboardHome = ({ onOpenAIAssistant, onOpenNotionAI }: DashboardHomeProps) => {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const { data: realTimeData, isConnected } = useRealTimeData();
  
  const [stats, setStats] = useState({
    totalPortfolioValue: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    totalDebt: 0,
    wealthGoals: 0,
    investments: 0,
    activeHabits: 0, // Keep for compatibility with existing components
    activeRituals: 0,
    habitStreak: 0, // Keep for compatibility with existing components
    ritualStreak: 0,
    focusHoursToday: 0,
    notesCount: 0,
    reflectionEntries: 0,
    activeGoals: 0,
    lifeBalanceScore: 0,
    weeklyFocusHours: 0,
    completedGoalsThisMonth: 0,
    savingsRate: 0,
    calendarEventsThisWeek: 0
  });
  const [loading, setLoading] = useState(true);

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

      // Load personal data - use existing habits table since rituals doesn't exist yet
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

      // Simulasi Notion pages count
      const notionPagesCount = Math.floor(Math.random() * 8) + 1; // Demo stat

      // Calculate focus hours for today
      const today = new Date().toISOString().slice(0, 10);
      const { data: focusSessions } = await supabase
        .from('focus_sessions')
        .select('duration_minutes')
        .eq('user_id', user.id)
        .gte('completed_at', today + 'T00:00:00')
        .lte('completed_at', today + 'T23:59:59');

      const focusHoursToday = focusSessions?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) / 60 || 0;

      // Calculate additional metrics
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const { data: weeklyFocus } = await supabase
        .from('focus_sessions')
        .select('duration_minutes')
        .eq('user_id', user.id)
        .gte('completed_at', weekStart.toISOString());

      const weeklyFocusHours = weeklyFocus?.reduce((sum, session) => sum + (session.duration_minutes || 0), 0) / 60 || 0;

      // Load calendar events for this week (simulate for now since no calendar table exists)
      const calendarEventsThisWeek = Math.floor(Math.random() * 15) + 5;

      // Use existing habit_logs table instead of ritual_logs
      const { data: habitLogs } = await supabase
        .from('habit_logs')
        .select('id')
        .eq('user_id', user.id)
        .gte('completed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Calculate life balance score (simplified)
      const lifeBalanceScore = Math.round(
        ((habits?.length || 0) / 5 * 25) + 
        (Math.min(focusHoursToday / 4, 1) * 25) + 
        ((goals?.length || 0) / 3 * 25) + 
        (Math.min((monthlyIncome - monthlyExpenses) / monthlyIncome || 0, 1) * 25)
      );

      const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0;

      setStats({
        totalPortfolioValue,
        monthlyIncome,
        monthlyExpenses,
        totalDebt,
        wealthGoals: wealthGoals?.length || 0,
        investments: investments?.length || 0,
        activeHabits: habits?.length || 0, // Use habits for backward compatibility
        activeRituals: habits?.length || 0, // Same value for now
        habitStreak: Math.min(habitLogs?.length || 0, 7), // Use habit logs for backward compatibility
        ritualStreak: Math.min(habitLogs?.length || 0, 7), // Same value for now
        focusHoursToday: Math.round(focusHoursToday * 10) / 10,
        notesCount: memories?.length || 0,
        reflectionEntries: Math.floor(Math.random() * 5) + 1,
        activeGoals: goals?.length || 0,
        lifeBalanceScore,
        weeklyFocusHours: Math.round(weeklyFocusHours * 10) / 10,
        completedGoalsThisMonth: Math.floor(Math.random() * 3) + 1,
        savingsRate: Math.round(savingsRate * 10) / 10,
        calendarEventsThisWeek,
        notionPagesCount // tambahkan notionPagesCount
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

  // ---- ChatBot AI Greeting Section (after Hero) ----
  // You may want to move this to a separate component for maintainability if file gets too long
  function AIGreetingChat() {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="rounded-2xl border border-primary/60 bg-card/60 px-6 py-6 shadow-lg flex flex-col items-start gap-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#fff" strokeWidth="2.5"/><circle cx="12" cy="12" r="4.5" fill="#fff" /></svg>
            </div>
            <div className="font-semibold text-base">AI Assistant</div>
          </div>
          <div className="text-lg text-muted-foreground font-playfair flex flex-col gap-2">
            <span>👋 Welcome back!</span>
            <span>
              I'm your personal assistant—ready to help you master life by design.<br/>Ask me anything, get personalized productivity tips, and control your dashboard with natural language.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900/50 dark:to-indigo-950/30">
      <DashboardHeader stats={stats} />
      
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <LifeOverviewSection stats={stats} />

        {/* AI Chatbot Greeting (large, visible at the top, instead of modal AI section) */}
        <AIGreetingChat />

        {/* Ensure notionPagesCount gets passed */}
        <PersonalSystemsGrid stats={{
          activeRituals: stats.activeRituals,
          ritualStreak: stats.ritualStreak,
          focusHoursToday: stats.focusHoursToday,
          weeklyFocusHours: stats.weeklyFocusHours,
          notesCount: stats.notesCount,
          reflectionEntries: stats.reflectionEntries,
          activeGoals: stats.activeGoals,
          completedGoalsThisMonth: stats.completedGoalsThisMonth,
          calendarEventsThisWeek: stats.calendarEventsThisWeek,
          notionPagesCount: stats.notionPagesCount
        }} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FinancialHealthSection stats={stats} />
          <ProductivityMetrics stats={stats} />
        </div>
        <LifeAnalyticsCharts stats={stats} />
        
        {/* Notion AI as a single card only */}
        <section className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Notion AI</h3>
            <p className="text-slate-600 dark:text-slate-400">AI-powered knowledge management</p>
          </div>
          <div className="max-w-lg mx-auto grid grid-cols-1 gap-6">
            <Card className="group border-0 bg-gradient-to-br from-teal-500/10 via-green-500/5 to-emerald-500/10 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Notion AI</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI-powered knowledge management</p>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <Button onClick={onOpenNotionAI} className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700">
                  Open Notion AI
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
