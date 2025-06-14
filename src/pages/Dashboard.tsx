
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import ProfileModule from '@/components/dashboard/ProfileModule';
import VisionModule from '@/components/dashboard/VisionModule';
import HabitsModule from '@/components/dashboard/HabitsModule';
import FocusTimer from '@/components/dashboard/FocusTimer';
import MemoryVault from '@/components/dashboard/MemoryVault';
import AIAssistant from '@/components/dashboard/AIAssistant';
import NotionAI from '@/components/dashboard/NotionAI';
import Settings from '@/components/dashboard/Settings';
import InvestmentTracker from '@/components/dashboard/InvestmentTracker';
import CashflowTracker from '@/components/dashboard/CashflowTracker';
import ExpenseManager from '@/components/dashboard/ExpenseManager';
import WealthBuilder from '@/components/dashboard/WealthBuilder';
import TaxOptimizer from '@/components/dashboard/TaxOptimizer';
import DebtManager from '@/components/dashboard/DebtManager';

const Dashboard = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isNotionAIOpen, setIsNotionAIOpen] = useState(false);

  return (
    <DashboardLayout 
      onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      onOpenNotionAI={() => setIsNotionAIOpen(true)}
    >
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/profile" element={<ProfileModule />} />
        <Route path="/vision" element={<VisionModule />} />
        <Route path="/habits" element={<HabitsModule />} />
        <Route path="/focus" element={<FocusTimer />} />
        <Route path="/memory" element={<MemoryVault />} />
        <Route path="/investments" element={<InvestmentTracker />} />
        <Route path="/cashflow" element={<CashflowTracker />} />
        <Route path="/expenses" element={<ExpenseManager />} />
        <Route path="/wealth" element={<WealthBuilder />} />
        <Route path="/tax" element={<TaxOptimizer />} />
        <Route path="/debt" element={<DebtManager />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
      {/* Modal Components */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
      <NotionAI 
        isOpen={isNotionAIOpen} 
        onClose={() => setIsNotionAIOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;
