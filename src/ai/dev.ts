import { config } from 'dotenv';
config();

import '@/ai/flows/process-uploaded-document.ts';
import '@/ai/flows/validate-ai-extracted-data.ts';