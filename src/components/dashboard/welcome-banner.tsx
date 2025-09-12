import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export function WelcomeBanner() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Bem-vindo ao FinançasZen!</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Ainda não há transações este mês. Que tal adicionar sua primeira despesa para começar a organizar suas finanças?
        </CardDescription>
      </CardHeader>
      <div className="p-6 pt-0">
        <Button asChild>
          <Link href="/transactions">Adicionar Primeira Transação</Link>
        </Button>
      </div>
    </Card>
  );
}
