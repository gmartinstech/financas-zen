
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type BudgetSummaryCardProps = {
  totalBudget: number;
  totalSpent: number;
};

export function BudgetSummaryCard({ totalBudget, totalSpent }: BudgetSummaryCardProps) {
  const remaining = totalBudget - totalSpent;
  const progress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };
  
  const getProgressColor = () => {
    if (progress > 90) return "bg-red-500";
    if (progress > 70) return "bg-yellow-500";
    return "bg-primary";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Orçamento Mensal</CardTitle>
        <CardDescription>
            Acompanhe o seu progresso de gastos em relação ao seu orçamento total.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Progress value={progress} className="h-3 [&>div]:" />
             <style>{`
                .progress-bar-indicator {
                    background-color: ${getProgressColor()};
                }
            `}</style>
            <Progress value={progress} indicatorClassName={getProgressColor()} className="h-3" />
        </div>
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:text-left">
            <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Orçamento Total</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalBudget)}</p>
            </div>
             <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gasto Total</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalSpent)}</p>
            </div>
             <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Restante</p>
                <p className={cn("text-2xl font-semibold", remaining < 0 ? "text-red-600" : "text-emerald-600")}>
                    {formatCurrency(remaining)}
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
