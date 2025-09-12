import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title="Transações" description="Gerencie suas receitas e despesas.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 pt-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Em Breve</CardTitle>
            <CardDescription>A gestão completa de transações estará disponível aqui.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Filtros, ordenação, paginação e um formulário robusto para adicionar e editar transações, incluindo regras de recorrência, serão implementados nesta seção.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
