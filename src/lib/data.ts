export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending';
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
  { id: 'cat-1', name: 'Alimentação', icon: 'Utensils' },
  { id: 'cat-2', name: 'Transporte', icon: 'Car' },
  { id: 'cat-3', name: 'Moradia', icon: 'Home' },
  { id: 'cat-4', name: 'Lazer', icon: 'Ticket' },
  { id: 'cat-5', name: 'Salário', icon: 'Landmark' },
  { id: 'cat-6', name: 'Outros', icon: 'Sprout' },
];

const today = new Date();
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

export const transactions: Transaction[] = [
  { id: 'txn-1', date: new Date(today.setDate(today.getDate() - 1)).toISOString(), description: 'Supermercado do Mês', amount: 450.75, type: 'expense', category: 'Alimentação', status: 'completed' },
  { id: 'txn-2', date: new Date(today.setDate(today.getDate() - 2)).toISOString(), description: 'Salário', amount: 5000, type: 'income', category: 'Salário', status: 'completed' },
  { id: 'txn-3', date: new Date(today.setDate(today.getDate() - 3)).toISOString(), description: 'Gasolina', amount: 150, type: 'expense', category: 'Transporte', status: 'completed' },
  { id: 'txn-4', date: new Date(today.setDate(today.getDate() - 5)).toISOString(), description: 'Cinema', amount: 80, type: 'expense', category: 'Lazer', status: 'completed' },
  { id: 'txn-5', date: new Date(today.setDate(today.getDate() - 7)).toISOString(), description: 'Aluguel', amount: 1500, type: 'expense', category: 'Moradia', status: 'completed' },
  { id: 'txn-6', date: new Date(today.setDate(today.getDate() - 10)).toISOString(), description: 'Jantar com amigos', amount: 120.50, type: 'expense', category: 'Alimentação', status: 'completed' },
  { id: 'txn-7', date: new Date(today.setDate(today.getDate() - 15)).toISOString(), description: 'Freelance Job', amount: 800, type: 'income', category: 'Salário', status: 'completed' },
  { id: 'txn-8', date: new Date(lastMonth).toISOString(), description: 'Conta de Luz', amount: 120.50, type: 'expense', category: 'Moradia', status: 'pending' },
];

export const budgets: Budget[] = [
  { id: 'bud-1', category: 'Alimentação', limit: 800, spent: 571.25 },
  { id: 'bud-2', category: 'Transporte', limit: 300, spent: 150 },
  { id: 'bud-3', category: 'Lazer', limit: 400, spent: 80 },
];

export const documents = [
  {
    id: "doc-001",
    name: "recibo-restaurante.pdf",
    status: "SUCESSO",
    uploadedAt: "2024-07-28T10:00:00Z",
  },
  {
    id: "doc-002",
    name: "invoice-freelance.png",
    status: "REQUER_AÇÃO",
    uploadedAt: "2024-07-28T11:30:00Z",
  },
  {
    id: "doc-003",
    name: "nota-fiscal-super.jpeg",
    status: "PROCESSANDO",
    uploadedAt: "2024-07-29T09:05:00Z",
  },
  {
    id: "doc-004",
    name: "comprovante-gas.pdf",
    status: "FALHA",
    uploadedAt: "2024-07-29T09:15:00Z",
  },
];
