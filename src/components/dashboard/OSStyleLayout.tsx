import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  LayoutDashboard,
  User,
  Target,
  Calendar,
  Timer,
  Brain,
  Sparkles,
  FileText,
  TrendingUp,
  DollarSign,
  Receipt,
  Building,
  Calculator,
  CreditCard,
  Settings,
  LogOut,
  Moon,
  Sun,
  Search,
  Maximize2,
  Minimize2,
  X,
  Compass,
  Activity,
  CheckCircle,
  Zap,
  BookOpen,
  BookMarked
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopBar from './os/TopBar';
import Dock from './os/Dock';
import DesktopGrid from './os/DesktopGrid';
import WindowManager from './os/WindowManager';

interface OSStyleLayoutProps {
  children: React.ReactNode;
  onOpenAIAssistant?: () => void;
  onOpenNotionAI?: () => void;
}

const OSStyleLayout = ({ children, onOpenAIAssistant, onOpenNotionAI }: OSStyleLayoutProps) => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, language } = useTheme();

  const modules = [
    { 
      id: 'dashboard', 
      label: language === 'id' ? 'Beranda' : 'Home', 
      icon: LayoutDashboard, 
      path: '/dashboard',
      category: 'personal',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'identity', 
      label: language === 'id' ? 'Identitas' : 'Identity Core', 
      icon: User, 
      path: '/dashboard/identity',
      category: 'personal',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'vision', 
      label: language === 'id' ? 'Visi' : 'Vision Architecture', 
      icon: Target, 
      path: '/dashboard/vision',
      category: 'personal',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'balance', 
      label: language === 'id' ? 'Keseimbangan' : 'Life Balance', 
      icon: Activity, 
      path: '/dashboard/balance',
      category: 'personal',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'ritual', 
      label: language === 'id' ? 'Ritual' : 'Ritual Engine', 
      icon: CheckCircle, 
      path: '/dashboard/ritual',
      category: 'personal',
      color: 'from-teal-500 to-cyan-600'
    },
    { 
      id: 'calendar', 
      label: language === 'id' ? 'Kalender' : 'Calendar', 
      icon: Calendar, 
      path: '/dashboard/calendar',
      category: 'personal',
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'focus', 
      label: language === 'id' ? 'Timer Fokus' : 'Focus Timer', 
      icon: Timer, 
      path: '/dashboard/focus',
      category: 'personal',
      color: 'from-cyan-500 to-blue-600'
    },
    { 
      id: 'knowledge', 
      label: language === 'id' ? 'Pengetahuan' : 'Knowledge Hub', 
      icon: BookOpen, 
      path: '/dashboard/knowledge',
      category: 'personal',
      color: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'reflection', 
      label: language === 'id' ? 'Refleksi' : 'Reflection', 
      icon: BookMarked, 
      path: '/dashboard/reflection',
      category: 'personal',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      id: 'analytics', 
      label: language === 'id' ? 'Analitik' : 'Life Analytics', 
      icon: TrendingUp, 
      path: '/dashboard/analytics',
      category: 'personal',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'notion', 
      label: 'Notion Sync', 
      icon: FileText, 
      path: '/dashboard/notion',
      category: 'ai',
      color: 'from-teal-500 to-green-600'
    },
    { 
      id: 'ai-assistant', 
      label: 'AI Assistant', 
      icon: Sparkles, 
      action: onOpenAIAssistant,
      category: 'ai',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'notion-ai', 
      label: 'Notion AI', 
      icon: FileText, 
      action: onOpenNotionAI,
      category: 'ai',
      color: 'from-teal-500 to-green-600'
    },
    { 
      id: 'investments', 
      label: language === 'id' ? 'Investasi' : 'Investments', 
      icon: TrendingUp, 
      path: '/dashboard/investments',
      category: 'finance',
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      id: 'cashflow', 
      label: language === 'id' ? 'Arus Kas' : 'Cashflow', 
      icon: DollarSign, 
      path: '/dashboard/cashflow',
      category: 'finance',
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'expenses', 
      label: language === 'id' ? 'Pengeluaran' : 'Expenses', 
      icon: Receipt, 
      path: '/dashboard/expenses',
      category: 'finance',
      color: 'from-red-500 to-pink-600'
    },
    { 
      id: 'wealth', 
      label: language === 'id' ? 'Kekayaan' : 'Wealth', 
      icon: Building, 
      path: '/dashboard/wealth',
      category: 'finance',
      color: 'from-indigo-500 to-purple-600'
    },
    { 
      id: 'tax', 
      label: language === 'id' ? 'Pajak' : 'Tax', 
      icon: Calculator, 
      path: '/dashboard/tax',
      category: 'finance',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'debt', 
      label: language === 'id' ? 'Hutang' : 'Debt', 
      icon: CreditCard, 
      path: '/dashboard/debt',
      category: 'finance',
      color: 'from-orange-500 to-yellow-600'
    },
    { 
      id: 'settings', 
      label: language === 'id' ? 'Pengaturan' : 'Settings', 
      icon: Settings, 
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

  // Get current module from route
  const currentPath = location.pathname;
  const currentModule = modules.find(m => m.path === currentPath);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Top Bar */}
      <TopBar 
        user={user}
        theme={theme}
        setTheme={setTheme}
        language={language}
        onSearch={() => {}} // Empty function since search is now handled internally
        onSignOut={handleSignOut}
        onOpenAIAssistant={onOpenAIAssistant}
        onOpenNotionAI={onOpenNotionAI}
      />

      {/* Main Content Area */}
      <div className="pt-16 pb-20 px-6 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
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
    </div>
  );
};

export default OSStyleLayout;
