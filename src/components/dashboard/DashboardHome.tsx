
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  Zap
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();
  const { language } = useTheme();
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
      welcomeTitle: "Massive Wealth Opportunity",
      welcomeSubtitle: "Transform Your Financial Future with AI-Powered Intelligence",
      welcomeDescription: "Join the elite circle of sophisticated investors who leverage cutting-edge technology to build generational wealth. Our personal finance OS delivers institutional-grade insights to your fingertips.",
      marketStats: "Market Intelligence",
      totalUsers: "Distinguished Members",
      globalReach: "Global Markets",
      aiPowered: "AI-Powered Insights",
      quickActions: "Wealth Acceleration Tools",
      investmentTracker: "Investment Tracker",
      investmentDesc: "Monitor portfolio performance with institutional precision",
      cashflowTracker: "Cashflow Tracker", 
      cashflowDesc: "Track income and expenses with sophisticated analytics",
      expenseManager: "Expense Manager",
      expenseDesc: "Optimize spending patterns using AI-driven insights",
      wealthBuilder: "Wealth Builder",
      wealthDesc: "Set and achieve ambitious financial goals systematically",
      taxOptimizer: "Tax Optimizer",
      taxDesc: "Minimize tax burden through strategic planning",
      debtManager: "Debt Manager",
      debtDesc: "Eliminate debt efficiently with intelligent strategies"
    },
    id: {
      welcomeTitle: "Peluang Kekayaan Besar",
      welcomeSubtitle: "Transformasi Masa Depan Finansial dengan Kecerdasan AI",
      welcomeDescription: "Bergabunglah dengan lingkaran elit investor canggih yang memanfaatkan teknologi mutakhir untuk membangun kekayaan generasional. OS keuangan personal kami memberikan wawasan tingkat institusional di ujung jari Anda.",
      marketStats: "Intelijen Pasar",
      totalUsers: "Anggota Terpilih",
      globalReach: "Pasar Global",
      aiPowered: "Wawasan Bertenaga AI",
      quickActions: "Alat Akselerasi Kekayaan",
      investmentTracker: "Pelacak Investasi",
      investmentDesc: "Pantau kinerja portofolio dengan presisi institusional",
      cashflowTracker: "Pelacak Arus Kas",
      cashflowDesc: "Lacak pendapatan dan pengeluaran dengan analitik canggih",
      expenseManager: "Manajer Pengeluaran",
      expenseDesc: "Optimalkan pola pengeluaran menggunakan wawasan bertenaga AI",
      wealthBuilder: "Pembangun Kekayaan",
      wealthDesc: "Tetapkan dan capai tujuan keuangan ambisius secara sistematis",
      taxOptimizer: "Optimisasi Pajak",
      taxDesc: "Minimalkan beban pajak melalui perencanaan strategis",
      debtManager: "Manajer Utang",
      debtDesc: "Hilangkan utang secara efisien dengan strategi cerdas"
    }
  };

  const t = translations[language];

  const modules = [
    {
      title: t.investmentTracker,
      description: t.investmentDesc,
      icon: <TrendingUp className="h-8 w-8" />,
      value: `$${stats.totalPortfolioValue.toLocaleString()}`,
      change: "+12.5%",
      path: "/dashboard/investments",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      title: t.cashflowTracker,
      description: t.cashflowDesc,
      icon: <DollarSign className="h-8 w-8" />,
      value: `$${(stats.monthlyIncome - stats.monthlyExpenses).toLocaleString()}`,
      change: "+8.2%",
      path: "/dashboard/cashflow",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: t.expenseManager,
      description: t.expenseDesc,
      icon: <BarChart3 className="h-8 w-8" />,
      value: `$${stats.monthlyExpenses.toLocaleString()}`,
      change: "-3.1%",
      path: "/dashboard/expenses",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: t.wealthBuilder,
      description: t.wealthDesc,
      icon: <Target className="h-8 w-8" />,
      value: `${stats.wealthGoals} Goals`,
      change: "75% Complete",
      path: "/dashboard/wealth",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: t.taxOptimizer,
      description: t.taxDesc,
      icon: <PiggyBank className="h-8 w-8" />,
      value: "$15,240",
      change: "Saved",
      path: "/dashboard/tax",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: t.debtManager,
      description: t.debtDesc,
      icon: <CreditCard className="h-8 w-8" />,
      value: `$${stats.totalDebt.toLocaleString()}`,
      change: "-15.8%",
      path: "/dashboard/debt",
      gradient: "from-red-500/20 to-rose-500/20"
    }
  ];

  const marketStats = [
    { label: t.totalUsers, value: "50,000+", icon: <Users className="h-6 w-6" /> },
    { label: t.globalReach, value: "150+", icon: <Globe className="h-6 w-6" /> },
    { label: t.aiPowered, value: "24/7", icon: <Zap className="h-6 w-6" /> }
  ];

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
                      Elite Financial Platform
                    </Badge>
                    <p className="text-muted-foreground font-playfair text-lg">Welcome to excellence</p>
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

                {/* Market Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {marketStats.map((stat, index) => (
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

      {/* Wealth Modules Grid */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">{t.quickActions}</h2>
          <p className="text-xl text-muted-foreground font-playfair max-w-2xl mx-auto">
            Advanced financial modules designed for the sophisticated investor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
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
