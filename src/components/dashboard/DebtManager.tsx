import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Plus, Target, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';

const mockDebts = [
  {
    id: '1',
    name: 'Chase Sapphire Reserve',
    debt_type: 'credit_card',
    total_amount: 15000,
    remaining_amount: 8500,
    interest_rate: 22.5,
    minimum_payment: 250,
    due_date: '2024-08-15',
  },
  {
    id: '2',
    name: 'Student Loan - Navient',
    debt_type: 'student_loan',
    total_amount: 40000,
    remaining_amount: 35000,
    interest_rate: 5.8,
    minimum_payment: 400,
    due_date: '2024-08-01',
  },
];

const DebtManager = () => {
  const { user } = useAuth();
  const [debts, setDebts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalDebt: 0,
    monthlyPayments: 0,
    averageInterestRate: 0,
    payoffTimeframe: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDebts();
    }
  }, [user]);

  const loadDebts = async () => {
    // TODO: Replace with Bolt API
    setLoading(true);
    setTimeout(() => {
      const debtsData = mockDebts;
      setDebts(debtsData || []);

      // Calculate stats
      const totalDebt = debtsData?.reduce((sum, debt) => sum + debt.remaining_amount, 0) || 0;
      const monthlyPayments = debtsData?.reduce((sum, debt) => sum + (debt.minimum_payment || 0), 0) || 0;
      const avgInterestRate = debtsData?.length > 0 
        ? debtsData.reduce((sum, debt) => sum + (debt.interest_rate || 0), 0) / debtsData.length 
        : 0;

      setStats({
        totalDebt,
        monthlyPayments,
        averageInterestRate: avgInterestRate,
        payoffTimeframe: monthlyPayments > 0 ? Math.ceil(totalDebt / (monthlyPayments * 12)) : 0
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground">Debt Manager</h1>
          <p className="text-muted-foreground font-playfair">Eliminate debt efficiently with intelligent strategies</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Debt
        </Button>
      </motion.div>

      {/* Debt Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-red-500/30 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Total Debt</CardTitle>
              <CreditCard className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 font-playfair">
                ${stats.totalDebt.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Outstanding balance
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Monthly Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                ${stats.monthlyPayments.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Required minimums
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Avg Interest</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                {stats.averageInterestRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Weighted average
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Payoff Time</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                {stats.payoffTimeframe} yrs
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                At current rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Debt List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Your Debts</CardTitle>
            <CardDescription className="font-playfair">
              Strategic debt elimination prioritized by impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            {debts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">No Debts Tracked</h3>
                <p className="text-muted-foreground mb-6 font-playfair">
                  Add your debts to create an elimination strategy
                </p>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Debt
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {debts.map((debt, index) => {
                  const payoffProgress = debt.total_amount > 0 
                    ? ((debt.total_amount - debt.remaining_amount) / debt.total_amount) * 100 
                    : 0;
                  
                  const isHighInterest = (debt.interest_rate || 0) > 15;
                  
                  return (
                    <motion.div
                      key={debt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-foreground font-playfair">{debt.name}</h4>
                            <Badge 
                              variant="secondary"
                              className="font-playfair capitalize"
                            >
                              {debt.debt_type.replace('_', ' ')}
                            </Badge>
                            {isHighInterest && (
                              <Badge variant="destructive" className="font-playfair">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                High Interest
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground font-playfair">
                            <span>Balance: ${debt.remaining_amount.toLocaleString()}</span>
                            <span>Rate: {debt.interest_rate?.toFixed(1) || 0}%</span>
                            <span>Min Payment: ${debt.minimum_payment?.toLocaleString() || 0}</span>
                            {debt.due_date && (
                              <span>Due: {new Date(debt.due_date).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground font-playfair mb-1">
                            {payoffProgress.toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground font-playfair">Paid Off</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={payoffProgress} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground font-playfair">
                          <span>${(debt.total_amount - debt.remaining_amount).toLocaleString()} paid</span>
                          <span>${debt.remaining_amount.toLocaleString()} remaining</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" className="font-playfair">
                          View Strategy
                        </Button>
                        <Button size="sm" className="font-playfair">
                          Make Payment
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DebtManager;
