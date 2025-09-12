
"use client";

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Category } from '@/lib/data';
import { availableIcons } from '@/lib/available-icons';

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  iconName: z.string({ required_error: "Por favor, selecione um ícone." }),
  type: z.enum(['income', 'expense'], { required_error: "Por favor, selecione um tipo." }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: { name: string; iconName: keyof typeof availableIcons; type: 'income' | 'expense' }) => void;
  onClose: () => void;
  category: Omit<Category, 'icon'> | null;
};

export function CategoryDialog({ open, onOpenChange, onSave, onClose, category }: CategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      iconName: undefined,
      type: 'expense',
    },
  });

  React.useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        iconName: category.iconName,
        type: category.type,
      });
    } else {
      form.reset({
        name: '',
        iconName: undefined,
        type: 'expense',
      });
    }
  }, [category, form, open]);

  const handleSubmit = (values: CategoryFormValues) => {
    onSave({
        name: values.name,
        iconName: values.iconName as keyof typeof availableIcons,
        type: values.type,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          <DialogDescription>
            {category ? 'Altere os detalhes da sua categoria.' : 'Crie uma nova categoria para suas transações.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Educação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="expense">Despesa</SelectItem>
                        <SelectItem value="income">Receita</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um ícone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-72">
                        <div className="grid grid-cols-4 gap-2 p-2">
                        {Object.entries(availableIcons).map(([name, Icon]) => (
                          <SelectItem key={name} value={name}>
                            <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5" />
                                <span className="sr-only">{name}</span>
                            </div>
                          </SelectItem>
                        ))}
                        </div>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
