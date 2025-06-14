
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, FileText, TrendingDown, DollarSign, PieChart } from 'lucide-react';

const TaxOptimizer = () => {
  const taxSavings = [
    {
      strategy: "Retirement Account Contributions",
      description: "Maximize 401(k) and IRA contributions to reduce taxable income",
      potentialSaving: 8400,
      status: "Active",
      difficulty: "Easy"
    },
    {
      strategy: "Tax-Loss Harvesting",
      description: "Offset capital gains with strategic loss realization",
      potentialSaving: 3200,
      status: "Recommended",
      difficulty: "Medium"
    },
    {
      strategy: "HSA Maximization",
      description: "Triple tax advantage through health savings account",
      potentialSaving: 2100,
      status: "Available",
      difficulty: "Easy"
    },
    {
      strategy: "Charitable Donations",
      description: "Strategic giving for tax deductions and social impact",
      potentialSaving: 1800,
      status: "Available",
      difficulty: "Easy"
    }
  ];

  const totalSavings = taxSavings.reduce((sum, strategy) => sum + strategy.potentialSaving, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground">Tax Optimizer</h1>
          <p className="text-muted-foreground font-playfair">Minimize tax burden through strategic planning</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background font-playfair">
          <Plus className="h-4 w-4 mr-2" />
          Add Tax Strategy
        </Button>
      </motion.div>

      {/* Tax Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-border hover:border-green-500/30 transition-all duration-300 soft-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-playfair">Potential Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 font-playfair">
                ${totalSavings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Annual tax reduction
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
              <CardTitle className="text-sm font-medium font-playfair">Active Strategies</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">
                {taxSavings.filter(s => s.status === 'Active').length}
              </div>
              <p className="text-xs text-muted-foreground font-playfair">
                Currently implemented
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
              <CardTitle className="text-sm font-medium font-playfair">Effective Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-playfair">18.5%</div>
              <p className="text-xs text-muted-foreground font-playfair">
                <span className="text-green-500">-4.2%</span> optimized
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tax Strategies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Tax Optimization Strategies</CardTitle>
            <CardDescription className="font-playfair">
              Strategic approaches to minimize your tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {taxSavings.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-foreground font-playfair">{strategy.strategy}</h4>
                        <Badge 
                          variant={strategy.status === 'Active' ? 'default' : 'secondary'}
                          className="font-playfair"
                        >
                          {strategy.status}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={`font-playfair ${
                            strategy.difficulty === 'Easy' ? 'border-green-500 text-green-600' :
                            strategy.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-600' :
                            'border-red-500 text-red-600'
                          }`}
                        >
                          {strategy.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-playfair">{strategy.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 font-playfair">
                        ${strategy.potentialSaving.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-playfair">Annual Savings</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-sm text-muted-foreground font-playfair">
                        Impact: {((strategy.potentialSaving / totalSavings) * 100).toFixed(1)}% of total savings
                      </span>
                    </div>
                    
                    <Button 
                      variant={strategy.status === 'Active' ? 'secondary' : 'default'}
                      className="font-playfair"
                    >
                      {strategy.status === 'Active' ? 'Manage' : 'Implement'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tax Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-2 border-border soft-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-playfair">Tax Documents & Resources</CardTitle>
            <CardDescription className="font-playfair">
              Essential documents and tools for tax optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Tax Return (2023)", status: "Filed", icon: FileText },
                { name: "W-2 Forms", status: "Complete", icon: FileText },
                { name: "1099 Investment Forms", status: "Pending", icon: FileText },
                { name: "Charitable Receipts", status: "Organized", icon: FileText },
              ].map((document, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-muted/20 rounded-xl border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
                    <document.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground font-playfair">{document.name}</h5>
                    <p className="text-sm text-muted-foreground font-playfair">{document.status}</p>
                  </div>
                  <Badge variant="outline" className="font-playfair">
                    {document.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TaxOptimizer;
