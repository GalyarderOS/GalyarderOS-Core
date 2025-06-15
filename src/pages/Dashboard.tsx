
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import OSStyleLayout from '@/components/dashboard/OSStyleLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
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
import CommandCenter from "@/components/dashboard/CommandCenter";
import IdentityCore from "@/components/dashboard/IdentityCore";
import VisionArchitecture from "@/components/dashboard/VisionArchitecture";
import LifeBalance from "@/components/dashboard/LifeBalance";
import RitualEngine from "@/components/dashboard/RitualEngine";
import KnowledgeHub from "@/components/dashboard/KnowledgeHub";
import Reflection from "@/components/dashboard/Reflection";
import LifeAnalytics from "@/components/dashboard/LifeAnalytics";
import NotionSync from "@/components/dashboard/NotionSync";

const Dashboard = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isNotionAIOpen, setIsNotionAIOpen] = useState(false);

  const handleOpenAIAssistant = () => setIsAIAssistantOpen(true);
  const handleOpenNotionAI = () => setIsNotionAIOpen(true);

  return (
    <OSStyleLayout
      onOpenAIAssistant={handleOpenAIAssistant}
      onOpenNotionAI={handleOpenNotionAI}
    >
      <Routes>
        <Route path="/" element={<DashboardHome onOpenAIAssistant={handleOpenAIAssistant} onOpenNotionAI={handleOpenNotionAI} />} />
        <Route path="/identity" element={<IdentityCore />} />
        <Route path="/vision" element={<VisionArchitecture />} />
        <Route path="/balance" element={<LifeBalance />} />
        <Route path="/ritual" element={<RitualEngine />} />
        <Route path="/habits" element={<HabitsModule />} />
        <Route path="/focus" element={<FocusTimer />} />
        <Route path="/knowledge" element={<KnowledgeHub />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/analytics" element={<LifeAnalytics />} />
        <Route path="/notion" element={<NotionSync />} />
        <Route path="/memory" element={<MemoryVault />} />
        {/* Finance Individual Modules */}
        <Route path="/investments" element={<InvestmentTracker />} />
        <Route path="/cashflow" element={<CashflowTracker />} />
        <Route path="/expenses" element={<ExpenseManager />} />
        <Route path="/wealth" element={<WealthBuilder />} />
        <Route path="/tax" element={<TaxOptimizer />} />
        <Route path="/debt" element={<DebtManager />} />
        {/* Settings */}
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
    </OSStyleLayout>
  );
};

export default Dashboard;
