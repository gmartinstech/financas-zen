
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { type Budget, type Category } from "@/lib/data";

type BudgetCategoryListProps = {
  budgets: Budget[];
  categories: Category[];
  onBudgetChange: (categoryId: string, limit: number) => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

export function BudgetCategoryList({ budgets, categories, onBudgetChange }: BudgetCategoryListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orçamentos por Categoria</CardTitle>
        <CardDescription>Defina o limite de gastos para cada categoria.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map(category => {
            const budget = budgets.find(b => b.category === category.name) || { spent: 0, limit: 0 };
            const progress = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;

            return (
              <div key={category.id} className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <category.icon className="h-5 w-5" />
                    </div>
                  <span className="font-medium">{category.name}</span>
                </div>

                <div className="col-span-1 md:col-span-2 grid grid-cols-1 items-center gap-4 md:grid-cols-5">
                    <div className="md:col-span-3">
                        <div className="mb-1 flex justify-between text-sm text-muted-foreground">
                            <span>{formatCurrency(budget.spent)}</span>
                            <span className="text-foreground">{formatCurrency(budget.limit)}</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                    <div className="relative md:col-span-2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                        <Input
                            type="number"
                            placeholder="0,00"
                            value={budget.limit || ''}
                            onChange={(e) => onBudgetChange(category.name, Number(e.target.value))}
                            className="pl-8 text-right"
                        />
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
