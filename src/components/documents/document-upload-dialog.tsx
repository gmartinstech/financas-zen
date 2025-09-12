
"use client";

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, UploadCloud, File, X } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { Progress } from '../ui/progress';
import { useToast } from '@/hooks/use-toast';

type DocumentUploadDialogProps = {
  onUpload: (files: File[]) => void;
};

export function DocumentUploadDialog({ onUpload }: DocumentUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    }
  });

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione ou arraste um arquivo para fazer o upload.",
      });
      return;
    }

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onUpload(files);
          setIsUploading(false);
          setFiles([]);
          setUploadProgress(0);
          setOpen(false);
          toast({
            title: "Upload Concluído",
            description: "Seus documentos estão sendo processados.",
          });
        }, 500);
      }
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Fazer Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload de Documentos</DialogTitle>
          <DialogDescription>
            Arraste e solte seus arquivos ou clique para selecionar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${isDragActive ? 'border-primary bg-primary/10' : ''}`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            {isDragActive ? (
              <p className="mt-2 text-sm text-primary">Solte os arquivos aqui...</p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Arraste e solte ou clique para selecionar</p>
            )}
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Arquivos selecionados:</h4>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-muted rounded-md text-sm">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <span className="truncate max-w-xs">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFile(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isUploading && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Enviando...</p>
              <Progress value={uploadProgress} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading}>Cancelar</Button>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Enviando..." : "Enviar Arquivos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
