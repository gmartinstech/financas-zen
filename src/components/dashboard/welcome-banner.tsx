import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle className="font-headline">Bem-vindo ao FinançasZen!</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Vamos começar a organizar suas finanças. Adicione sua primeira transação para ver a mágica acontecer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Primeira Despesa
        </Button>
      </CardContent>
    </Card>
  );
}
