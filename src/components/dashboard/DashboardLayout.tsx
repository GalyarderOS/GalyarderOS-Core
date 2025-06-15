
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Crown
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onOpenAIAssistant?: () => void;
  onOpenNotionAI?: () => void;
}

const DashboardLayout = ({ children, onOpenAIAssistant, onOpenNotionAI }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, language } = useTheme();

  const personalDevModules = [
    { id: 'dashboard', label: language === 'id' ? 'Beranda' : 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'profile', label: language === 'id' ? 'Profil' : 'Profile', icon: User, path: '/dashboard/profile' },
    { id: 'vision', label: language === 'id' ? 'Visi' : 'Vision', icon: Target, path: '/dashboard/vision' },
    { id: 'habits', label: language === 'id' ? 'Kebiasaan' : 'Habits', icon: Calendar, path: '/dashboard/habits' },
    { id: 'focus', label: language === 'id' ? 'Timer Fokus' : 'Focus Timer', icon: Timer, path: '/dashboard/focus' },
    { id: 'memory', label: language === 'id' ? 'Vault Memori' : 'Memory Vault', icon: Brain, path: '/dashboard/memory' },
  ];

  const aiModules = [
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, action: onOpenAIAssistant },
    { id: 'notion-ai', label: 'Notion AI', icon: FileText, action: onOpenNotionAI },
  ];

  const financeModules = [
    { id: 'investments', label: language === 'id' ? 'Investasi' : 'Investments', icon: TrendingUp, path: '/dashboard/investments' },
    { id: 'cashflow', label: language === 'id' ? 'Arus Kas' : 'Cashflow', icon: DollarSign, path: '/dashboard/cashflow' },
    { id: 'expenses', label: language === 'id' ? 'Pengeluaran' : 'Expenses', icon: Receipt, path: '/dashboard/expenses' },
    { id: 'wealth', label: language === 'id' ? 'Kekayaan' : 'Wealth', icon: Building, path: '/dashboard/wealth' },
    { id: 'tax', label: language === 'id' ? 'Pajak' : 'Tax', icon: Calculator, path: '/dashboard/tax' },
    { id: 'debt', label: language === 'id' ? 'Hutang' : 'Debt', icon: CreditCard, path: '/dashboard/debt' },
  ];

  const handleNavigation = (path?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (path) {
      navigate(path);
    }
    setIsSidebarOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/dashboard/');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border bg-card/50 backdrop-blur-sm">
          <SidebarContent className="p-6 space-y-6">
            {/* Header with Logo */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-foreground to-muted-foreground rounded-xl flex items-center justify-center border-2 border-border">
                  <Crown className="h-7 w-7 text-background" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground font-playfair">GalyarderOS</h2>
                  <p className="text-sm text-muted-foreground font-playfair">Personal Operating System</p>
                </div>
              </div>
              
              {user && (
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground font-playfair truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Personal Development Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="font-playfair text-xs">
                  {language === 'id' ? 'PENGEMBANGAN DIRI' : 'PERSONAL DEVELOPMENT'}
                </Badge>
              </div>
              <nav className="space-y-1">
                {personalDevModules.map((module) => {
                  const Icon = module.icon;
                  const isActive = isActivePath(module.path);
                  
                  return (
                    <Button
                      key={module.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start font-playfair ${
                        isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => handleNavigation(module.path)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {module.label}
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* AI Tools Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="font-playfair text-xs">
                  AI TOOLS
                </Badge>
              </div>
              <nav className="space-y-1">
                {aiModules.map((module) => {
                  const Icon = module.icon;
                  
                  return (
                    <Button
                      key={module.id}
                      variant="ghost"
                      className="w-full justify-start font-playfair text-muted-foreground hover:text-foreground"
                      onClick={() => handleNavigation(undefined, module.action)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {module.label}
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* Finance Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="font-playfair text-xs">
                  {language === 'id' ? 'KEUANGAN' : 'FINANCE'}
                </Badge>
              </div>
              <nav className="space-y-1">
                {financeModules.map((module) => {
                  const Icon = module.icon;
                  const isActive = isActivePath(module.path);
                  
                  return (
                    <Button
                      key={module.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start font-playfair ${
                        isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => handleNavigation(module.path)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {module.label}
                    </Button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="flex-1" />
            <div className="space-y-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start font-playfair text-muted-foreground hover:text-foreground"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                {theme === 'dark' ? (language === 'id' ? 'Mode Terang' : 'Light Mode') : (language === 'id' ? 'Mode Gelap' : 'Dark Mode')}
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start font-playfair text-muted-foreground hover:text-foreground"
                onClick={() => handleNavigation('/dashboard/settings')}
              >
                <Settings className="h-4 w-4 mr-3" />
                {language === 'id' ? 'Pengaturan' : 'Settings'}
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start font-playfair text-muted-foreground hover:text-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                {language === 'id' ? 'Keluar' : 'Sign Out'}
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-foreground" />
                <span className="font-bold text-lg font-playfair text-foreground">GalyarderOS</span>
              </div>
              <div className="flex-1" />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
