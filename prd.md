# Product Requirements Document: Zotero AI Translator Suite v1.0

* **Document Version:** 1.0
* **Status:** Proposed
* **Date:** July 15, 2025
* **Author:** Enrique Velasco

---

## **1.0 Introduction & Vision**

**1.1. Vision:** To empower researchers, students, and academics by providing a robust, reliable, and intelligent toolset that bridges the gap between unstructured web content and the structured Zotero ecosystem. This project aims to drastically reduce the manual effort of citation management, allowing users to focus on what matters most: their research and learning.

**1.2. Problem Statement:** Manually creating accurate Zotero entries from web pages, articles, and documents is a time-consuming and error-prone process. While Zotero's connectors and translators are powerful, they don't cover all sources, and there is no programmatic way for developers to easily "translate" a piece of arbitrary text or a URL into a high-quality, structured Zotero item.

**1.3. Proposed Solution:** We will develop a suite of TypeScript packages within a monorepo. The core of this suite will be the `ai-translator` package, a sophisticated tool that uses modern AI models to intelligently parse web or text content and translate it into a validated, schema-compliant Zotero item.

## **2.0 Project Goals & Scope (Version 1.0)**

### **2.1. Goals**

* **Accuracy:** The AI translation should produce highly accurate and correctly categorized Zotero items.
* **Reliability:** The packages must be thoroughly tested and architecturally sound.
* **Type Safety:** The entire suite must be strictly typed to provide a world-class developer experience.
* **Maintainability:** The project will use a monorepo and centralized types to ensure long-term maintainability and easy updates.

### **2.2. In-Scope for Version 1.0 (MVP)**

* The full monorepo setup using Turborepo.
* The `zotero-schema-types` package for centralized Zod schemas and types.
* The refactoring of the existing `zotero-client` to use the new types package.
* The initial version of the `ai-translator` package with the following core features:
  * Ability to process a **single input** at a time (URL or raw text).
  * Support for parsing standard HTML web pages and PDFs from a URL.
  * The complete AI pipeline (Classification & Extraction).
  * Comprehensive logging and error handling for a single-item process.

### **2.3. Out-of-Scope for Version 1.0**

* **Batch Processing:** The ability to process an array of multiple inputs in a single call is deferred.
* **Caching:** Caching results to avoid re-processing identical inputs is deferred.
* **Advanced Resource Management:** Streaming for large files is deferred.
* **Advanced LLM Logic:** Complex routing between different LLM providers based on content analysis is deferred.

---

## **3.0 Core Architecture & Technical Mandates**

### **3.1. Monorepo Structure**

The project MUST be built as a monorepo managed by **Turborepo**. Package names should be scoped (e.g., `@zotero-suite/`).

### **3.2. Language and Build Process**

* All packages MUST be written in **TypeScript**.
* The final build output for all packages MUST be **CommonJS (CJS)** to ensure maximum compatibility with Node.js and Electron-based environments (e.g., Obsidian).
* Each package's `tsconfig.json` MUST be configured with `"module": "CommonJS"` and, critically, **`"declaration": true"`** to generate `.d.ts` type definition files.

### **3.3. Testing**

Each package MUST have its own comprehensive unit test suite using the most appropriate testing framework. All external services (HTTP requests, file system access, LLM API calls) MUST be mocked to ensure tests are fast, reliable, and isolated.

## **4.0 Package Definitions**

The monorepo will contain the following packages within a `/packages` directory:

| Package Name                      | Description                                                                                                                                                             | Key Dependencies         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `@zotero-suite/schema-types`        | **The foundational package.** Ingests the official Zotero `schema.json` to generate and export Zod schemas and derived TypeScript types for the entire suite.              | `zod`                    |
| `@zotero-suite/client`            | **The Zotero API Client.** The existing client, which will be refactored to consume all its types directly from the `@zotero-suite/schema-types` package.                    | `@zotero-suite/schema-types` |
| `@zotero-suite/ai-translator`        | **The AI Translator (v1.0).** The core product of this PRD. Translates unstructured content from URLs or raw text into structured, validated Zotero items using the types directly from the `@zotero-suite/schema-types` so that the results can be easily used by the `@zotero-suite/client package`.                   | `langchain`, `axios`, `jsdom`, `@mozilla/readability`, `pdf-parse`, `@zotero-suite/schema-types` |

