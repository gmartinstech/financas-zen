import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { transactions } from '@/lib/data';
import { DataTable } from './data-table';
import { columns } from './columns';
import { NewTransactionSheet } from './new-transaction-sheet';

export default function TransactionsPage() {
  // TODO: Add state management for transactions (fetching, adding, deleting)
  // TODO: Implement filtering logic based on toolbar controls

  return (
    <>
      <PageHeader title="Transações" description="Gerencie suas receitas e despesas.">
        <NewTransactionSheet />
      </PageHeader>
      <main className="flex-1 p-4 pt-6 md:p-8">
        <DataTable columns={columns} data={transactions} />
      </main>
    </>
  );
}
