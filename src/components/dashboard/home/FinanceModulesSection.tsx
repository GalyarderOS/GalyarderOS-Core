
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Receipt, Building, Calculator, CreditCard, ArrowRight } from 'lucide-react';

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
        en: { 
          financeModules: "Financial Overview", 
          description: "Your wealth building progress and financial health metrics"
        },
        id: { 
          financeModules: "Ikhtisar Finansial", 
          description: "Progres membangun kekayaan dan metrik kesehatan finansial"
        }
    }[language];

    const financeModules = [
        {
          title: language === 'id' ? 'Portofolio Investasi' : 'Investment Portfolio',
          description: language === 'id' ? 'Total nilai investasi aktif' : 'Total active investment value',
          icon: TrendingUp,
          value: `$${stats.totalPortfolioValue.toLocaleString()}`,
          change: "+12.5%",
          changeType: "positive",
          subtitle: `${stats.investments} investments`,
          path: "/dashboard/investments"
        },
        {
          title: language === 'id' ? 'Arus Kas Bulanan' : 'Monthly Cashflow',
          description: language === 'id' ? 'Pendapatan dikurangi pengeluaran' : 'Income minus expenses',
          icon: DollarSign,
          value: `$${(stats.monthlyIncome - stats.monthlyExpenses).toLocaleString()}`,
          change: "+8.2%",
          changeType: "positive",
          subtitle: language === 'id' ? 'Surplus bulan ini' : 'This month surplus',
          path: "/dashboard/cashflow"
        },
        {
          title: language === 'id' ? 'Pengeluaran Bulanan' : 'Monthly Expenses',
          description: language === 'id' ? 'Total pengeluaran bulan ini' : 'Total expenses this month',
          icon: Receipt,
          value: `$${stats.monthlyExpenses.toLocaleString()}`,
          change: "-3.1%",
          changeType: "negative",
          subtitle: language === 'id' ? 'Dari bulan lalu' : 'From last month',
          path: "/dashboard/expenses"
        },
        {
          title: language === 'id' ? 'Target Kekayaan' : 'Wealth Goals',
          description: language === 'id' ? 'Target keuangan yang aktif' : 'Active financial targets',
          icon: Building,
          value: `${stats.wealthGoals}`,
          change: "75% avg",
          changeType: "neutral",
          subtitle: language === 'id' ? 'Target aktif' : 'Active goals',
          path: "/dashboard/wealth"
        },
        {
          title: language === 'id' ? 'Penghematan Pajak' : 'Tax Savings',
          description: language === 'id' ? 'Optimisasi pajak tahun ini' : 'Tax optimization this year',
          icon: Calculator,
          value: "$15,240",
          change: "Saved",
          changeType: "positive",
          subtitle: language === 'id' ? 'Total hemat' : 'Total saved',
          path: "/dashboard/tax"
        },
        {
          title: language === 'id' ? 'Sisa Hutang' : 'Remaining Debt',
          description: language === 'id' ? 'Total hutang yang tersisa' : 'Total outstanding debt',
          icon: CreditCard,
          value: `$${stats.totalDebt.toLocaleString()}`,
          change: "-15.8%",
          changeType: "negative",
          subtitle: language === 'id' ? 'Pengurangan YTD' : 'YTD reduction',
          path: "/dashboard/debt"
        }
    ];

    const handleModuleClick = (path: string) => {
        navigate(path);
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
                <Card 
                  key={index} 
                  className="group border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => handleModuleClick(module.path)}
                >
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold font-playfair text-foreground group-hover:text-primary transition-colors">{module.title}</CardTitle>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                      </div>
                      <CardDescription className="font-playfair text-sm text-muted-foreground">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      <div className="space-y-2">
                        <div className="text-2xl font-bold font-playfair text-foreground">{module.value}</div>
                        <div className="flex items-center justify-between">
                          <div className={`text-sm font-medium font-playfair flex items-center space-x-2`}>
                            <span>{module.change}</span>
                            {module.changeType === "positive" && <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600">↗</Badge>}
                            {module.changeType === "negative" && <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600">↘</Badge>}
                            {module.changeType === "neutral" && <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-600">●</Badge>}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground font-playfair">{module.subtitle}</p>
                      </div>
                    </CardContent>
                </Card>
                )
            })}
            </div>
        </div>
    );
};

export default FinanceModulesSection;
