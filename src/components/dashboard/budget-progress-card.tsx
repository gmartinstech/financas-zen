"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Budget } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type BudgetProgressCardProps = {
  budgets: Budget[];
  totalSpent: number;
};

export function BudgetProgressCard({ budgets, totalSpent }: BudgetProgressCardProps) {
  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const sortedBudgets = [...budgets].sort((a, b) => (b.spent / b.limit) - (a.spent / a.limit)).slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso do Orçamento Mensal</CardTitle>
        <CardDescription>
          {formatCurrency(totalSpent)} gastos de {formatCurrency(totalBudget)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={overallProgress} />
        <div className="space-y-2">
          {sortedBudgets.map((budget) => (
            <div key={budget.id} className="space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{budget.category}</span>
                <span>
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                </span>
              </div>
              <Progress value={(budget.spent / budget.limit) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
       <CardFooter className="pt-4">
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/budgets">
            Ver Orçamentos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
