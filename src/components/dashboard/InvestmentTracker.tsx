import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Plus, DollarSign, Target, PieChart } from 'lucide-react';

const mockPortfolios = [
    {
        id: '1',
        name: 'Growth Portfolio',
        description: 'High-risk, high-reward investments.',
        total_value: 50000,
        investments: [{}, {}, {}],
    },
    {
        id: '2',
        name: 'Retirement Fund',
        description: 'Long-term, stable investments.',
        total_value: 150000,
        investments: [{}, {}, {}, {}],
    },
];

const InvestmentTracker = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPortfolios();
    }
  }, [user]);

  const loadPortfolios = async () => {
    // TODO: Replace with Bolt API
    setLoading(true);
    setTimeout(() => {
        setPortfolios(mockPortfolios);
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
          <h1 className="text-3xl font-bold font-playfair text-foreground">Investment Tracker</h1>
          <p className="text-muted-foreground font-playfair">Monitor your portfolio performance with precision</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </Button>
      </motion.div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-muted-foreground/20 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">$0</div>
              <p className="text-xs text-muted-foreground font-playfair">
                <span className="text-green-500">+0%</span> from last month
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
              <CardTitle className="text-sm font-medium font-playfair">Active Portfolios</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">{portfolios.length}</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Diversified across markets
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
              <CardTitle className="text-sm font-medium font-playfair">Monthly Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">+0%</div>
              <p className="text-xs text-muted-foreground font-playfair">
                Outperforming market average
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Portfolios List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Your Portfolios</CardTitle>
            <CardDescription className="font-playfair">
              Manage and monitor your investment portfolios
            </CardDescription>
          </CardHeader>
          <CardContent>
            {portfolios.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-playfair">No Portfolios Yet</h3>
                <p className="text-muted-foreground mb-6 font-playfair">
                  Start building your investment portfolio today
                </p>
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Portfolio
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {portfolios.map((portfolio, index) => (
                  <motion.div
                    key={portfolio.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground font-playfair">{portfolio.name}</h4>
                        <p className="text-sm text-muted-foreground font-playfair">{portfolio.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground font-playfair">
                        ${portfolio.total_value?.toLocaleString() || '0'}
                      </div>
                      <Badge variant="secondary" className="font-playfair">
                        {portfolio.investments?.length || 0} investments
                      </Badge>
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

export default InvestmentTracker;
