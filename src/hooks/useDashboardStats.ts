import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
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

const mockStats: DashboardStats = {
  totalPortfolioValue: 76543.21,
  monthlyIncome: 5432.10,
  monthlyExpenses: 2345.67,
  totalDebt: 12345.67,
  wealthGoals: 3,
  investments: 12,
  activeHabits: 5,
  activeRituals: 3,
  habitStreak: 14,
  ritualStreak: 5,
  focusHoursToday: 2.5,
  notesCount: 42,
  reflectionEntries: 15,
  activeGoals: 4,
  lifeBalanceScore: 78,
  weeklyFocusHours: 15.5,
  completedGoalsThisMonth: 2,
  savingsRate: 56.8,
  calendarEventsThisWeek: 8,
  notionPagesCount: 23,
};

export const useDashboardStats = () => {
  // const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with Bolt API
    const timer = setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { stats, loading };
};
