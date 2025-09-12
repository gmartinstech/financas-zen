'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus, TrendingDown, TrendingUp, Upload } from 'lucide-react';
import Link from 'next/link';

export function QuickAddButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mb-2" align="end">
          <DropdownMenuItem asChild>
            <Link href="/transactions">
              <TrendingDown className="mr-2 h-4 w-4" />
              <span>Adicionar Despesa</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/transactions">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Adicionar Receita</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/documents">
              <Upload className="mr-2 h-4 w-4" />
              <span>Fazer Upload de Documento</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
