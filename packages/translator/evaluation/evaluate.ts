/**
 * Evaluation Script for AI Translator
 *
 * Run this script from the command line with:
 * npx ts-node packages/translator/evaluation/evaluate.ts
 *
 * This script loads test cases from dataset.json and evaluates the AI translator's
 * performance, tracing all operations to LangSmith for analysis.
 */

import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Translator } from '../src/index';

// Load environment variables from the package root
config({ path: path.join(__dirname, '..', '.env') });

interface TestCase {
  id: string;
  input: {
    url: string;
  };
  groundTruth: {
    itemType: string;
    title: string;
    creators?: Array<{
      creatorType: string;
      firstName?: string;
      lastName?: string;
      name?: string;
    }>;
    date?: string;
    blogTitle?: string;
    publicationTitle?: string;
    section?: string;
    abstractNote?: string;
    websiteTitle?: string;
    websiteType?: string;
    institution?: string;
  };
}

async function main() {
  // Load the dataset
  const datasetPath = path.join(__dirname, 'dataset.json');
  const datasetContent = fs.readFileSync(datasetPath, 'utf-8');
  const dataset: TestCase[] = JSON.parse(datasetContent);

  // Verify required environment variables
  const requiredEnvVars = ['OPENAI_API_KEY', 'LANGSMITH_API_KEY'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`❌ Missing required environment variable: ${envVar}`);
      process.exit(1);
    }
  }

  // Initialize the translator
  const translator = new Translator({
    ai: {
      apiKey: process.env.OPENAI_API_KEY as string,
      classificationModel: 'gpt-4o-mini',
      extractionModel: 'gpt-4o-mini',
      temperature: 0.1,
      maxTokens: 2000,
    },
  });

  console.log('🚀 Starting AI Translator Evaluation Suite\n');
  console.log(`📊 Loaded ${dataset.length} test cases\n`);

  let successCount = 0;
  let failureCount = 0;

  // Evaluate each test case
  for (const testCase of dataset) {
    console.log(`--- Testing Case: [${testCase.id}] ---`);

    try {
      // Execute translation with error handling
      const result = await translator.translate(testCase.input);

      // Log success
      console.log(`✅ Success: Generated item with title: "${result.item.title}"`);
      console.log(`   Item type: ${result.item.itemType}`);

      // Optional: You could add more detailed validation here
      // comparing result against groundTruth

      successCount++;
    } catch (error) {
      // Log failure
      console.error(`❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failureCount++;
    }

    console.log(''); // Empty line for readability
  }

  // Summary
  console.log('📈 Evaluation Summary:');
  console.log(`   Total cases: ${dataset.length}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   Success rate: ${((successCount / dataset.length) * 100).toFixed(1)}%`);

  console.log('\n✨ Evaluation complete. Check LangSmith for detailed traces.');
}

// Run the evaluation
main().catch(error => {
  console.error('Fatal error during evaluation:', error);
  process.exit(1);
});