## **5.0 Detailed Functional Requirements for `ai-translator` (v1.0)**

### **5.1. Public API & Interface**

The package will export a primary class, `Translator`.

* **Constructor:** `new Translator(options: TranslatorOptions)`
  * `TranslatorOptions`: An object to configure the instance, primarily for providing the necessary LLM API keys. Example: `{ auth: { openaiApiKey: '...' } }`.

* **Main Method:** `async translate(input: TranslationInput, options?: TranslationOptions): Promise<ZoteroItem>`
  * `TranslationInput`: A discriminated union to specify the source. Must be one of:
    * `{ url: string }`
    * `{ sourceText: string }`
  * `TranslationOptions`: An object for per-call configuration.
    * `fileSizeLimitMb?: number`: A limit for fetching files like PDFs.
  * **Return Value:** A `Promise` that resolves to a single, validated Zotero Item object whose type comes from the `@zotero-suite/schema-types` package.
  * **Error Handling:** The promise will reject with a custom, informative error (e.g., `FetchError`, `ParsingError`, `TranslationError`) upon failure.

### **5.2. Core Translation Pipeline**

The `translate` method will execute the following logical flow:

1. **Input Validation:** Check if the `input` object contains `url` or `sourceText`.
2. **Content Ingestion (Conditional Path):**
    * **IF `input.url` is provided:**
        a. Fetch the URL using `axios`. Enforce `fileSizeLimitMb`.
        b. Check the `Content-Type` header.
        c. If HTML, parse with `jsdom` and clean with `@mozilla/readability`.
        d. If PDF, parse with `pdf-parse`.
        e. The resulting string is now the `processedText`.
    * **IF `input.sourceText` is provided:**
        a. **SKIP** all fetching and parsing steps.
        b. The `sourceText` is now the `processedText`.
3. **AI Translation (Common Path):**
    * **Step 1: Classification.** Send the `processedText` to an LLM via **LangChain.js**. The prompt will ask the model to choose the single most appropriate Zotero item type from a list dynamically populated from the schemas in `@zotero-suite/schema-types`.
    * **Step 2: Extraction.** Use the item type from the previous step to make a second LLM call. This call MUST use a **LangChain Structured Output Parser**. The schema for this parser will be generated *at runtime* from the corresponding Zod schema imported from `@zotero-suite/schema-types`.
4. **Validation & Formatting:**
    * Take the structured JSON response from the LLM.
    * Use the corresponding Zod schema's `.safeParse()` method to validate the data. If validation fails, throw a `TranslationError`.
    * Return the valid Zotero item.

### **5.3. AI Logic & Prompting Rules**

* **Field Requirements:** The extraction prompt must instruct the LLM on how to handle missing data based on the Zod schema's definition of optional vs. required fields.
* **Creator Roles:** The prompt should instruct the LLM to detect specific creator roles (e.g., "author," "editor," "director"). If a role is ambiguous, it must default to the generic "creator" type.

## **6.0 Success Criteria & Acceptance Tests**

### **Version 1.0 will be considered complete and ready for release when:**

1. A user can successfully install and use the `@zotero-suite/translator` package in a standard Node.js project.
2. The `translate({ url: '...' })` method correctly translates a public blog post into a `blogPost` Zotero item.
3. The `translate({ url: '...' })` method correctly translates a public PDF research paper into a `journalArticle` Zotero item.
4. The `translate({ sourceText: '...' })` method correctly translates a supplied string of text into an appropriate Zotero item, successfully bypassing the fetch/parse logic.
5. Attempting to translate an invalid URL or malformed data results in a predictable, descriptive error being thrown.
6. All packages in the monorepo have a unit test coverage of **at least 90%**.
