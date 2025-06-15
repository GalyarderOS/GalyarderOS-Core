
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
        en: { financeModules: "Financial Core", description: "Build and manage your wealth with these modules" },
        id: { financeModules: "Inti Finansial", description: "Bangun dan kelola kekayaan Anda lewat modul-modul ini" }
    }[language];

    const financeModules = [
        {
          title: language === 'id' ? 'Pelacak Investasi' : 'Investment Tracker',
          description: language === 'id' ? 'Pantau kinerja portofolio dengan presisi' : 'Monitor portfolio performance with precision',
          icon: TrendingUp,
          value: `$${stats.totalPortfolioValue.toLocaleString()}`,
          change: "+12.5%",
          path: "/dashboard/investments",
        },
        {
          title: language === 'id' ? 'Pelacak Arus Kas' : 'Cashflow Tracker',
          description: language === 'id' ? 'Lacak pendapatan dan pengeluaran secara cerdas' : 'Track income and expenses intelligently',
          icon: DollarSign,
          value: `$${(stats.monthlyIncome - stats.monthlyExpenses).toLocaleString()}`,
          change: "+8.2%",
          path: "/dashboard/cashflow",
        },
        {
          title: language === 'id' ? 'Manajer Pengeluaran' : 'Expense Manager',
          description: language === 'id' ? 'Optimalkan pengeluaran dengan wawasan AI' : 'Optimize spending with AI insights',
          icon: Receipt,
          value: `$${stats.monthlyExpenses.toLocaleString()}`,
          change: "-3.1%",
          path: "/dashboard/expenses",
        },
        {
          title: language === 'id' ? 'Pembangun Kekayaan' : 'Wealth Builder',
          description: language === 'id' ? 'Tetapkan dan capai tujuan keuangan' : 'Set and achieve financial goals',
          icon: Building,
          value: `${stats.wealthGoals} Goals`,
          change: "75% Complete",
          path: "/dashboard/wealth",
        },
        {
          title: language === 'id' ? 'Optimisasi Pajak' : 'Tax Optimizer',
          description: language === 'id' ? 'Minimalkan beban pajak secara strategis' : 'Minimize tax burden strategically',
          icon: Calculator,
          value: "$15,240",
          change: "Saved",
          path: "/dashboard/tax",
        },
        {
          title: language === 'id' ? 'Manajer Utang' : 'Debt Manager',
          description: language === 'id' ? 'Hilangkan utang secara efisien' : 'Eliminate debt efficiently',
          icon: CreditCard,
          value: `$${stats.totalDebt.toLocaleString()}`,
          change: "-15.8%",
          path: "/dashboard/debt",
        }
    ];

    const handleModuleClick = (module: any) => {
        if (module.path) {
            navigate(module.path);
        }
    };
    
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold font-playfair text-foreground">{t.financeModules}</h2>
                <p className="text-lg text-muted-foreground font-playfair max-w-2xl">{t.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeModules.map((module, index) => {
                const Icon = module.icon;
                return (
                <div
                  key={index}
                  className="cursor-pointer select-none group"
                  onClick={() => handleModuleClick(module)}
                >
                    <Card className="border bg-card hover:border-primary transition duration-150 h-full overflow-hidden flex flex-col justify-between group">
                        <CardHeader className="pb-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <CardTitle className="text-lg font-bold font-playfair text-foreground truncate">{module.title}</CardTitle>
                          <CardDescription className="font-playfair text-sm text-muted-foreground truncate">{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                          <div>
                            <div className="text-xl font-bold font-playfair text-foreground">{module.value}</div>
                            <div className={`text-xs font-medium font-playfair flex items-center space-x-1`}>
                              <span>{module.change}</span>
                              {module.change && module.change.startsWith("+") && <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">↗</Badge>}
                              {module.change && module.change.startsWith("-") && <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600">↘</Badge>}
                            </div>
                          </div>
                          <Button className="w-full h-10 bg-foreground hover:bg-primary text-background soft-shadow font-playfair text-base group-hover:bg-primary/90 transition-colors">
                            Access <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                    </Card>
                </div>
                )
            })}
            </div>
        </div>
    );
};

export default FinanceModulesSection;

