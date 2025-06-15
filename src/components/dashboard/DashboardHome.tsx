
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from './home/HeroSection';
import EnhancedPersonalModulesSection from './home/EnhancedPersonalModulesSection';
import FinanceModulesSection from './home/FinanceModulesSection';
import DashboardLoader from './home/DashboardLoader';
import CommandPalette from './home/CommandPalette';
import { useCommandPalette } from '@/hooks/useCommandPalette';

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

  const {
    isOpen: isCommandPaletteOpen,
    search: commandSearch,
    setSearch: setCommandSearch,
    commands,
    executeCommand
  } = useCommandPalette(onOpenAIAssistant, onOpenNotionAI);

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
    return <DashboardLoader />;
  }

  return (
    <>
      <div className="space-y-12 max-w-7xl mx-auto relative">
        <HeroSection />
        <EnhancedPersonalModulesSection 
          onOpenAIAssistant={onOpenAIAssistant} 
          onOpenNotionAI={onOpenNotionAI} 
        />
        <FinanceModulesSection stats={stats} />
      </div>
      
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        search={commandSearch}
        setSearch={setCommandSearch}
        commands={commands}
        executeCommand={executeCommand}
      />
    </>
  );
};

export default DashboardHome;
