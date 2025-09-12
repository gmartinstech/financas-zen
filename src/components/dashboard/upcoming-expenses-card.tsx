"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Transaction } from "@/lib/data";
import { Badge } from "../ui/badge";

type UpcomingExpensesCardProps = {
  transactions: Transaction[];
};

export function UpcomingExpensesCard({ transactions }: UpcomingExpensesCardProps) {
  const upcoming = transactions
    .filter((t) => t.status === "pending" || t.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Vencimentos</CardTitle>
        <CardDescription>
          Suas próximas contas e despesas agendadas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcoming.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.description}</div>
                    <Badge variant={transaction.status === 'pending' ? 'destructive' : 'secondary'} className="text-xs">
                      {transaction.status === 'pending' ? 'Pendente' : 'Agendado'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum vencimento próximo.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
