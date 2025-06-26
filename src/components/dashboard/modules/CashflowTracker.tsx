import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Plus, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, Edit, Trash2 } from 'lucide-react';
import useFinanceStore, { Transaction } from '@/stores/useFinanceStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/global/ui/dialog';
import { Input } from '@/components/global/ui/input';
import { Label } from '@/components/global/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/global/ui/select';

// Transaction Form Modal
const TransactionModal = ({
  isOpen,
  onClose,
  onSave,
  transaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Transaction, 'id'>) => void;
  transaction?: Transaction;
}) => {
  const { categories } = useFinanceStore();
  const [data, setData] = useState<Omit<Transaction, 'id'>>({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    categoryId: '',
  });

  useState(() => {
    if (isOpen) {
      if (transaction) {
        setData({
          ...transaction,
          date: new Date(transaction.date).toISOString().split('T')[0],
        });
      } else {
        setData({
          description: '',
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          type: 'expense',
          categoryId: '',
        });
      }
    }
  });

  const handleSave = () => {
    onSave({ ...data, amount: Number(data.amount) });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? 'Edit' : 'Add'} Transaction</DialogTitle>
          <DialogDescription>Fill in the details of your transaction.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input 
                placeholder="Description"
                value={data.description}
                onChange={(e) => setData({...data, description: e.target.value})}
            />
            <Input 
                type="number"
                placeholder="Amount"
                value={data.amount}
                onChange={(e) => setData({...data, amount: parseFloat(e.target.value) || 0})}
            />
            <Input 
                type="date"
                value={data.date}
                onChange={(e) => setData({...data, date: e.target.value})}
            />
            <Select value={data.type} onValueChange={(type: 'income' | 'expense') => setData({...data, type, categoryId: ''})}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
            </Select>
            <Select value={data.categoryId} onValueChange={(categoryId) => setData({...data, categoryId})}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                    {categories.filter(c => c.type === data.type).map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


// Main Component
const CashflowTracker = () => {
  const { transactions, categories, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

  const summary = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      if (tx.type === 'income') {
        acc.totalIncome += tx.amount;
      } else {
        acc.totalExpenses += tx.amount;
      }
      acc.netCashflow = acc.totalIncome - acc.totalExpenses;
      return acc;
    }, { totalIncome: 0, totalExpenses: 0, netCashflow: 0 });
  }, [transactions]);
  
  const handleSaveTransaction = (data: Omit<Transaction, 'id'>) => {
      if (editingTransaction) {
          updateTransaction(editingTransaction.id, data);
      } else {
          addTransaction(data);
      }
  };

  const handleOpenModal = (tx?: Transaction) => {
      setEditingTransaction(tx);
      setModalOpen(true);
  }

  const getCategory = (id: string) => categories.find(c => c.id === id);
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cashflow Tracker</h1>
          <p className="text-muted-foreground">Monitor your income and expenses with precision.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-border hover:border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${summary.totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border hover:border-red-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${summary.totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
           <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cashflow</CardTitle>
              <TrendingUp className={`h-4 w-4 ${summary.netCashflow >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </CardHeader>
            <CardContent>
               <div className={`text-2xl font-bold ${summary.netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${summary.netCashflow.toLocaleString()}
              </div>
            </CardContent>
          </Card>
      </div>

      <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
            <CardDescription>Your latest income and expense activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {transactions.slice().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(tx => {
                    const category = getCategory(tx.categoryId);
                    return (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border group">
                            <div className="flex items-center space-x-4">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${category?.color}20`, color: category?.color }}>
                                    {tx.type === 'income' ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownRight className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">{tx.description}</h4>
                                    <p className="text-sm text-muted-foreground">{category?.name || 'Uncategorized'} • {new Date(tx.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                                </span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(tx)}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={() => deleteTransaction(tx.id)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
          </CardContent>
      </Card>
      
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default CashflowTracker;
