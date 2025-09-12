'use server';

/**
 * @fileOverview This file defines a Genkit flow for validating AI-extracted data from documents.
 *
 * It presents ambiguous interpretations to the user for validation and improves the AI's future performance.
 *
 * - validateAIExtractedData - The main function that orchestrates the validation process.
 * - ValidateAIExtractedDataInput - The input type for the validateAIExtractedData function.
 * - ValidateAIExtractedDataOutput - The output type for the validateAIExtractedData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for a single question and its answer
const QuestionAnswerSchema = z.object({
  question: z.string().describe('The question to be answered by the user.'),
  answer: z.string().describe('The user provided answer to the question.'),
});

// Define the input schema for the validateAIExtractedData flow
const ValidateAIExtractedDataInputSchema = z.object({
  documentData: z.string().describe('The document data extracted by AI.'),
  questions: z.array(QuestionAnswerSchema).describe('A list of questions and answers for disambiguation.'),
});
export type ValidateAIExtractedDataInput = z.infer<typeof ValidateAIExtractedDataInputSchema>;

// Define the output schema for the validateAIExtractedData flow
const ValidateAIExtractedDataOutputSchema = z.object({
  validatedData: z.string().describe('The validated document data after user disambiguation.'),
});
export type ValidateAIExtractedDataOutput = z.infer<typeof ValidateAIExtractedDataOutputSchema>;

// Define the tool to get clarification from the user.
const getUserClarification = ai.defineTool({
  name: 'getUserClarification',
  description: 'Presents a question to the user and gets their answer.',
  inputSchema: z.object({
    question: z.string().describe('The question to ask the user for clarification.'),
  }),
  outputSchema: z.string().describe('The user provided answer to the question.'),
}, async (input) => {
  // This is a placeholder, the actual implementation would involve
  // sending the question to the client and getting the user's response.
  // For now, we just return a canned response.
  console.log(`Asking user: ${input.question}`);
  return `User answered: ${input.question}`;
});

// Define the prompt for validating the AI-extracted data
const validateDataPrompt = ai.definePrompt({
  name: 'validateDataPrompt',
  input: { schema: ValidateAIExtractedDataInputSchema },
  output: { schema: ValidateAIExtractedDataOutputSchema },
  tools: [getUserClarification],
  prompt: `You are an expert data validator. You will validate the following data extracted from a document:

  {{{documentData}}}

  You also have access to questions which have been answered by the user:
  {{#each questions}}
  Question: {{{this.question}}}
  Answer: {{{this.answer}}}
  {{/each}}

  Based on the document data and the user's answers to the questions, validate the data and return the validated data.

  If there are still ambiguities, use the getUserClarification tool to ask the user for more information.  You don't need to ask all questions at once, just one at a time, and only if necessary.
  `, 
});

// Define the Genkit flow for validating AI-extracted data
const validateAIExtractedDataFlow = ai.defineFlow({
  name: 'validateAIExtractedDataFlow',
  inputSchema: ValidateAIExtractedDataInputSchema,
  outputSchema: ValidateAIExtractedDataOutputSchema,
}, async (input) => {
  const { output } = await validateDataPrompt(input);
  return output!;
});

/**
 * Validates AI-extracted data by presenting ambiguous interpretations to the user.
 * @param input - The input data containing the document data and questions for disambiguation.
 * @returns The validated document data.
 */
export async function validateAIExtractedData(input: ValidateAIExtractedDataInput): Promise<ValidateAIExtractedDataOutput> {
  return validateAIExtractedDataFlow(input);
}

export {ValidateAIExtractedDataInput, ValidateAIExtractedDataOutput};

