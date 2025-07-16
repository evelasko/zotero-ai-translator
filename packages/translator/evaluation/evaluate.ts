/**
 * Evaluation Script for AI Translator
 *
 * Run this script from the command line with:
 * npx ts-node packages/translator/evaluation/evaluate.ts
 *
 * This script loads test cases from dataset.json and evaluates the AI translator's
 * performance across multiple AI providers, tracing all operations to LangSmith for analysis.
 */

import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Translator } from '../src/index';
import { AIProviderConfig } from '../src/types';

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

interface EvaluationResult {
  provider: string;
  successCount: number;
  failureCount: number;
  results: Array<{
    testCase: string;
    success: boolean;
    title?: string;
    itemType?: string;
    error?: string;
  }>;
}

function getAvailableProviders(): AIProviderConfig[] {
  const providers: AIProviderConfig[] = [];

  // OpenAI Provider
  if (process.env.OPENAI_API_KEY) {
    providers.push({
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      classificationModel: 'gpt-4o-mini',
      extractionModel: 'gpt-4o-mini',
      temperature: 0.1,
      maxTokens: 2000,
    });
  }

  // Anthropic Provider
  if (process.env.ANTHROPIC_API_KEY) {
    providers.push({
      provider: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY,
      classificationModel: 'claude-3-haiku-20240307',
      extractionModel: 'claude-3-5-sonnet-20241022',
      temperature: 0.1,
      maxTokens: 2000,
    });
  }

  // VertexAI Provider
  if (process.env.GOOGLE_PROJECT_ID) {
    providers.push({
      provider: 'vertexai',
      projectId: process.env.GOOGLE_PROJECT_ID,
      location: process.env.GOOGLE_LOCATION || 'us-central1',
      classificationModel: 'gemini-1.5-flash-002',
      extractionModel: 'gemini-1.5-pro-002',
      temperature: 0.1,
      maxTokens: 2000,
    });
  }

  // Ollama Provider (local)
  if (process.env.OLLAMA_BASE_URL) {
    providers.push({
      provider: 'ollama',
      baseUrl: process.env.OLLAMA_BASE_URL,
      classificationModel: 'llama3.1:8b',
      extractionModel: 'llama3.1:70b',
      temperature: 0.1,
      maxTokens: 2000,
    });
  }

  return providers;
}

async function evaluateProvider(
  providerConfig: AIProviderConfig,
  dataset: TestCase[],
): Promise<EvaluationResult> {
  console.log(`\n🔄 Testing ${providerConfig.provider.toUpperCase()} provider...`);

  const translator = new Translator({
    ai: providerConfig,
    timeout: 30000, // Longer timeout for evaluation
    maxRetries: 2,
    debug: false,
  });

  const result: EvaluationResult = {
    provider: providerConfig.provider,
    successCount: 0,
    failureCount: 0,
    results: [],
  };

  for (const testCase of dataset) {
    console.log(`  Testing: [${testCase.id}]`);

    try {
      const translationResult = await translator.translate(testCase.input);

      console.log(
        `    ✅ Success: "${translationResult.item.title}" (${translationResult.item.itemType})`,
      );

      result.successCount++;
      result.results.push({
        testCase: testCase.id,
        success: true,
        title: translationResult.item.title,
        itemType: translationResult.item.itemType,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`    ❌ Failed: ${errorMessage}`);

      result.failureCount++;
      result.results.push({
        testCase: testCase.id,
        success: false,
        error: errorMessage,
      });
    }
  }

  return result;
}

async function main() {
  // Load the dataset
  const datasetPath = path.join(__dirname, 'dataset.json');
  const datasetContent = fs.readFileSync(datasetPath, 'utf-8');
  const dataset: TestCase[] = JSON.parse(datasetContent);

  console.log('🚀 Starting Multi-Provider AI Translator Evaluation Suite\n');
  console.log(`📊 Loaded ${dataset.length} test cases\n`);

  // Get available providers
  const availableProviders = getAvailableProviders();

  if (availableProviders.length === 0) {
    console.error('❌ No AI providers configured. Please set up environment variables:');
    console.error('   - OPENAI_API_KEY (for OpenAI)');
    console.error('   - ANTHROPIC_API_KEY (for Anthropic)');
    console.error('   - GOOGLE_PROJECT_ID + GOOGLE_APPLICATION_CREDENTIALS (for VertexAI)');
    console.error('   - OLLAMA_BASE_URL (for local Ollama)');
    console.error('   - LANGSMITH_API_KEY (for tracing - optional)');
    process.exit(1);
  }

  console.log(`🔧 Found ${availableProviders.length} configured provider(s):`);
  availableProviders.forEach(provider => {
    console.log(`   - ${provider.provider.toUpperCase()}`);
  });

  // Evaluate each provider
  const allResults: EvaluationResult[] = [];

  for (const providerConfig of availableProviders) {
    try {
      const result = await evaluateProvider(providerConfig, dataset);
      allResults.push(result);
    } catch (error) {
      console.error(`❌ Failed to evaluate ${providerConfig.provider}: ${error}`);
    }
  }

  // Summary Report
  console.log('\n📈 Evaluation Summary:');
  console.log('='.repeat(60));

  for (const result of allResults) {
    const total = result.successCount + result.failureCount;
    const successRate = total > 0 ? (result.successCount / total) * 100 : 0;

    console.log(`\n${result.provider.toUpperCase()} Results:`);
    console.log(`   Total cases: ${total}`);
    console.log(`   ✅ Successful: ${result.successCount}`);
    console.log(`   ❌ Failed: ${result.failureCount}`);
    console.log(`   Success rate: ${successRate.toFixed(1)}%`);
  }

  // Overall comparison
  if (allResults.length > 1) {
    console.log('\n🏆 Provider Comparison:');
    const sortedResults = allResults
      .map(r => ({
        provider: r.provider,
        successRate: (r.successCount / (r.successCount + r.failureCount)) * 100,
      }))
      .sort((a, b) => b.successRate - a.successRate);

    sortedResults.forEach((result, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
      console.log(
        `   ${medal} ${result.provider.toUpperCase()}: ${result.successRate.toFixed(1)}%`,
      );
    });
  }

  console.log('\n✨ Evaluation complete. Check LangSmith for detailed traces.');
}

// Run the evaluation
main().catch(error => {
  console.error('Fatal error during evaluation:', error);
  process.exit(1);
});
