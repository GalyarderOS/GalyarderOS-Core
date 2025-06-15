
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
  X
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      id: 'profile', 
      label: language === 'id' ? 'Profil' : 'Profile', 
      icon: User, 
      path: '/dashboard/profile',
      category: 'personal',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'vision', 
      label: language === 'id' ? 'Visi' : 'Vision', 
      icon: Target, 
      path: '/dashboard/vision',
      category: 'personal',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'habits', 
      label: language === 'id' ? 'Kebiasaan' : 'Habits', 
      icon: Calendar, 
      path: '/dashboard/habits',
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
      id: 'memory', 
      label: language === 'id' ? 'Vault Memori' : 'Memory Vault', 
      icon: Brain, 
      path: '/dashboard/memory',
      category: 'personal',
      color: 'from-violet-500 to-purple-600'
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
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

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
              {children}
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
    </div>
  );
};

export default OSStyleLayout;
