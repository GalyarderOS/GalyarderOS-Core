import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import OSStyleLayout from '@/components/dashboard/OSStyleLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import IdentityCore from "@/components/dashboard/modules/IdentityCore";
import LifeBalance from "@/components/dashboard/modules/LifeBalance";
import VisionArchitecture from "@/components/dashboard/modules/VisionArchitecture";
import FocusTimer from '@/components/dashboard/modules/FocusTimer';
import MemoryVault from '@/components/dashboard/modules/MemoryVault';
import AIAssistant from '@/components/dashboard/modules/AIAssistant';
import NotionAssistantPage from '@/pages/NotionAssistantPage';
import Settings from '@/components/dashboard/modules/Settings';
import InvestmentTracker from '@/components/dashboard/modules/InvestmentTracker';
import CashflowTracker from '@/components/dashboard/modules/CashflowTracker';
import ExpenseManager from '@/components/dashboard/modules/ExpenseManager';
import WealthBuilder from '@/components/dashboard/modules/WealthBuilder';
import TaxOptimizer from '@/components/dashboard/modules/TaxOptimizer';
import DebtManager from '@/components/dashboard/modules/DebtManager';
import CommandCenter from "@/components/dashboard/modules/CommandCenter";
import KnowledgeHub from "@/components/dashboard/modules/KnowledgeHub";
import Reflection from "@/components/dashboard/modules/Reflection";
import LifeAnalytics from "@/components/dashboard/modules/LifeAnalytics";
import CalendarModule from "@/components/dashboard/modules/CalendarModule";
import TopBar from "@/components/dashboard/os/TopBar";
import { useRealTimeData } from "@/hooks/useRealTimeData";

const Dashboard = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAIAssistant = () => setIsAIAssistantOpen(true);
  const handleOpenNotionAI = () => navigate('/dashboard/notion-ai');

  return (
    <OSStyleLayout
      onOpenAIAssistant={handleOpenAIAssistant}
      onOpenNotionAI={handleOpenNotionAI}
    >
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/identity" element={<IdentityCore />} />
        <Route path="/balance" element={<LifeBalance />} />
        <Route path="/vision" element={<VisionArchitecture />} />
        <Route path="/focus" element={<FocusTimer />} />
        <Route path="/calendar" element={<CalendarModule />} />
        <Route path="/knowledge" element={<KnowledgeHub />} />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/analytics" element={<LifeAnalytics />} />
        <Route path="/memory" element={<MemoryVault />} />
        <Route path="/notion-ai" element={<NotionAssistantPage />} />
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
    </OSStyleLayout>
  );
};

export default Dashboard;
