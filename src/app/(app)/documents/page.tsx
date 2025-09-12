
"use client";

import { PageHeader } from '@/components/shared/page-header';
import { DocumentUploadDialog } from '@/components/documents/document-upload-dialog';
import { DocumentList } from '@/components/documents/document-list';
import { documents } from '@/lib/data';
import { DocumentEmptyState } from '@/components/documents/document-empty-state';
import React from 'react';

export default function DocumentsPage() {
  const [documentList, setDocumentList] = React.useState(documents);

  const handleUpload = (files: File[]) => {
    const newDocuments = files.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      filename: file.name,
      uploadedAt: new Date().toISOString(),
      status: 'processing' as const,
      thumbnailUrl: 'https://picsum.photos/seed/doc-thumb/100/100',
    }));

    setDocumentList(prev => [...newDocuments, ...prev]);

    // Simulate processing time
    setTimeout(() => {
      setDocumentList(prev =>
        prev.map(doc =>
          newDocuments.some(nd => nd.id === doc.id)
            ? { ...doc, status: 'awaiting-action' }
            : doc
        )
      );
    }, 3000);
  };

  const hasDocuments = documentList.length > 0;

  return (
    <>
      <PageHeader title="Documentos" description="Faça upload de recibos e faturas para processamento automático.">
        <DocumentUploadDialog onUpload={handleUpload} />
      </PageHeader>
      <main className="flex-1 p-4 pt-6 md:p-8">
        {hasDocuments ? (
          <DocumentList documents={documentList} />
        ) : (
          <DocumentEmptyState onUpload={handleUpload} />
        )}
      </main>
    </>
  );
}
