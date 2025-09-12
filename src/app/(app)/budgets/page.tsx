import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function BudgetsPage() {
  return (
    <>
      <PageHeader title="Orçamentos" description="Defina e acompanhe seus limites de gastos por categoria." />
      <main className="flex-1 p-4 pt-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Em Breve</CardTitle>
            <CardDescription>A gestão de orçamentos por categoria estará disponível aqui.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Uma interface visual permitirá definir limites para cada categoria de despesa, com barras de progresso mostrando o gasto atual versus o limite.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
