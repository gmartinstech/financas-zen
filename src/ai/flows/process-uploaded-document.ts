'use server';

/**
 * @fileOverview Implements the Genkit flow for processing uploaded financial documents.
 *
 * - processUploadedDocument - A function that handles the document processing flow.
 * - ProcessUploadedDocumentInput - The input type for the processUploadedDocument function.
 * - ProcessUploadedDocumentOutput - The return type for the processUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessUploadedDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A financial document (receipt, invoice) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProcessUploadedDocumentInput = z.infer<typeof ProcessUploadedDocumentInputSchema>;

const TransactionSchema = z.object({
  date: z.string().describe('The date of the transaction (YYYY-MM-DD).'),
  amount: z.number().describe('The amount of the transaction.'),
  category: z.string().describe('The category of the transaction.'),
  description: z.string().describe('A description of the transaction.'),
});

const ProcessUploadedDocumentOutputSchema = z.object({
  transactions: z.array(TransactionSchema).describe('The extracted transaction data.'),
  requiresAction: z.boolean().describe('Whether the LLM requires a question to be answered by the user.'),
  questions: z.array(z.string()).describe('An array of questions that the user needs to answer.'),
});
export type ProcessUploadedDocumentOutput = z.infer<typeof ProcessUploadedDocumentOutputSchema>;

export async function processUploadedDocument(input: ProcessUploadedDocumentInput): Promise<ProcessUploadedDocumentOutput> {
  return processUploadedDocumentFlow(input);
}

const extractTransactionData = ai.defineTool({
  name: 'extractTransactionData',
  description: 'Extracts transaction data (date, amount, category, description) from a financial document.',
  inputSchema: z.object({
    documentDataUri: z
      .string()
      .describe(
        "A financial document (receipt, invoice) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
  }),
  outputSchema: z.array(TransactionSchema),
}, async (input) => {
  // TODO: Implement OCR and AI-powered extraction logic here.
  // This is a placeholder; replace with actual implementation.
  return [];
});

const prompt = ai.definePrompt({
  name: 'processUploadedDocumentPrompt',
  input: {schema: ProcessUploadedDocumentInputSchema},
  output: {schema: ProcessUploadedDocumentOutputSchema},
  tools: [extractTransactionData],
  prompt: `You are an AI assistant designed to process financial documents and extract transaction data.

  The user will provide a document, and you should use the extractTransactionData tool to extract the data.

  If the extracted data is ambiguous or incomplete, formulate questions to ask the user to clarify the information.
  Present these questions in a clear and concise manner.

  If the data is clear and complete, return the extracted transaction data. Set requiresAction to false, and questions to an empty array.

  If the data is ambiguous and requires clarification from the user, set requiresAction to true, and provide an array of questions to ask the user.

  Document: {{media url=documentDataUri}}
  `
});

const processUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'processUploadedDocumentFlow',
    inputSchema: ProcessUploadedDocumentInputSchema,
    outputSchema: ProcessUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
