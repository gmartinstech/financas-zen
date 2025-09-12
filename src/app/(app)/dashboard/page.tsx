import { OverviewChart } from '@/components/dashboard/overview-chart';
import { QuickAddButton } from '@/components/dashboard/quick-add-button';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { StatsCard } from '@/components/dashboard/stats-card';
import { WelcomeBanner } from '@/components/dashboard/welcome-banner';
import { transactions, budgets } from '@/lib/data';
import { DollarSign, Wallet, TrendingDown, TrendingUp } from 'lucide-react';
import { BudgetProgressCard } from '@/components/dashboard/budget-progress-card';
import { UpcomingExpensesCard } from '@/components/dashboard/upcoming-expenses-card';


export default function DashboardPage() {
  const totalBalance = transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const monthBalance = totalIncome - totalExpenses;

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
            title="Balanço das Contas" 
            value={formatCurrency(totalBalance)} 
            icon={Wallet} 
            description="Saldo total de suas contas"
          />
          <StatsCard 
            title="Receitas (Mês)" 
            value={formatCurrency(totalIncome)} 
            icon={TrendingUp} 
          />
          <StatsCard 
            title="Despesas (Mês)" 
            value={formatCurrency(totalExpenses)} 
            icon={TrendingDown}
          />
          <StatsCard 
            title="Saldo do Mês" 
            value={formatCurrency(monthBalance)} 
            icon={DollarSign}
            description="Balanço de receitas e despesas"
          />
        </div>
      ) : (
        <div className="grid gap-4">
            <WelcomeBanner />
        </div>
      )}
      
      {hasTransactions && (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <OverviewChart income={totalIncome} expenses={totalExpenses} />
              <RecentTransactions />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <BudgetProgressCard budgets={budgets} totalSpent={totalExpenses} />
            <UpcomingExpensesCard transactions={transactions} />
          </div>
        </>
      )}
      <QuickAddButton />
    </div>
  );
}
