
import { Utensils, Car, Home, Ticket, Landmark, Sprout, Briefcase, ShoppingCart, Activity, type LucideIcon } from 'lucide-react';
import * as availableIcons from '@/lib/available-icons';

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
  iconName: keyof typeof availableIcons;
  icon: LucideIcon;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export type Document = {
  id: string;
  filename: string;
  uploadedAt: string;
  status: 'processing' | 'awaiting-action' | 'completed' | 'failed';
  thumbnailUrl?: string;
};


export let categories: Category[] = [
  { id: 'cat-1', name: 'Alimentação', icon: Utensils, iconName: 'Utensils' },
  { id: 'cat-2', name: 'Transporte', icon: Car, iconName: 'Car' },
  { id: 'cat-3', name: 'Moradia', icon: Home, iconName: 'Home' },
  { id: 'cat-4', name: 'Lazer', icon: Ticket, iconName: 'Ticket' },
  { id: 'cat-5', name: 'Salário', icon: Landmark, iconName: 'Landmark' },
  { id: 'cat-6', name: 'Outros', icon: Sprout, iconName: 'Sprout' },
  { id: 'cat-7', name: 'Compras', icon: ShoppingCart, iconName: 'ShoppingCart' },
  { id: 'cat-8', name: 'Saúde', icon: Activity, iconName: 'Activity' },
  { id: 'cat-9', name: 'Trabalho', icon: Briefcase, iconName: 'Briefcase' },
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


export const documents: Document[] = [
    { id: 'doc-1', filename: 'recibo-restaurante.pdf', uploadedAt: new Date(currentYear, currentMonth, 1).toISOString(), status: 'completed', thumbnailUrl: 'https://picsum.photos/seed/doc1/100/100' },
    { id: 'doc-2', filename: 'boleto-internet.png', uploadedAt: new Date(currentYear, currentMonth, 3).toISOString(), status: 'awaiting-action', thumbnailUrl: 'https://picsum.photos/seed/doc2/100/100' },
    { id: 'doc-3', filename: 'fatura-cartao.pdf', uploadedAt: new Date(currentYear, currentMonth, 4).toISOString(), status: 'processing', thumbnailUrl: 'https://picsum.photos/seed/doc3/100/100' },
    { id: 'doc-4', filename: 'comprovante-transferencia.jpg', uploadedAt: new Date(currentYear, currentMonth, 5).toISOString(), status: 'failed', thumbnailUrl: 'https://picsum.photos/seed/doc4/100/100' },
];
