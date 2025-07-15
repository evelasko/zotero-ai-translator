/**
 * @zotero-suite/schema-types
 * 
 * The foundational package that ingests the official Zotero schema.json
 * to generate and export Zod schemas and derived TypeScript types.
 */

import * as fs from 'fs';
import * as path from 'path';
import { SchemaFetcher, ZoteroSchema } from './utils/schema-fetcher';
import { TypeGenerator } from './generators/type-generator';
import { ZodGenerator } from './generators/zod-generator';

// Generated types will be exported from here after generation
export * from './types';
export * from './schemas';

// Utility exports
export { SchemaFetcher, ZoteroSchema } from './utils/schema-fetcher';
export { TypeGenerator } from './generators/type-generator';
export { ZodGenerator } from './generators/zod-generator';

/**
 * Main class for schema processing and type generation
 */
export class ZoteroSchemaProcessor {
  private fetcher: SchemaFetcher;
  private outputDir: string;

  constructor(outputDir: string = __dirname) {
    this.fetcher = new SchemaFetcher();
    this.outputDir = outputDir;
  }

  /**
   * Process schema and generate types and schemas
   */
  async processSchema(): Promise<void> {
    console.log('Starting Zotero schema processing...');

    try {
      // Fetch the schema
      const schema = await this.fetcher.fetchSchema();
      
      // Generate types
      await this.generateTypes(schema);
      
      // Generate schemas
      await this.generateSchemas(schema);
      
      console.log('Schema processing completed successfully!');
    } catch (error) {
      console.error('Schema processing failed:', error);
      throw error;
    }
  }

  /**
   * Generate TypeScript types
   */
  private async generateTypes(schema: ZoteroSchema): Promise<void> {
    console.log('Generating TypeScript types...');
    
    const typeGenerator = new TypeGenerator(schema);
    const typesContent = typeGenerator.generateTypes();
    
    const typesDir = path.join(this.outputDir, 'types');
    this.ensureDirectoryExists(typesDir);
    
    const typesFile = path.join(typesDir, 'index.ts');
    fs.writeFileSync(typesFile, typesContent);
    
    console.log('TypeScript types generated successfully!');
  }

  /**
   * Generate Zod schemas
   */
  private async generateSchemas(schema: ZoteroSchema): Promise<void> {
    console.log('Generating Zod schemas...');
    
    const zodGenerator = new ZodGenerator(schema);
    const schemasContent = zodGenerator.generateSchemas();
    
    const schemasDir = path.join(this.outputDir, 'schemas');
    this.ensureDirectoryExists(schemasDir);
    
    const schemasFile = path.join(schemasDir, 'index.ts');
    fs.writeFileSync(schemasFile, schemasContent);
    
    console.log('Zod schemas generated successfully!');
  }

  /**
   * Ensure directory exists
   */
  private ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

/**
 * Default export for convenience
 */
export default ZoteroSchemaProcessor;