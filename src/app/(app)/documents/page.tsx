import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <>
      <PageHeader title="Documentos" description="Faça upload de recibos e faturas para processamento automático.">
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Fazer Upload
        </Button>
      </PageHeader>
      <main className="flex-1 p-4 pt-6 md:p-8">
         <Card>
          <CardHeader>
            <CardTitle>Em Breve</CardTitle>
            <CardDescription>O processamento inteligente de documentos estará disponível aqui.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Implementaremos um componente de upload "arrastar e soltar", uma lista de status de processamento em tempo real e a navegação para a tela de desambiguação.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
