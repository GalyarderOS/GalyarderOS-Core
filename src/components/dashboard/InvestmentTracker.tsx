import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useFinanceStore from '@/stores/useFinanceStore';
import type { Portfolio, Investment } from '@/stores/useFinanceStore';
import { TrendingUp, Plus, DollarSign, PieChart, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';


interface InvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Investment>) => void;
    investment?: Investment;
    portfolioId: string;
}

const InvestmentModal = ({ isOpen, onClose, onSave, investment, portfolioId }: InvestmentModalProps) => {
    // ... modal logic for adding/editing an individual investment
    // This can be implemented similarly to other modals
    return null; // Placeholder
}

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; description: string }) => void;
    portfolio?: Portfolio;
}

const PortfolioModal = ({ isOpen, onClose, onSave, portfolio }: PortfolioModalProps) => {
    const [data, setData] = useState({ name: '', description: '' });
    useState(() => {
        if(isOpen) setData(portfolio ? { name: portfolio.name, description: portfolio.description } : { name: '', description: '' });
    });
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader><DialogTitle>{portfolio ? 'Edit' : 'Create'} Portfolio</DialogTitle></DialogHeader>
                <Input placeholder="Portfolio Name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                <Textarea placeholder="Description" value={data.description} onChange={(e) => setData({...data, description: e.target.value})} />
                <DialogFooter><Button onClick={() => onSave(data)}>Save</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const InvestmentTracker = () => {
    const { portfolios, addPortfolio, updatePortfolio, deletePortfolio } = useFinanceStore();
    const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | undefined>();

    const stats = useMemo(() => {
        const totalValue = portfolios.flatMap(p => p.investments).reduce((sum, i) => sum + (i.quantity * i.currentPrice), 0);
        return { totalValue };
    }, [portfolios]);

    const handleSavePortfolio = (data: { name: string; description: string }) => {
        if (editingPortfolio) {
            updatePortfolio(editingPortfolio.id, data);
        } else {
            addPortfolio(data);
        }
        setPortfolioModalOpen(false);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Investment Tracker</h1>
                    <p className="text-muted-foreground">Monitor your portfolio performance.</p>
                </div>
                <Button onClick={() => { setEditingPortfolio(undefined); setPortfolioModalOpen(true); }}><Plus className="mr-2 h-4 w-4" />Create Portfolio</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle>Total Value</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${stats.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</div></CardContent></Card>
                <Card><CardHeader><CardTitle>Portfolios</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{portfolios.length}</div></CardContent></Card>
            </div>

            <div className="space-y-4">
                {portfolios.map(p => {
                    const portfolioValue = p.investments.reduce((sum, i) => sum + i.quantity * i.currentPrice, 0);
                    return (
                        <Collapsible key={p.id} className="border rounded-lg">
                            <CollapsibleTrigger className="w-full p-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">{p.name}</h4>
                                    <p className="text-sm text-muted-foreground">{p.description}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold">${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setEditingPortfolio(p); setPortfolioModalOpen(true); }}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deletePortfolio(p.id); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    <ChevronDown className="h-5 w-5 transition-transform" />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 pt-0">
                                <div className="space-y-2">
                                    {p.investments.map(i => (
                                        <div key={i.id} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                            <div>{i.name} ({i.quantity} @ ${i.currentPrice})</div>
                                            <div>${(i.quantity * i.currentPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                                        </div>
                                    ))}
                                    <Button variant="secondary" className="w-full mt-2"><Plus className="mr-2 h-4 w-4" /> Add Investment</Button>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )
                })}
            </div>

            <PortfolioModal isOpen={isPortfolioModalOpen} onClose={() => setPortfolioModalOpen(false)} onSave={handleSavePortfolio} portfolio={editingPortfolio} />
        </div>
    );
};

export default InvestmentTracker;
