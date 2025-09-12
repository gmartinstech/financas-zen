
"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Trash2, Edit, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { CategoryDialog } from './category-dialog';
import { type Category } from '@/lib/data';
import * as availableIcons from '@/lib/available-icons';
import { cn } from '@/lib/utils';

type CategoryListProps = {
  categories: Category[];
  onAddCategory: (values: { name: string, iconName: keyof typeof availableIcons, type: 'income' | 'expense' }) => void;
  onUpdateCategory: (id: string, values: { name: string, iconName: keyof typeof availableIcons, type: 'income' | 'expense' }) => void;
  onDeleteCategory: (id: string) => void;
};

export function CategoryList({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }: CategoryListProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = React.useState<Category | null>(null);

  const handleOpenDialog = (category: Category | null = null) => {
    setCategoryToEdit(category);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCategoryToEdit(null);
    setDialogOpen(false);
  };
  
  const handleSaveCategory = (values: { name: string, iconName: keyof typeof availableIcons, type: 'income' | 'expense' }) => {
    if (categoryToEdit) {
      onUpdateCategory(categoryToEdit.id, values);
    } else {
      onAddCategory(values);
    }
  };

  const openDeleteConfirm = (category: Category) => {
    setCategoryToDelete(category);
  };
  
  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Gerenciar Categorias</CardTitle>
                <CardDescription>Adicione, edite ou remova suas categorias.</CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Categoria
            </Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return(
                        <div key={category.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                                {Icon && (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-medium">{category.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={category.type === 'income' ? 'default' : 'secondary'} className={cn(
                                    category.type === 'income' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-red-500/20 text-red-700',
                                    'border-none hover:opacity-80'
                                )}>
                                    {category.type === 'income' ? 'Receita' : 'Despesa'}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Abrir menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleOpenDialog(category)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        <span>Editar</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openDeleteConfirm(category)} className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Excluir</span>
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    )
                })}
                 {categories.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">Nenhuma categoria personalizada encontrada.</p>
                )}
            </div>
        </CardContent>
      </Card>
      
      <CategoryDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveCategory}
        category={categoryToEdit}
        onClose={handleCloseDialog}
      />

       <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente a categoria "{categoryToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
