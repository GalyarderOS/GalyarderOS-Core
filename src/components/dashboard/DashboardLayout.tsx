
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Target, 
  Brain, 
  Calendar, 
  Timer, 
  BookOpen, 
  Edit, 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Receipt, 
  Building, 
  Calculator, 
  CreditCard, 
  FileText, 
  Sparkles,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import DashboardHome from '@/components/dashboard/DashboardHome';
import VisionModule from '@/components/dashboard/VisionModule';
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
import CalendarModule from "@/components/dashboard/CalendarModule";
import TopBar from "@/components/dashboard/os/TopBar";
import DesktopGrid from "@/components/dashboard/os/DesktopGrid";
import Dock from "@/components/dashboard/os/Dock";
import WindowManager from "@/components/dashboard/os/WindowManager";

const Dashboard = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isNotionAIOpen, setIsNotionAIOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, language } = useTheme();

  const handleOpenAIAssistant = () => setIsAIAssistantOpen(true);
  const handleOpenNotionAI = () => setIsNotionAIOpen(true);

  // Main modules (order similar with PersonalSystemsGrid, add Notion & AI Assistant)
  const modules = [
    {
      id: 'dashboard',
      label: language === 'id' ? 'Command Center' : 'Command Center',
      icon: LayoutDashboard,
      path: '/dashboard',
      category: 'personal',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'identity',
      label: language === 'id' ? 'Identity Core' : 'Identity Core',
      icon: User,
      path: '/dashboard/identity',
      category: 'personal',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'vision',
      label: language === 'id' ? 'Vision Architecture' : 'Vision Architecture',
      icon: Target,
      path: '/dashboard/vision',
      category: 'personal',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'balance',
      label: language === 'id' ? 'Life Balance' : 'Life Balance',
      icon: Brain,
      path: '/dashboard/balance',
      category: 'personal',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'ritual',
      label: language === 'id' ? 'Ritual Engine' : 'Ritual Engine',
      icon: Calendar,
      path: '/dashboard/ritual',
      category: 'personal',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'calendar',
      label: language === 'id' ? 'Calendar' : 'Calendar',
      icon: Calendar,
      path: '/dashboard/calendar',
      category: 'personal',
      color: 'from-orange-500 to-pink-500'
    },
    {
      id: 'focus',
      label: language === 'id' ? 'Focus Engine' : 'Focus Engine',
      icon: Timer,
      path: '/dashboard/focus',
      category: 'personal',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'knowledge',
      label: language === 'id' ? 'Knowledge Hub' : 'Knowledge Hub',
      icon: BookOpen,
      path: '/dashboard/knowledge',
      category: 'personal',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'reflection',
      label: language === 'id' ? 'Reflection' : 'Reflection',
      icon: Edit,
      path: '/dashboard/reflection',
      category: 'personal',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'analytics',
      label: language === 'id' ? 'Life Analytics' : 'Life Analytics',
      icon: BarChart2,
      path: '/dashboard/analytics',
      category: 'analytics',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Sparkles,
      action: handleOpenAIAssistant,
      category: 'ai',
      color: 'from-purple-500 to-blue-600'
    },
    {
      id: 'investments',
      label: language === 'id' ? 'Investments' : 'Investments',
      icon: TrendingUp,
      path: '/dashboard/investments',
      category: 'finance',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'wealth',
      label: language === 'id' ? 'Wealth' : 'Wealth',
      icon: Building,
      path: '/dashboard/wealth',
      category: 'finance',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'settings',
      label: language === 'id' ? 'Settings' : 'Settings',
      icon: Calculator,
      path: '/dashboard/settings',
      category: 'system',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  const handleModuleClick = (module: any) => {
    if (module.path) {
      navigate(module.path);
    } else if (module.action) {
      module.action();
    }
  };

  const openWindow = (moduleId: string) => {
    if (!openWindows.includes(moduleId)) {
      setOpenWindows(prev => [...prev, moduleId]);
    }
    setActiveWindow(moduleId);
  };

  const closeWindow = (moduleId: string) => {
    setOpenWindows(prev => prev.filter(id => id !== moduleId));
    if (activeWindow === moduleId) {
      setActiveWindow(openWindows.find(id => id !== moduleId) || null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Top Bar */}
      <TopBar 
        user={user}
        theme={theme}
        setTheme={setTheme}
        language={language}
        onSearch={() => setIsSearchOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="pt-16 pb-20 px-6 min-h-screen">
        <AnimatePresence mode="wait">
          {currentPath === '/dashboard' || currentPath === '/dashboard/' ? (
            <DesktopGrid 
              modules={modules}
              onModuleClick={handleModuleClick}
              onModuleOpen={openWindow}
            />
          ) : (
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <Routes>
                <Route path="/" element={<DashboardHome onOpenAIAssistant={handleOpenAIAssistant} onOpenNotionAI={handleOpenNotionAI} />} />
                <Route path="/identity" element={<IdentityCore />} />
                <Route path="/vision" element={<VisionArchitecture />} />
                <Route path="/balance" element={<LifeBalance />} />
                <Route path="/ritual" element={<RitualEngine />} />
                <Route path="/habits" element={<Navigate to="/dashboard/ritual" replace />} />
                <Route path="/focus" element={<FocusTimer />} />
                <Route path="/calendar" element={<CalendarModule />} />
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/reflection" element={<Reflection />} />
                <Route path="/analytics" element={<LifeAnalytics />} />
                <Route path="/memory" element={<MemoryVault />} />
                <Route path="/investments" element={<InvestmentTracker />} />
                <Route path="/cashflow" element={<CashflowTracker />} />
                <Route path="/expenses" element={<ExpenseManager />} />
                <Route path="/wealth" element={<WealthBuilder />} />
                <Route path="/tax" element={<TaxOptimizer />} />
                <Route path="/debt" element={<DebtManager />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock 
        modules={modules}
        currentPath={currentPath}
        onModuleClick={handleModuleClick}
      />

      {/* Window Manager for floating windows */}
      <WindowManager 
        openWindows={openWindows}
        activeWindow={activeWindow}
        modules={modules}
        onClose={closeWindow}
        onActivate={setActiveWindow}
      />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 mx-4"
            >
              <div className="bg-card border border-border rounded-2xl soft-shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search modules..."
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Components */}
      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
      <NotionAI
        isOpen={isNotionAIOpen}
        onClose={() => setIsNotionAIOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
