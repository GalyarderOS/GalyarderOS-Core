
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  CreditCard, 
  Target, 
  BarChart3,
  Crown,
  ArrowRight,
  Sparkles,
  Star,
  Award,
  Users,
  Globe,
  Zap,
  User,
  Calendar,
  Clock,
  BookOpen,
  Brain,
  Calculator,
  Timer,
  Receipt,
  Building,
  FileText
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();
  const { language } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPortfolioValue: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    totalDebt: 0,
    wealthGoals: 0,
    investments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFinancialData();
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

      // Load current month transactions
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

      // Load total debt
      const { data: debts } = await supabase
        .from('debts')
        .select('remaining_amount')
        .eq('user_id', user.id);

      const totalDebt = debts?.reduce((sum, debt) => sum + debt.remaining_amount, 0) || 0;

      // Load wealth goals count
      const { data: wealthGoals } = await supabase
        .from('wealth_goals')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'active');

      // Load investments count
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

  const translations = {
    en: {
      welcomeTitle: "Your Personal Operating System",
      welcomeSubtitle: "Master Your Life with AI-Powered Intelligence",
      welcomeDescription: "Access all your personal development and wealth management tools in one unified dashboard. From habits to investments, vision to focus - everything you need to live by design.",
      personalModules: "Personal Development",
      financeModules: "Wealth Management",
      totalModules: "Active Modules",
      globalUsers: "Global Users",
      aiPowered: "AI-Powered",
    },
    id: {
      welcomeTitle: "Sistem Operasi Personal Anda",
      welcomeSubtitle: "Kuasai Hidup Anda dengan Kecerdasan AI",
      welcomeDescription: "Akses semua alat pengembangan diri dan manajemen kekayaan dalam satu dashboard terpadu. Dari kebiasaan hingga investasi, visi hingga fokus - semua yang Anda butuhkan untuk hidup sesuai desain.",
      personalModules: "Pengembangan Personal",
      financeModules: "Manajemen Kekayaan",
      totalModules: "Modul Aktif",
      globalUsers: "Pengguna Global",
      aiPowered: "Bertenaga AI",
    }
  };

  const t = translations[language];

  // Personal Development Modules (7)
  const personalModules = [
    {
      title: language === 'id' ? 'Profil & Etos' : 'Profile & Ethos',
      description: language === 'id' ? 'Definisikan identitas dan nilai inti' : 'Define your identity and core values',
      icon: <User className="h-8 w-8" />,
      value: "Complete",
      change: "Profile Set",
      path: "/dashboard/profile",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: language === 'id' ? 'Visi & Roadmap' : 'Vision & Roadmap',
      description: language === 'id' ? 'Perencanaan strategis masa depan' : 'Strategic planning for your future',
      icon: <Target className="h-8 w-8" />,
      value: "5 Goals",
      change: "Active",
      path: "/dashboard/vision",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: language === 'id' ? 'Ritual Harian' : 'Daily Rituals',
      description: language === 'id' ? 'Bangun dan lacak kebiasaan bermakna' : 'Build and track meaningful habits',
      icon: <Calendar className="h-8 w-8" />,
      value: "8 Habits",
      change: "75% Complete",
      path: "/dashboard/habits",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: language === 'id' ? 'Timer Fokus' : 'Focus Timer',
      description: language === 'id' ? 'Sesi kerja mendalam dan produktivitas' : 'Deep work and productivity sessions',
      icon: <Timer className="h-8 w-8" />,
      value: "2.5 hrs",
      change: "Today",
      path: "/dashboard/focus",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: language === 'id' ? 'Brankas Memori' : 'Memory Vault',
      description: language === 'id' ? 'Manajemen pengetahuan dan wawasan' : 'Knowledge management and insights',
      icon: <BookOpen className="h-8 w-8" />,
      value: "24 Notes",
      change: "Organized",
      path: "/dashboard/memory",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: 'AI Assistant',
      description: language === 'id' ? 'Asisten personal cerdas' : 'Intelligent personal assistant',
      icon: <Brain className="h-8 w-8" />,
      value: "Active",
      change: "Ready",
      action: "ai-assistant",
      gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      title: 'Notion AI',
      description: language === 'id' ? 'Pencatatan ditingkatkan dengan AI' : 'Enhanced note-taking with AI',
      icon: <FileText className="h-8 w-8" />,
      value: "Synced",
      change: "Connected",
      action: "notion-ai",
      gradient: "from-teal-500/20 to-green-500/20"
    }
  ];

  // Finance Modules (6)
  const financeModules = [
    {
      title: language === 'id' ? 'Pelacak Investasi' : 'Investment Tracker',
      description: language === 'id' ? 'Pantau kinerja portofolio dengan presisi' : 'Monitor portfolio performance with precision',
      icon: <TrendingUp className="h-8 w-8" />,
      value: `$${stats.totalPortfolioValue.toLocaleString()}`,
      change: "+12.5%",
      path: "/dashboard/investments",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: language === 'id' ? 'Pelacak Arus Kas' : 'Cashflow Tracker',
      description: language === 'id' ? 'Lacak pendapatan dan pengeluaran secara cerdas' : 'Track income and expenses intelligently',
      icon: <DollarSign className="h-8 w-8" />,
      value: `$${(stats.monthlyIncome - stats.monthlyExpenses).toLocaleString()}`,
      change: "+8.2%",
      path: "/dashboard/cashflow",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: language === 'id' ? 'Manajer Pengeluaran' : 'Expense Manager',
      description: language === 'id' ? 'Optimalkan pengeluaran dengan wawasan AI' : 'Optimize spending with AI insights',
      icon: <Receipt className="h-8 w-8" />,
      value: `$${stats.monthlyExpenses.toLocaleString()}`,
      change: "-3.1%",
      path: "/dashboard/expenses",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: language === 'id' ? 'Pembangun Kekayaan' : 'Wealth Builder',
      description: language === 'id' ? 'Tetapkan dan capai tujuan keuangan' : 'Set and achieve financial goals',
      icon: <Building className="h-8 w-8" />,
      value: `${stats.wealthGoals} Goals`,
      change: "75% Complete",
      path: "/dashboard/wealth",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: language === 'id' ? 'Optimisasi Pajak' : 'Tax Optimizer',
      description: language === 'id' ? 'Minimalkan beban pajak secara strategis' : 'Minimize tax burden strategically',
      icon: <Calculator className="h-8 w-8" />,
      value: "$15,240",
      change: "Saved",
      path: "/dashboard/tax",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: language === 'id' ? 'Manajer Utang' : 'Debt Manager',
      description: language === 'id' ? 'Hilangkan utang secara efisien' : 'Eliminate debt efficiently',
      icon: <CreditCard className="h-8 w-8" />,
      value: `$${stats.totalDebt.toLocaleString()}`,
      change: "-15.8%",
      path: "/dashboard/debt",
      gradient: "from-red-500/20 to-rose-500/20"
    }
  ];

  const systemStats = [
    { label: t.totalModules, value: "13", icon: <Award className="h-6 w-6" /> },
    { label: t.globalUsers, value: "50K+", icon: <Users className="h-6 w-6" /> },
    { label: t.aiPowered, value: "24/7", icon: <Zap className="h-6 w-6" /> }
  ];

  const handleModuleClick = (module: any) => {
    if (module.path) {
      navigate(module.path);
    } else if (module.action === 'ai-assistant') {
      // This will be handled by parent component
      console.log('Open AI Assistant');
    } else if (module.action === 'notion-ai') {
      // This will be handled by parent component
      console.log('Open Notion AI');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
          <Crown className="h-8 w-8 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-to-br from-card/90 to-card/60 rounded-3xl p-12 border border-border/30 relative soft-shadow">
          <div className="absolute top-0 right-0 w-96 h-96 bg-muted/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-muted/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="space-y-8 flex-1 max-w-3xl">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-muted/30 rounded-2xl soft-shadow border border-border">
                    <Crown className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2 border-muted-foreground/20 font-playfair">
                      Personal Operating System
                    </Badge>
                    <p className="text-muted-foreground font-playfair text-lg">Welcome back</p>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-6xl font-bold mb-6 font-playfair text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                    {t.welcomeTitle}
                  </h1>
                  <h2 className="text-2xl font-semibold mb-4 text-muted-foreground font-playfair">
                    {t.welcomeSubtitle}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-playfair">
                    {t.welcomeDescription}
                  </p>
                </div>

                {/* System Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {systemStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="text-center"
                    >
                      <div className="p-3 bg-muted/20 rounded-xl mx-auto w-fit mb-3 soft-shadow border border-border">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-foreground font-playfair">{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-playfair">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="hidden xl:block">
                <div className="w-40 h-40 bg-gradient-to-br from-muted/30 to-muted/10 rounded-full flex items-center justify-center soft-shadow border-4 border-card">
                  <Sparkles className="h-20 w-20 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Development Modules */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">{t.personalModules}</h2>
          <p className="text-xl text-muted-foreground font-playfair max-w-2xl">
            Master your personal development with these powerful tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {personalModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleModuleClick(module)}
            >
              <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-500 bg-card/80 hover:bg-card soft-shadow hover:soft-shadow-lg h-full">
                <CardHeader className="pb-4">
                  <div className={`w-full h-24 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                    <div className="text-foreground">
                      {module.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold font-playfair text-foreground group-hover:text-muted-foreground transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="font-playfair text-sm text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-foreground font-playfair">{module.value}</div>
                      <div className="text-xs font-medium text-muted-foreground font-playfair">{module.change}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Finance Modules */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">{t.financeModules}</h2>
          <p className="text-xl text-muted-foreground font-playfair max-w-2xl">
            Build and manage your wealth with sophisticated financial tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financeModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleModuleClick(module)}
            >
              <Card className="border-2 border-border hover:border-muted-foreground/30 transition-all duration-500 bg-card/80 hover:bg-card soft-shadow hover:soft-shadow-lg h-full">
                <CardHeader className="pb-6">
                  <div className={`w-full h-32 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                    <div className="text-foreground">
                      {module.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold font-playfair text-foreground group-hover:text-muted-foreground transition-colors">
                        {module.title}
                      </CardTitle>
                      <Star className="h-5 w-5 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <CardDescription className="font-playfair text-base text-muted-foreground leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-foreground font-playfair">{module.value}</div>
                      <div className="text-sm font-medium text-muted-foreground font-playfair">{module.change}</div>
                    </div>
                    <Badge variant="secondary" className="bg-muted/20 border border-border font-playfair">
                      Premium
                    </Badge>
                  </div>
                  
                  <Button className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background soft-shadow font-playfair text-base group-hover:bg-muted-foreground transition-colors">
                    Access Module
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
