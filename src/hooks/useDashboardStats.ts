
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats } from '@/types/dashboard';

const initialState: DashboardStats = {
  totalPortfolioValue: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  totalDebt: 0,
  wealthGoals: 0,
  investments: 0,
  activeHabits: 0,
  activeRituals: 0,
  habitStreak: 0,
  ritualStreak: 0,
  focusHoursToday: 0,
  notesCount: 0,
  reflectionEntries: 0,
  activeGoals: 0,
  lifeBalanceScore: 0,
  weeklyFocusHours: 0,
  completedGoalsThisMonth: 0,
  savingsRate: 0,
  calendarEventsThisWeek: 0,
  notionPagesCount: 0,
};

export const useDashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(initialState);
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
      setLoading(true);
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
        notionPagesCount,
      });

    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading };
};
