"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { TransactionForm, TransactionFormValues } from "./transaction-form"
import { useToast } from "@/hooks/use-toast"

export function NewTransactionSheet() {
  const { toast } = useToast()

  const handleSubmit = async (values: TransactionFormValues) => {
    // TODO: Call API to create transaction
    console.log("New transaction submitted:", values)
    toast({
      title: "Transação criada",
      description: "Sua nova transação foi registrada com sucesso.",
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Nova Transação</SheetTitle>
          <SheetDescription>
            Adicione uma nova receita ou despesa à sua lista.
          </SheetDescription>
        </SheetHeader>
        <TransactionForm onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  )
}
