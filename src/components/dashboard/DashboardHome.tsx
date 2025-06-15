
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import HeroSection from './home/HeroSection';
import FinanceModulesSection from './home/FinanceModulesSection';
import PersonalStatsSection from './home/PersonalStatsSection';

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
    investments: 0
  });
  const [loading, setLoading] = useState(true);
  const { data: realTimeData, isConnected, notifications } = useRealTimeData();

  useEffect(() => {
    if (user) {
      loadFinancialData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFinancialData = async () => {
    if (!user) return;

    try {
      // Load portfolio value
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

      setStats({
        totalPortfolioValue,
        monthlyIncome,
        monthlyExpenses,
        totalDebt,
        wealthGoals: wealthGoals?.length || 0,
        investments: investments?.length || 0
      });

    } catch (error) {
      console.error('Error loading financial data:', error);
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
      <PersonalStatsSection 
        onOpenAIAssistant={onOpenAIAssistant}
        onOpenNotionAI={onOpenNotionAI}
      />
      <FinanceModulesSection stats={stats} />
      
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
