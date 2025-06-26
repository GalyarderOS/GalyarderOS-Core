import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Progress } from '@/components/global/ui/progress';
import { Badge } from '@/components/global/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/global/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, DollarSign, Target, PiggyBank, CreditCard, Building } from 'lucide-react';
import { useTheme } from '@/contexts/useTheme';

interface FinancialHealthSectionProps {
  stats: {
    totalPortfolioValue: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    totalDebt: number;
    savingsRate: number;
    wealthGoals: number;
    investments: number;
  };
}

const FinancialHealthSection = ({ stats }: FinancialHealthSectionProps) => {
  const { language } = useTheme();

  const t = {
    en: {
      financialHealth: "Financial Health",
      description: "Comprehensive overview of your wealth building progress",
      netWorth: "Net Worth",
      savingsRate: "Savings Rate",
      investments: "Active Investments",
      debtRatio: "Debt-to-Income",
      wealthScore: "Wealth Score",
      income: "Income",
      expenses: "Expenses",
      savings: "Savings",
      debt: "Debt",
      excellent: "Excellent",
      good: "Good",
      needsWork: "Needs Work",
      portfolio: "Portfolio",
      goals: "Goals"
    },
    id: {
      financialHealth: "Kesehatan Finansial",
      description: "Gambaran komprehensif kemajuan membangun kekayaan",
      netWorth: "Kekayaan Bersih",
      savingsRate: "Tingkat Tabungan",
      investments: "Investasi Aktif",
      debtRatio: "Rasio Hutang-Pendapatan",
      wealthScore: "Skor Kekayaan",
      income: "Pendapatan",
      expenses: "Pengeluaran",
      savings: "Tabungan",
      debt: "Hutang",
      excellent: "Sangat Baik",
      good: "Baik",
      needsWork: "Perlu Perbaikan",
      portfolio: "Portofolio",
      goals: "Tujuan"
    }
  }[language];

  const netWorth = stats.totalPortfolioValue - stats.totalDebt;
  const debtToIncome = stats.monthlyIncome > 0 ? (stats.totalDebt / (stats.monthlyIncome * 12)) * 100 : 0;
  const wealthScore = Math.round(
    (Math.min(stats.savingsRate / 20, 1) * 40) +
    (Math.min(stats.totalPortfolioValue / 100000, 1) * 30) +
    (Math.max(1 - (debtToIncome / 100), 0) * 30)
  );

  const getHealthLabel = (score: number) => {
    if (score >= 80) return { label: t.excellent, color: 'bg-green-500' };
    if (score >= 60) return { label: t.good, color: 'bg-yellow-500' };
    return { label: t.needsWork, color: 'bg-red-500' };
  };

  const healthInfo = getHealthLabel(wealthScore);

  const pieData = [
    { name: t.savings, value: stats.monthlyIncome - stats.monthlyExpenses, fill: '#10b981' },
    { name: t.expenses, value: stats.monthlyExpenses, fill: '#f59e0b' },
  ];

  const barData = [
    { name: 'Jan', income: 8500, expenses: 6200 },
    { name: 'Feb', income: 9200, expenses: 6800 },
    { name: 'Mar', income: 8800, expenses: 6500 },
    { name: 'Apr', income: stats.monthlyIncome, expenses: stats.monthlyExpenses },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-slate-800/60 dark:to-slate-800/30 backdrop-blur-md h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.financialHealth}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t.description}</p>
              </div>
            </div>
            <Badge className={`${healthInfo.color} text-white`}>
              {healthInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wealth Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{wealthScore}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">{t.wealthScore}</div>
            <Progress value={wealthScore} className="h-3" />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">${netWorth.toLocaleString()}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.netWorth}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <PiggyBank className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.savingsRate}%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.savingsRate}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Building className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.investments}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.investments}</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
              <Target className="h-5 w-5 text-orange-600 mx-auto mb-2" />
              <div className="font-bold text-slate-800 dark:text-slate-100">{stats.wealthGoals}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t.goals}</div>
            </div>
          </div>

          {/* Income vs Expenses Chart */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Monthly Trends</h4>
            <ChartContainer
              config={{
                income: { label: t.income, color: '#10b981' },
                expenses: { label: t.expenses, color: '#f59e0b' },
              }}
              className="h-32"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill="#10b981" radius={2} />
                  <Bar dataKey="expenses" fill="#f59e0b" radius={2} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FinancialHealthSection;
