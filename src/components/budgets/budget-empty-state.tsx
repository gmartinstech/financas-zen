
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Goal } from "lucide-react";
import { Input } from "../ui/input";

type BudgetEmptyStateProps = {
    onBudgetChange: (categoryId: string, limit: number) => void;
    onSave: () => void;
};


export function BudgetEmptyState({ onBudgetChange, onSave }: BudgetEmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center">
        <CardHeader className="items-center">
            <div className="p-3 rounded-full bg-muted mb-4">
                <Goal className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle>Comece a controlar seus gastos</CardTitle>
            <CardDescription className="max-w-md">
                Você ainda não definiu um orçamento para este mês. Defina seus limites por categoria abaixo para começar a acompanhar suas finanças.
            </CardDescription>
        </CardHeader>
        <CardContent className="w-full max-w-md space-y-4">
           <p className="text-muted-foreground text-sm">
                Preencha os campos abaixo e clique em "Criar Orçamento" para começar.
           </p>
           {/* You might map over categories here to create inputs dynamically */}
           <div className="flex items-center gap-4">
                <span className="flex-1 text-left font-medium">Alimentação</span>
                <Input 
                    type="number" 
                    placeholder="Ex: 500,00" 
                    className="w-40"
                    onChange={(e) => onBudgetChange('Alimentação', Number(e.target.value))}
                />
           </div>
            <div className="flex items-center gap-4">
                <span className="flex-1 text-left font-medium">Transporte</span>
                <Input 
                    type="number" 
                    placeholder="Ex: 200,00" 
                    className="w-40"
                    onChange={(e) => onBudgetChange('Transporte', Number(e.target.value))}
                />
           </div>
           <Button onClick={onSave} className="mt-4">
                Criar Orçamento
            </Button>
        </CardContent>
    </Card>
  );
}
