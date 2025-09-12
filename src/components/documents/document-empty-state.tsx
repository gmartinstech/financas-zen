
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { useCallback } from "react";
import { DocumentUploadDialog } from "./document-upload-dialog";

type DocumentEmptyStateProps = {
    onUpload: (files: File[]) => void;
};

export function DocumentEmptyState({ onUpload }: DocumentEmptyStateProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    }
  });

  return (
    <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Card className={`flex flex-col items-center justify-center p-12 border-2 border-dashed h-96 transition-colors ${isDragActive ? 'border-primary bg-primary/10' : ''}`}>
            <CardHeader className="text-center items-center">
                <div className="p-3 rounded-full bg-muted mb-4">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle>Nenhum documento encontrado</CardTitle>
                <CardDescription className="max-w-sm">
                    Envie seus boletos e recibos para começar a automatizar suas finanças. Arraste e solte os arquivos aqui.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DocumentUploadDialog onUpload={onUpload} />
            </CardContent>
        </Card>
    </div>
  );
}
