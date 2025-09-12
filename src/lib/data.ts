import { Utensils, Car, Home, Ticket, Landmark, Sprout, Briefcase, ShoppingCart, Activity } from 'lucide-react';

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'scheduled';
};

export type Category = {
  id: string;
  name: string;
  icon: any; // Lucide icon component
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export const categories: Category[] = [
  { id: 'cat-1', name: 'Alimentação', icon: Utensils },
  { id: 'cat-2', name: 'Transporte', icon: Car },
  { id: 'cat-3', name: 'Moradia', icon: Home },
  { id: 'cat-4', name: 'Lazer', icon: Ticket },
  { id: 'cat-5', name: 'Salário', icon: Landmark },
  { id: 'cat-6', name: 'Outros', icon: Sprout },
  { id: 'cat-7', name: 'Compras', icon: ShoppingCart },
  { id: 'cat-8', name: 'Saúde', icon: Activity },
  { id: 'cat-9', name: 'Trabalho', icon: Briefcase },
];

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

export const transactions: Transaction[] = [
  { id: 'txn-1', date: new Date(currentYear, currentMonth, 2).toISOString(), description: 'Supermercado da Quinzena', amount: 450.75, type: 'expense', category: 'Alimentação', status: 'completed' },
  { id: 'txn-2', date: new Date(currentYear, currentMonth, 1).toISOString(), description: 'Salário', amount: 5000, type: 'income', category: 'Salário', status: 'completed' },
  { id: 'txn-3', date: new Date(currentYear, currentMonth, 3).toISOString(), description: 'Gasolina', amount: 150, type: 'expense', category: 'Transporte', status: 'completed' },
  { id: 'txn-4', date: new Date(currentYear, currentMonth, 5).toISOString(), description: 'Cinema com a família', amount: 80, type: 'expense', category: 'Lazer', status: 'completed' },
  { id: 'txn-5', date: new Date(currentYear, currentMonth, 10).toISOString(), description: 'Aluguel', amount: 1500, type: 'expense', category: 'Moradia', status: 'completed' },
  { id: 'txn-6', date: new Date(currentYear, currentMonth, 12).toISOString(), description: 'Jantar com amigos', amount: 120.50, type: 'expense', category: 'Alimentação', status: 'completed' },
  { id: 'txn-7', date: new Date(currentYear, currentMonth, 15).toISOString(), description: 'Projeto Freelance', amount: 800, type: 'income', category: 'Trabalho', status: 'completed' },
  { id: 'txn-8', date: new Date(currentYear, currentMonth, 16).toISOString(), description: 'Camisa nova', amount: 99.90, type: 'expense', category: 'Compras', status: 'completed' },
  { id: 'txn-9', date: new Date(currentYear, currentMonth, 18).toISOString(), description: 'Farmácia', amount: 65.00, type: 'expense', category: 'Saúde', status: 'completed' },

  // Pending / Scheduled for current month
  { id: 'txn-10', date: new Date(currentYear, currentMonth, 25).toISOString(), description: 'Conta de Internet', amount: 110.00, type: 'expense', category: 'Moradia', status: 'pending' },
  { id: 'txn-11', date: new Date(currentYear, currentMonth, 28).toISOString(), description: 'Parcela do Carro', amount: 850.00, type: 'expense', category: 'Transporte', status: 'scheduled' },
  
  // Scheduled for next month
  { id: 'txn-12', date: new Date(currentYear, currentMonth + 1, 10).toISOString(), description: 'Aluguel (Próximo Mês)', amount: 1500, type: 'expense', category: 'Moradia', status: 'scheduled' },
  { id: 'txn-13', date: new Date(currentYear, currentMonth, 29).toISOString(), description: 'Conta de Luz', amount: 180.25, type: 'expense', category: 'Moradia', status: 'pending' },
  { id: 'txn-14', date: new Date(currentYear, currentMonth, 30).toISOString(), description: 'Assinatura Streaming', amount: 45.90, type: 'expense', category: 'Lazer', status: 'scheduled' },
];

const totalExpenses = transactions
  .filter(t => t.type === 'expense' && t.status === 'completed')
  .reduce((acc, t) => acc + t.amount, 0);

const expensesByCategory = transactions
  .filter(t => t.type === 'expense' && t.status === 'completed')
  .reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = 0;
    }
    acc[t.category] += t.amount;
    return acc;
  }, {} as Record<string, number>);

export const budgets: Budget[] = [
  { id: 'bud-1', category: 'Alimentação', limit: 800, spent: expensesByCategory['Alimentação'] || 0 },
  { id: 'bud-2', category: 'Transporte', limit: 400, spent: expensesByCategory['Transporte'] || 0 },
  { id: 'bud-3', category: 'Lazer', limit: 300, spent: expensesByCategory['Lazer'] || 0 },
  { id: 'bud-4', category: 'Moradia', limit: 1800, spent: expensesByCategory['Moradia'] || 0 },
  { id: 'bud-5', category: 'Compras', limit: 250, spent: expensesByCategory['Compras'] || 0 },
  { id: 'bud-6', category: 'Saúde', limit: 200, spent: expensesByCategory['Saúde'] || 0 },
];
