import create from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  date: string; // ISO 8601 format
}

export interface Investment {
    id: string;
    name: string;
    type: string; // e.g., Stocks, Crypto, Real Estate
    initialValue: number;
    currentValue: number;
    purchaseDate: string;
}

export interface Debt {
    id: string;
    name: string;
    type: string; // e.g., Mortgage, Student Loan, Credit Card
    initialAmount: number;
    currentBalance: number;
    interestRate: number;
}

interface FinanceState {
  transactions: Transaction[];
  investments: Investment[];
  debts: Debt[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
  // Placeholder actions for other modules
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, investment: Partial<Omit<Investment, 'id'>>) => void;
  deleteInvestment: (id: string) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, debt: Partial<Omit<Debt, 'id'>>) => void;
  deleteDebt: (id: string) => void;
}

const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      investments: [],
      debts: [],

      // === ACTIONS ===

      // Transactions
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, { ...transaction, id: uuidv4() }]
      })),
      updateTransaction: (id, transactionUpdate) => set((state) => ({
        transactions: state.transactions.map(t => t.id === id ? { ...t, ...transactionUpdate } : t)
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),

      // Investments
      addInvestment: (investment) => set((state) => ({
        investments: [...state.investments, { ...investment, id: uuidv4() }]
      })),
       updateInvestment: (id, investmentUpdate) => set((state) => ({
        investments: state.investments.map(i => i.id === id ? { ...i, ...investmentUpdate } : i)
      })),
      deleteInvestment: (id) => set((state) => ({
        investments: state.investments.filter(i => i.id !== id)
      })),

      // Debts
      addDebt: (debt) => set((state) => ({
        debts: [...state.debts, { ...debt, id: uuidv4() }]
      })),
      updateDebt: (id, debtUpdate) => set((state) => ({
        debts: state.debts.map(d => d.id === id ? { ...d, ...debtUpdate } : d)
      })),
      deleteDebt: (id) => set((state) => ({
        debts: state.debts.filter(d => d.id !== id)
      })),
    }),
    {
      name: 'galyarder-finance-storage',
    }
  )
);

export default useFinanceStore;