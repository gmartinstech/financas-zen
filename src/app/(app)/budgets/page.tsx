
"use client";

import * as React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { budgets as initialBudgets, transactions, categories } from '@/lib/data';
import { BudgetSummaryCard } from '@/components/budgets/budget-summary-card';
import { BudgetCategoryList } from '@/components/budgets/budget-category-list';
import { BudgetEmptyState } from '@/components/budgets/budget-empty-state';

export default function BudgetsPage() {
  const [budgets, setBudgets] = React.useState(initialBudgets);
  const [hasChanges, setHasChanges] = React.useState(false);
  const { toast } = useToast();

  const handleBudgetChange = (categoryId: string, limit: number) => {
    setBudgets(prevBudgets => {
      const existingBudget = prevBudgets.find(b => b.category === categoryId);
      if (existingBudget) {
        return prevBudgets.map(b =>
          b.category === categoryId ? { ...b, limit } : b
        );
      }
      return [...prevBudgets, { id: `bud-${categoryId}`, category: categoryId, limit, spent: 0 }];
    });
    setHasChanges(true);
  };
  
  const handleSave = () => {
    // Here you would typically make an API call to save the budgets
    console.log("Saving budgets:", budgets);
    setHasChanges(false);
    toast({
      title: "Orçamentos Salvos",
      description: "Seus limites de orçamento foram atualizados com sucesso.",
    });
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  
  const hasBudgets = budgets.some(b => b.limit > 0);

  return (
    <>
      <PageHeader title="Orçamentos" description="Defina e acompanhe seus limites de gastos por categoria.">
        <Button onClick={handleSave} disabled={!hasChanges}>
            Salvar Alterações
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 pt-6 md:p-8">
        {hasBudgets ? (
            <div className="grid gap-6">
                <BudgetSummaryCard totalBudget={totalBudget} totalSpent={totalSpent} />
                <BudgetCategoryList 
                    budgets={budgets} 
                    categories={categories.filter(c => c.name !== 'Salário' && c.name !== 'Trabalho')} 
                    onBudgetChange={handleBudgetChange} 
                />
            </div>
        ) : (
            <BudgetEmptyState onBudgetChange={handleBudgetChange} onSave={handleSave} />
        )}
      </main>
    </>
  );
}
