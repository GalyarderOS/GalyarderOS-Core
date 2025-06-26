import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import useFinanceStore, { Debt } from '@/stores/useFinanceStore';
import { CreditCard, Plus, Target, TrendingDown, Calendar, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Debt Form Modal
const DebtModal = ({
  isOpen,
  onClose,
  onSave,
  debt,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Debt, 'id'>) => void;
  debt?: Debt;
}) => {
    const [data, setData] = useState<Omit<Debt, 'id'>>({
        name: '',
        type: 'personal_loan',
        totalAmount: 0,
        remainingAmount: 0,
        interestRate: 0,
        minimumPayment: 0,
        dueDate: new Date().toISOString().split('T')[0],
    });

    useState(() => {
      if(isOpen) {
        if(debt) {
            setData(debt)
        } else {
             setData({
                name: '',
                type: 'personal_loan',
                totalAmount: 0,
                remainingAmount: 0,
                interestRate: 0,
                minimumPayment: 0,
                dueDate: new Date().toISOString().split('T')[0],
            });
        }
      }
    });

  const handleSave = () => {
    onSave(data);
    onClose();
  };
  
  const handleChange = (field: keyof Omit<Debt, 'id'>, value: string | number) => {
      setData(prev => ({...prev, [field]: value}));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{debt ? 'Edit' : 'Add'} Debt</DialogTitle>
          <DialogDescription>Enter the details of your debt.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
            <Input className="col-span-2" placeholder="Debt Name (e.g., Car Loan)" value={data.name} onChange={(e) => handleChange('name', e.target.value)} />
            <Input type="number" placeholder="Total Amount" value={data.totalAmount} onChange={(e) => handleChange('totalAmount', parseFloat(e.target.value))} />
            <Input type="number" placeholder="Remaining Amount" value={data.remainingAmount} onChange={(e) => handleChange('remainingAmount', parseFloat(e.target.value))} />
            <Input type="number" placeholder="Interest Rate (%)" value={data.interestRate} onChange={(e) => handleChange('interestRate', parseFloat(e.target.value))} />
            <Input type="number" placeholder="Minimum Payment" value={data.minimumPayment} onChange={(e) => handleChange('minimumPayment', parseFloat(e.target.value))} />
            <Input type="date" value={data.dueDate} onChange={(e) => handleChange('dueDate', e.target.value)} />
            <Select value={data.type} onValueChange={(v: Debt['type']) => handleChange('type', v)}>
                <SelectTrigger><SelectValue placeholder="Debt Type" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="student_loan">Student Loan</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="personal_loan">Personal Loan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
const DebtManager = () => {
  const { debts, addDebt, updateDebt, deleteDebt } = useFinanceStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | undefined>(undefined);

  const stats = useMemo(() => {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
    const monthlyPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    const averageInterestRate = debts.length > 0 ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length : 0;
    return { totalDebt, monthlyPayments, averageInterestRate };
  }, [debts]);
  
  const handleSaveDebt = (data: Omit<Debt, 'id'>) => {
      if (editingDebt) {
          updateDebt(editingDebt.id, data);
      } else {
          addDebt(data);
      }
  };

  const handleOpenModal = (debt?: Debt) => {
      setEditingDebt(debt);
      setModalOpen(true);
  };
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Debt Manager</h1>
          <p className="text-muted-foreground">Eliminate debt efficiently with intelligent strategies.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Debt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardHeader><CardTitle>Total Debt</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">${stats.totalDebt.toLocaleString()}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Monthly Payments</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${stats.monthlyPayments.toLocaleString()}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Avg Interest</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.averageInterestRate.toFixed(1)}%</div></CardContent></Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Your Debts</CardTitle>
            <CardDescription>Strategic debt elimination prioritized by impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                {debts.map((debt) => {
                  const payoffProgress = (debt.totalAmount - debt.remainingAmount) / debt.totalAmount * 100;
                  return (
                    <div key={debt.id} className="p-6 bg-muted/20 rounded-xl border border-border group">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{debt.name}</h4>
                          <Badge variant="secondary" className="capitalize">{debt.type.replace('_', ' ')}</Badge>
                        </div>
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenModal(debt)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteDebt(debt.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <Progress value={payoffProgress} className="mb-2 h-2" />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="font-semibold">${debt.remainingAmount.toLocaleString()}</span><p className="text-xs text-muted-foreground">Remaining</p></div>
                        <div><span className="font-semibold">{debt.interestRate}%</span><p className="text-xs text-muted-foreground">Interest</p></div>
                        <div><span className="font-semibold">${debt.minimumPayment.toLocaleString()}</span><p className="text-xs text-muted-foreground">Min. Payment</p></div>
                        <div><span className="font-semibold">{new Date(debt.dueDate).toLocaleDateString()}</span><p className="text-xs text-muted-foreground">Due Date</p></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
      </Card>

      <DebtModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDebt}
        debt={editingDebt}
      />
    </div>
  );
};

export default DebtManager;
