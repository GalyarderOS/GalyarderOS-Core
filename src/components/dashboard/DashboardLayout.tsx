
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  Menu, 
  X, 
  BarChart3, 
  User, 
  Target, 
  Calendar, 
  Clock, 
  BookOpen, 
  Settings,
  Sun,
  Moon,
  TrendingUp,
  DollarSign,
  PiggyBank,
  CreditCard,
  Calculator,
  Briefcase,
  Brain,
  Sparkles
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, language, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      dashboardDesc: 'Life overview & insights',
      profile: 'Profile & Ethos',
      profileDesc: 'Personal identity',
      vision: 'Vision & Roadmap',
      visionDesc: 'Strategic goals',
      habits: 'Daily Rituals',
      habitsDesc: 'Habit mastery',
      focus: 'Focus Timer',
      focusDesc: 'Deep work',
      memory: 'Memory Vault',
      memoryDesc: 'Knowledge base',
      aiAssistant: 'AI Assistant',
      aiAssistantDesc: 'Intelligent support',
      notionAi: 'Notion AI',
      notionAiDesc: 'Enhanced notes',
      investments: 'Investment Tracker',
      investmentsDesc: 'Portfolio management',
      cashflow: 'Cashflow Tracker',
      cashflowDesc: 'Income & expense tracking',
      expenses: 'Expense Manager',
      expensesDesc: 'Spending optimization',
      wealth: 'Wealth Builder',
      wealthDesc: 'Financial goal setting',
      tax: 'Tax Optimizer',
      taxDesc: 'Tax strategy planning',
      debt: 'Debt Manager',
      debtDesc: 'Debt elimination',
      settings: 'Settings',
      settingsDesc: 'Preferences',
      signOut: 'Sign Out',
      systemOnline: 'System Online',
      welcomeBack: 'Welcome back',
      personalModules: 'Personal Development',
      financeModules: 'Wealth Management'
    },
    id: {
      dashboard: 'Dasbor',
      dashboardDesc: 'Ringkasan hidup & wawasan',
      profile: 'Profil & Etos',
      profileDesc: 'Identitas personal',
      vision: 'Visi & Roadmap',
      visionDesc: 'Tujuan strategis',
      habits: 'Ritual Harian',
      habitsDesc: 'Penguasaan kebiasaan',
      focus: 'Timer Fokus',
      focusDesc: 'Kerja mendalam',
      memory: 'Brankas Memori',
      memoryDesc: 'Basis pengetahuan',
      aiAssistant: 'Asisten AI',
      aiAssistantDesc: 'Dukungan cerdas',
      notionAi: 'Notion AI',
      notionAiDesc: 'Catatan ditingkatkan',
      investments: 'Pelacak Investasi',
      investmentsDesc: 'Manajemen portofolio',
      cashflow: 'Pelacak Arus Kas',
      cashflowDesc: 'Pelacakan pendapatan & pengeluaran',
      expenses: 'Manajer Pengeluaran',
      expensesDesc: 'Optimisasi pengeluaran',
      wealth: 'Pembangun Kekayaan',
      wealthDesc: 'Penetapan tujuan keuangan',
      tax: 'Optimisasi Pajak',
      taxDesc: 'Perencanaan strategi pajak',
      debt: 'Manajer Utang',
      debtDesc: 'Eliminasi utang',
      settings: 'Pengaturan',
      settingsDesc: 'Preferensi',
      signOut: 'Keluar',
      systemOnline: 'Sistem Online',
      welcomeBack: 'Selamat datang kembali',
      personalModules: 'Pengembangan Personal',
      financeModules: 'Manajemen Kekayaan'
    }
  };

  const t = translations[language];

  const personalMenuItems = [
    { icon: <BarChart3 className="h-5 w-5" />, label: t.dashboard, path: '/dashboard', description: t.dashboardDesc },
    { icon: <User className="h-5 w-5" />, label: t.profile, path: '/dashboard/profile', description: t.profileDesc },
    { icon: <Target className="h-5 w-5" />, label: t.vision, path: '/dashboard/vision', description: t.visionDesc },
    { icon: <Calendar className="h-5 w-5" />, label: t.habits, path: '/dashboard/habits', description: t.habitsDesc },
    { icon: <Clock className="h-5 w-5" />, label: t.focus, path: '/dashboard/focus', description: t.focusDesc },
    { icon: <BookOpen className="h-5 w-5" />, label: t.memory, path: '/dashboard/memory', description: t.memoryDesc },
    { icon: <Brain className="h-5 w-5" />, label: t.aiAssistant, path: '/dashboard/ai-assistant', description: t.aiAssistantDesc },
    { icon: <Sparkles className="h-5 w-5" />, label: t.notionAi, path: '/dashboard/notion-ai', description: t.notionAiDesc },
  ];

  const financeMenuItems = [
    { icon: <TrendingUp className="h-5 w-5" />, label: t.investments, path: '/dashboard/investments', description: t.investmentsDesc },
    { icon: <DollarSign className="h-5 w-5" />, label: t.cashflow, path: '/dashboard/cashflow', description: t.cashflowDesc },
    { icon: <BarChart3 className="h-5 w-5" />, label: t.expenses, path: '/dashboard/expenses', description: t.expensesDesc },
    { icon: <Target className="h-5 w-5" />, label: t.wealth, path: '/dashboard/wealth', description: t.wealthDesc },
    { icon: <Calculator className="h-5 w-5" />, label: t.tax, path: '/dashboard/tax', description: t.taxDesc },
    { icon: <CreditCard className="h-5 w-5" />, label: t.debt, path: '/dashboard/debt', description: t.debtDesc },
  ];

  const settingsItem = { icon: <Settings className="h-5 w-5" />, label: t.settings, path: '/dashboard/settings', description: t.settingsDesc };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getCurrentPageTitle = () => {
    const allItems = [...personalMenuItems, ...financeMenuItems, settingsItem];
    const currentItem = allItems.find(item => item.path === location.pathname);
    return currentItem?.label || t.dashboard;
  };

  const getCurrentPageDescription = () => {
    const allItems = [...personalMenuItems, ...financeMenuItems, settingsItem];
    const currentItem = allItems.find(item => item.path === location.pathname);
    return currentItem?.description || t.welcomeBack;
  };

  return (
    <div className="min-h-screen bg-background flex font-playfair">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 80 }}
        className="bg-card/80 backdrop-blur-xl border-r border-border flex flex-col soft-shadow relative z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center soft-shadow">
              <img 
                src="/lovable-uploads/e58a97fc-d08f-4514-be06-48ce8aaa4d1a.png" 
                alt="GalyarderOS Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col"
              >
                <span className="text-xl font-bold text-foreground font-playfair">
                  GalyarderOS
                </span>
                <span className="text-xs text-muted-foreground font-medium font-playfair">Personal Operating System</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Personal Development Section */}
          {sidebarOpen && (
            <div className="px-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-playfair mb-3">
                {t.personalModules}
              </h3>
            </div>
          )}
          
          <div className="space-y-2">
            {personalMenuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start h-14 relative group overflow-hidden font-playfair ${
                    location.pathname === item.path 
                      ? 'bg-muted hover:bg-muted/80 text-foreground soft-shadow' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center w-full">
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-background/50' 
                        : 'bg-muted group-hover:bg-muted/80'
                    }`}>
                      {item.icon}
                    </div>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-start flex-1"
                      >
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className={`text-xs ${
                          location.pathname === item.path 
                            ? 'text-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Finance Management Section */}
          {sidebarOpen && (
            <div className="px-2 pt-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-playfair mb-3">
                {t.financeModules}
              </h3>
            </div>
          )}
          
          <div className="space-y-2">
            {financeMenuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start h-14 relative group overflow-hidden font-playfair ${
                    location.pathname === item.path 
                      ? 'bg-muted hover:bg-muted/80 text-foreground soft-shadow' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center w-full">
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-background/50' 
                        : 'bg-muted group-hover:bg-muted/80'
                    }`}>
                      {item.icon}
                    </div>
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-start flex-1"
                      >
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className={`text-xs ${
                          location.pathname === item.path 
                            ? 'text-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Settings */}
          <div className="pt-4 border-t border-border">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={location.pathname === settingsItem.path ? "default" : "ghost"}
                className={`w-full justify-start h-14 relative group overflow-hidden font-playfair ${
                  location.pathname === settingsItem.path 
                    ? 'bg-muted hover:bg-muted/80 text-foreground soft-shadow' 
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => navigate(settingsItem.path)}
              >
                <div className="flex items-center w-full">
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    location.pathname === settingsItem.path 
                      ? 'bg-background/50' 
                      : 'bg-muted group-hover:bg-muted/80'
                  }`}>
                    {settingsItem.icon}
                  </div>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-start flex-1"
                    >
                      <span className="font-semibold text-sm">{settingsItem.label}</span>
                      <span className={`text-xs ${
                        location.pathname === settingsItem.path 
                          ? 'text-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {settingsItem.description}
                      </span>
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border bg-muted/20">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 p-3 bg-card rounded-xl border border-border soft-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground font-bold text-sm">
                  {(user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate font-playfair">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate font-playfair">{user?.email}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            className="w-full justify-start h-12 mb-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 font-playfair"
            onClick={toggleTheme}
          >
            <div className="p-2 bg-muted rounded-lg mr-3">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </div>
            {sidebarOpen && <span className="font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start h-12 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 font-playfair"
            onClick={handleSignOut}
          >
            <div className="p-2 bg-destructive/10 rounded-lg mr-3">
              <LogOut className="h-4 w-4" />
            </div>
            {sidebarOpen && <span className="font-medium">{t.signOut}</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-card/60 backdrop-blur-xl border-b border-border p-6 flex items-center justify-between soft-shadow">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-xl transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block"
            >
              <h1 className="text-lg font-semibold text-foreground font-playfair">
                {getCurrentPageTitle()}
              </h1>
              <p className="text-sm text-muted-foreground font-playfair">
                {getCurrentPageDescription()}
              </p>
            </motion.div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-muted/30 px-3 py-1 rounded-full border border-border">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-muted-foreground font-playfair">{t.systemOnline}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
