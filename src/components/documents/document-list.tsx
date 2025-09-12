
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Trash2, Loader } from "lucide-react";
import Image from 'next/image';
import { type Document } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type DocumentListProps = {
  documents: Document[];
};

const statusMap = {
  processing: { label: "Processando", variant: "secondary", icon: <Loader className="h-3 w-3 animate-spin" /> },
  'awaiting-action': { label: "Aguardando Ação", variant: "destructive", icon: null },
  completed: { label: "Concluído", variant: "default", className: "bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30 border-none" },
  failed: { label: "Falha", variant: "destructive", className: "bg-red-500/20 text-red-700 hover:bg-red-500/30 border-none" },
};

export function DocumentList({ documents }: DocumentListProps) {

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic
    console.log("Delete document", id);
  };
  
  const handleView = (id: string) => {
    // TODO: Implement view logic (navigate to details page)
    console.log("View document", id);
  };


  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Prévia</TableHead>
            <TableHead>Nome do Arquivo</TableHead>
            <TableHead>Data de Upload</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[64px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => {
            const statusInfo = statusMap[doc.status];
            return (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                    {doc.thumbnailUrl && (
                      <Image
                        src={doc.thumbnailUrl}
                        alt={`Thumbnail of ${doc.filename}`}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                        data-ai-hint="document thumbnail"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{doc.filename}</TableCell>
                <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true, locale: ptBR })}
                </TableCell>
                <TableCell>
                  <Badge variant={statusInfo.variant as any} className={cn("gap-1", statusInfo.className)}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(doc.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(doc.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
