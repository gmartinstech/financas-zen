
"use client"

import { PageHeader } from '@/components/shared/page-header';
import { CategoryList } from '@/components/settings/category-list';
import { useCategories } from '@/hooks/use-categories';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SettingsPage() {
    const { categories, addCategory, updateCategory, deleteCategory } = useCategories();

    return (
        <>
            <PageHeader title="Preferências" description="Ajuste a aplicação para as suas necessidades." />
            <main className="flex-1 p-4 pt-6 md:p-8">
                <div className="grid gap-6">
                    <CategoryList 
                        categories={categories}
                        onAddCategory={addCategory}
                        onUpdateCategory={updateCategory}
                        onDeleteCategory={deleteCategory}
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências Gerais</CardTitle>
                            <CardDescription>Outras configurações da aplicação (em breve).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Aqui você poderá gerenciar suas preferências de moeda, fuso horário e notificações.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
