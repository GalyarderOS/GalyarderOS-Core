import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  date: string; // ISO format
  categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    color: string;
}

export interface Debt {
  id: string;
  name: string;
  type: 'credit_card' | 'student_loan' | 'mortgage' | 'personal_loan' | 'other';
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: string; // ISO format date part
}

export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'real_estate' | 'other';
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface Portfolio {
    id: string;
    name: string;
    description: string;
    investments: Investment[];
}

interface FinanceState {
  transactions: Transaction[];
  categories: Category[];
  debts: Debt[];
  portfolios: Portfolio[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, txUpdate: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, debtUpdate: Partial<Omit<Debt, 'id'>>) => void;
  deleteDebt: (id: string) => void;
  addPortfolio: (portfolio: Omit<Portfolio, 'id' | 'investments'>) => void;
  updatePortfolio: (id: string, portfolioUpdate: Partial<Omit<Portfolio, 'id'>>) => void;
  deletePortfolio: (id: string) => void;
  addInvestmentToPortfolio: (portfolioId: string, investment: Omit<Investment, 'id'>) => void;
  updateInvestmentInPortfolio: (portfolioId: string, investmentId: string, investmentUpdate: Partial<Omit<Investment, 'id'>>) => void;
  deleteInvestmentFromPortfolio: (portfolioId: string, investmentId: string) => void;
}

const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      categories: [
          { id: 'cat1', name: 'Salary', type: 'income', color: '#10B981' },
          { id: 'cat2', name: 'Freelance', type: 'income', color: '#34D399' },
          { id: 'cat3', name: 'Housing', type: 'expense', color: '#EF4444' },
          { id: 'cat4', name: 'Food', type: 'expense', color: '#F59E0B' },
          { id: 'cat5', name: 'Transport', type: 'expense', color: '#3B82F6' },
          { id: 'cat6', name: 'Entertainment', type: 'expense', color: '#8B5CF6' },
      ],
      transactions: [
        {
            id: '1',
            description: 'Monthly Salary',
            type: 'income',
            amount: 5000,
            date: new Date('2024-07-01').toISOString(),
            categoryId: 'cat1',
        },
        {
            id: '2',
            description: 'Apartment Rent',
            type: 'expense',
            amount: 1500,
            date: new Date('2024-07-01').toISOString(),
            categoryId: 'cat3',
        },
        {
            id: '3',
            description: 'Weekly Groceries',
            type: 'expense',
            amount: 250,
            date: new Date('2024-07-05').toISOString(),
            categoryId: 'cat4',
        },
        {
            id: '4',
            description: 'Freelance Project',
            type: 'income',
            amount: 750,
            date: new Date('2024-07-10').toISOString(),
            categoryId: 'cat2',
        },
      ],
      debts: [
        {
          id: 'debt1',
          name: 'Chase Sapphire Reserve',
          type: 'credit_card',
          totalAmount: 15000,
          remainingAmount: 8500,
          interestRate: 22.5,
          minimumPayment: 250,
          dueDate: '2024-08-15',
        },
        {
          id: 'debt2',
          name: 'Student Loan - Navient',
          type: 'student_loan',
          totalAmount: 40000,
          remainingAmount: 35000,
          interestRate: 5.8,
          minimumPayment: 400,
          dueDate: '2024-08-01',
        },
      ],
      portfolios: [
        {
            id: 'p1',
            name: 'Growth Tech Stocks',
            description: 'High-risk, high-reward tech investments.',
            investments: [
                { id: 'i1', name: 'NVIDIA (NVDA)', type: 'stock', quantity: 10, purchasePrice: 800, currentPrice: 1200 },
                { id: 'i2', name: 'Bitcoin (BTC)', type: 'crypto', quantity: 0.1, purchasePrice: 60000, currentPrice: 65000 },
            ],
        },
        {
            id: 'p2',
            name: 'Retirement Fund',
            description: 'Long-term, stable index funds.',
            investments: [
                 { id: 'i3', name: 'Vanguard S&P 500 (VOO)', type: 'stock', quantity: 20, purchasePrice: 450, currentPrice: 500 },
            ],
        },
      ],

      addTransaction: (tx) => set((state) => ({
        transactions: [...state.transactions, { ...tx, id: uuidv4() }]
      })),

      updateTransaction: (id, txUpdate) => set((state) => ({
        transactions: state.transactions.map(tx => tx.id === id ? { ...tx, ...txUpdate } : tx)
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
      })),

      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { ...category, id: uuidv4() }]
      })),
      
      addDebt: (debt) => set((state) => ({
          debts: [...state.debts, { ...debt, id: uuidv4() }]
      })),
      updateDebt: (id, debtUpdate) => set((state) => ({
          debts: state.debts.map(d => d.id === id ? { ...d, ...debtUpdate } : d)
      })),
      deleteDebt: (id) => set((state) => ({
          debts: state.debts.filter(d => d.id !== id)
      })),

      addPortfolio: (portfolio) => set((state) => ({
          portfolios: [...state.portfolios, { ...portfolio, id: uuidv4(), investments: [] }]
      })),
      updatePortfolio: (id, portfolioUpdate) => set((state) => ({
          portfolios: state.portfolios.map(p => p.id === id ? { ...p, ...portfolioUpdate } : p)
      })),
      deletePortfolio: (id) => set((state) => ({
          portfolios: state.portfolios.filter(p => p.id !== id)
      })),

      addInvestmentToPortfolio: (portfolioId, investment) => set((state) => ({
          portfolios: state.portfolios.map(p => 
              p.id === portfolioId 
              ? { ...p, investments: [...p.investments, { ...investment, id: uuidv4() }] }
              : p
          )
      })),
      updateInvestmentInPortfolio: (portfolioId, investmentId, investmentUpdate) => set((state) => ({
          portfolios: state.portfolios.map(p => 
              p.id === portfolioId
              ? { ...p, investments: p.investments.map(i => i.id === investmentId ? { ...i, ...investmentUpdate } : i) }
              : p
          )
      })),
      deleteInvestmentFromPortfolio: (portfolioId, investmentId) => set((state) => ({
          portfolios: state.portfolios.map(p => 
              p.id === portfolioId
              ? { ...p, investments: p.investments.filter(i => i.id !== investmentId) }
              : p
          )
      })),
    }),
    {
      name: 'galyarder-finance-storage',
    }
  )
);

export default useFinanceStore;