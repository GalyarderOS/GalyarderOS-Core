import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Plus, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockTransactions = [
    {
        id: '1',
        description: 'Salary',
        type: 'income',
        amount: 5000,
        transaction_date: '2024-07-25',
        cashflow_categories: { name: 'Salary', color: '#10B981' }
    },
    {
        id: '2',
        description: 'Rent',
        type: 'expense',
        amount: 2000,
        transaction_date: '2024-07-25',
        cashflow_categories: { name: 'Housing', color: '#EF4444' }
    },
    {
        id: '3',
        description: 'Groceries',
        type: 'expense',
        amount: 300,
        transaction_date: '2024-07-20',
        cashflow_categories: { name: 'Food', color: '#F59E0B' }
    },
];

const CashflowTracker = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netCashflow: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCashflowData();
    }
  }, [user]);

  const loadCashflowData = async () => {
    // TODO: Replace with Bolt API
    setLoading(true);
    setTimeout(() => {
        const transactionsData = mockTransactions;
        setTransactions(transactionsData || []);

        // Calculate summary
        let totalIncome = 0;
        let totalExpenses = 0;

        transactionsData?.forEach(transaction => {
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else {
                totalExpenses += transaction.amount;
            }
        });

        setSummary({
            totalIncome,
            totalExpenses,
            netCashflow: totalIncome - totalExpenses
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
          <h1 className="text-3xl font-bold font-playfair text-foreground">Cashflow Tracker</h1>
          <p className="text-muted-foreground font-playfair">Monitor your income and expenses with precision</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-green-500/30 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Total Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 font-playfair">
                ${summary.totalIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                This month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-border hover:border-red-500/30 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Total Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 font-playfair">
                ${summary.totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                This month
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
              <CardTitle className="text-sm font-medium font-playfair">Net Cashflow</CardTitle>
              {summary.netCashflow >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-playfair ${
                summary.netCashflow >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${summary.netCashflow.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                {summary.netCashflow >= 0 ? 'Positive' : 'Negative'} flow
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Recent Transactions</CardTitle>
            <CardDescription className="font-playfair">
              Your latest income and expense transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">No Transactions Yet</h3>
                <p className="text-muted-foreground mb-6 font-playfair">
                  Start tracking your cashflow by adding your first transaction
                </p>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 10).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income' 
                          ? 'bg-green-500/20 text-green-600' 
                          : 'bg-red-500/20 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-6 w-6" />
                        ) : (
                          <ArrowDownRight className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-playfair">{transaction.description}</h4>
                        <p className="text-sm text-muted-foreground font-playfair">
                          {transaction.cashflow_categories?.name || 'Uncategorized'} • {new Date(transaction.transaction_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold font-playfair ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CashflowTracker;
