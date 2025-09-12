import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Preferências" description="Ajuste a aplicação para as suas necessidades." />
      <main className="flex-1 p-4 pt-6 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Em Breve</CardTitle>
            <CardDescription>A personalização de suas preferências estará disponível aqui.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Aqui você poderá gerenciar suas preferências de moeda, fuso horário e localidade, além de um CRUD completo para suas categorias financeiras pessoais.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
