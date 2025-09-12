
"use client"

import { PageHeader } from '@/components/shared/page-header';
import { CategoryList } from '@/components/settings/category-list';
import { useCategories } from '@/hooks/use-categories';
import { GeneralSettingsForm } from '@/components/settings/general-settings-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
    const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
    const { toast } = useToast();

    const handleSaveSettings = (values: { currency: string, locale: string }) => {
        console.log("Saving general settings:", values);
        toast({
            title: "Preferências Salvas",
            description: "Suas configurações gerais foram atualizadas.",
        });
    };

    return (
        <>
            <PageHeader title="Preferências" description="Ajuste a aplicação para as suas necessidades.">
            </PageHeader>
            <main className="flex-1 p-4 pt-6 md:p-8">
                <div className="grid gap-6">
                    <GeneralSettingsForm onSave={handleSaveSettings} />
                    <CategoryList 
                        categories={categories}
                        onAddCategory={addCategory}
                        onUpdateCategory={updateCategory}
                        onDeleteCategory={deleteCategory}
                    />
                </div>
            </main>
        </>
    );
}
