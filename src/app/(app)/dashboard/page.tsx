import { StatsCard } from '@/components/dashboard/stats-card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { WelcomeBanner } from '@/components/dashboard/welcome-banner';
import { transactions } from '@/lib/data';
import { DollarSign, Wallet, TrendingDown, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const totalBalance = transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };
  
  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {hasTransactions ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Saldo Total" 
            value={formatCurrency(totalBalance)} 
            icon={Wallet} 
            description="Balanço de todas as contas"
          />
          <StatsCard 
            title="Receitas (Mês)" 
            value={formatCurrency(totalIncome)} 
            icon={TrendingUp} 
            description="+20.1% vs mês passado"
          />
          <StatsCard 
            title="Despesas (Mês)" 
            value={formatCurrency(totalExpenses)} 
            icon={TrendingDown} 
            description="+12.2% vs mês passado"
          />
          <StatsCard 
            title="Transações Pendentes" 
            value="+1" 
            icon={DollarSign}
            description="1 fatura a vencer"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
            <WelcomeBanner />
        </div>
      )}
      
      {hasTransactions && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <OverviewChart />
            <RecentTransactions />
        </div>
      )}
    </div>
  );
}
