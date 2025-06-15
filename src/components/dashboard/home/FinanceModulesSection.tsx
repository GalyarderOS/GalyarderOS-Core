
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Receipt, Building, Calculator, CreditCard, Star, ArrowRight } from 'lucide-react';

interface Stats {
  totalPortfolioValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalDebt: number;
  wealthGoals: number;
  investments: number;
}

interface FinanceModulesSectionProps {
  stats: Stats;
}

const FinanceModulesSection = ({ stats }: FinanceModulesSectionProps) => {
    const { language } = useTheme();
    const navigate = useNavigate();

    const t = {
        en: { financeModules: "Wealth Management", description: "Build and manage your wealth with sophisticated financial tools" },
        id: { financeModules: "Manajemen Kekayaan", description: "Bangun dan kelola kekayaan Anda dengan alat keuangan canggih" }
    }[language];

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

    const handleModuleClick = (module: any) => {
        if (module.path) {
            navigate(module.path);
        }
    };
    
    return (
        <div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
            >
                <h2 className="text-4xl font-bold mb-4 font-playfair text-foreground">{t.financeModules}</h2>
                <p className="text-xl text-muted-foreground font-playfair max-w-2xl">{t.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financeModules.map((module, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.7, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                className="group cursor-pointer"
                onClick={() => handleModuleClick(module)}
                >
                    <Card className="border-2 border-border group-hover:border-primary transition-all duration-300 bg-card/80 hover:bg-card soft-shadow group-hover:soft-shadow-lg h-full overflow-hidden">
                        <CardHeader className="pb-6">
                            <div className={`w-full h-32 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500 border border-border`}>
                                <div className="text-foreground">
                                {module.icon}
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-bold font-playfair text-foreground group-hover:text-primary transition-colors">
                                    {module.title}
                                </CardTitle>
                                <Star className="h-5 w-5 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:text-yellow-400 transition-all" />
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
                        
                        <Button className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background soft-shadow font-playfair text-base group-hover:bg-primary transition-colors">
                            Access Module
                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
            </div>
        </div>
    );
};

export default FinanceModulesSection;
