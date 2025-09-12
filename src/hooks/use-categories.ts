
"use client";

import { useState } from 'react';
import { categories as initialCategories, type Category } from '@/lib/data';
import * as availableIcons from '@/lib/available-icons';
import { useToast } from '@/hooks/use-toast';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const { toast } = useToast();

  const addCategory = (name: string, iconName: keyof typeof availableIcons) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      iconName,
      icon: availableIcons[iconName],
    };
    setCategories(prev => [...prev, newCategory]);
    toast({
      title: 'Categoria Adicionada',
      description: `A categoria "${name}" foi criada com sucesso.`,
    });
  };

  const updateCategory = (id: string, name: string, iconName: keyof typeof availableIcons) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, name, iconName, icon: availableIcons[iconName] } : cat
      )
    );
    toast({
      title: 'Categoria Atualizada',
      description: `A categoria "${name}" foi atualizada com sucesso.`,
    });
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(c => c.id === id);
    setCategories(prev => prev.filter(cat => cat.id !== id));
    if (categoryToDelete) {
      toast({
        title: 'Categoria Excluída',
        description: `A categoria "${categoryToDelete.name}" foi excluída.`,
        variant: 'destructive',
      });
    }
  };

  return { categories, addCategory, updateCategory, deleteCategory };
}
