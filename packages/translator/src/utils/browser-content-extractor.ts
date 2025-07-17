/**
 * Browser-compatible content extraction utilities for Electron renderer environments
 */

import DOMPurify from 'dompurify';
import * as pdfjsLib from 'pdfjs-dist';

// Ensure browser DOM types are available
/// <reference lib="dom" />
import {
  ContentExtractionError,
  ExtractedContent,
  PdfParseError,
  TranslatorConfig,
  UrlFetchError,
} from '../types';

/**
 * Browser-compatible content extractor for handling URL and PDF content extraction
 * Designed specifically for Electron renderer environments like Obsidian plugins
 */
export class BrowserContentExtractor {
  private readonly config: Required<TranslatorConfig>;

  constructor(config: TranslatorConfig = {}) {
    this.config = {
      timeout: config.timeout ?? 30000,
      maxRetries: config.maxRetries ?? 3,
      userAgent: config.userAgent ?? 'Zotero-AI-Translator/1.0.0',
      maxContentLength: config.maxContentLength ?? 50000,
      debug: config.debug ?? false,
      ai: config.ai,
    } as Required<TranslatorConfig>;

    // Configure PDF.js worker for browser environments
    this.configurePdfJsWorker();
  }

  /**
   * Configure PDF.js worker for browser/Electron environments
   */
  private configurePdfJsWorker(): void {
    // Try to set the worker source for PDF.js
    // In Electron environments, we can use the CDN or bundled worker
    if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      try {
        // Option 1: Use CDN (fallback for browser environments)
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        // Option 2: For bundled environments, you might want to use a local path
        // pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.js';
      } catch (error) {
        if (this.config.debug) {
          console.warn('[BrowserContentExtractor] Failed to set PDF.js worker source:', error);
        }
      }
    }
  }

  /**
   * Extract content from a URL using browser-compatible fetch
   */
  async extractFromUrl(url: string): Promise<ExtractedContent> {
    if (this.config.debug) {
      console.log(`[BrowserContentExtractor] Extracting content from URL: ${url}`);
    }

    try {
      const response = await this.fetchWithRetry(url);
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/pdf')) {
        const arrayBuffer = await response.arrayBuffer();
        return this.extractFromPdf(arrayBuffer, url);
      } else if (contentType.includes('text/html')) {
        const html = await response.text();
        return this.extractFromHtml(html, url);
      } else {
        // Fallback for other content types
        const text = await response.text();
        return this.extractFromText(text, url, contentType);
      }
    } catch (error) {
      throw new UrlFetchError(
        `Failed to fetch content from URL: ${url}`,
        500,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Extract content from source text
   */
  async extractFromSourceText(sourceText: string): Promise<ExtractedContent> {
    if (this.config.debug) {
      console.log(
        `[BrowserContentExtractor] Extracting content from source text (${sourceText.length} chars)`,
      );
    }

    // Validate that we have meaningful content to extract
    if (!sourceText || sourceText.trim().length === 0) {
      throw new ContentExtractionError(
        'Cannot extract content from empty source text',
        new Error('Source text is empty or contains only whitespace'),
      );
    }

    try {
      // Try to parse as HTML first
      if (sourceText.trim().startsWith('<')) {
        return this.extractFromHtml(sourceText);
      }

      // Otherwise treat as plain text
      return this.extractFromText(sourceText);
    } catch (error) {
      throw new ContentExtractionError(
        'Failed to extract content from source text',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Fetch URL with retry logic using browser-compatible fetch API
   */
  private async fetchWithRetry(url: string, attempt = 1): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': this.config.userAgent,
          Accept: 'text/html,application/xhtml+xml,application/xml,application/pdf;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
        },
        mode: 'cors', // Important for cross-origin requests in browser environments
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new UrlFetchError(`HTTP ${response.status}: ${response.statusText}`, response.status);
      }

      return response;
    } catch (error) {
      if (attempt < this.config.maxRetries) {
        if (this.config.debug) {
          console.log(
            `[BrowserContentExtractor] Retry ${attempt}/${this.config.maxRetries} for URL: ${url}`,
          );
        }
        await this.delay(1000 * attempt); // Exponential backoff
        return this.fetchWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Extract content from HTML using browser-compatible DOMParser and DOMPurify
   */
  private extractFromHtml(html: string, url?: string): ExtractedContent {
    try {
      // Use DOMPurify to clean the HTML first
      const cleanHtml = DOMPurify.sanitize(html, {
        WHOLE_DOCUMENT: false,
        ADD_TAGS: ['title', 'meta'],
        ADD_ATTR: ['name', 'property', 'content', 'lang'],
        KEEP_CONTENT: true,
      });

      // Use browser's DOMParser instead of JSDOM
      const parser = new DOMParser();
      const document = parser.parseFromString(cleanHtml, 'text/html');

      // Extract main content using a simplified readability algorithm
      const content = this.extractReadableContent(document);

      let text = content;

      // Truncate if too long
      if (text.length > this.config.maxContentLength) {
        text = `${text.substring(0, this.config.maxContentLength)}...`;
      }

      // Extract additional metadata
      const metadata: ExtractedContent['metadata'] = {};

      // Try to get author from meta tags
      const authorMeta =
        document.querySelector('meta[name="author"]') ||
        document.querySelector('meta[property="article:author"]');
      if (authorMeta) {
        metadata.author = authorMeta.getAttribute('content') || undefined;
      }

      // Try to get published date
      const dateMeta =
        document.querySelector('meta[property="article:published_time"]') ||
        document.querySelector('meta[name="date"]');
      if (dateMeta) {
        metadata.publishedDate = dateMeta.getAttribute('content') || undefined;
      }

      // Try to get excerpt/description
      const descMeta =
        document.querySelector('meta[name="description"]') ||
        document.querySelector('meta[property="og:description"]');
      if (descMeta) {
        metadata.excerpt = descMeta.getAttribute('content') || undefined;
      }

      // Try to get language
      const langAttr = document.documentElement.getAttribute('lang');
      if (langAttr) {
        metadata.language = langAttr;
      }

      return {
        text,
        title: this.extractTitleFromHtml(document),
        url,
        contentType: 'text/html',
        metadata,
      };
    } catch (error) {
      throw new ContentExtractionError(
        'Failed to extract content from HTML',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Extract readable content from document using simplified readability algorithm
   */
  private extractReadableContent(document: Document): string {
    // Remove script and style elements
    const scriptsAndStyles = document.querySelectorAll(
      'script, style, nav, header, footer, aside, .sidebar, .menu, .navigation',
    );
    scriptsAndStyles.forEach((el: Element) => el.remove());

    // Try to find main content areas
    const contentSelectors = [
      'main',
      'article',
      '[role="main"]',
      '.content',
      '.main-content',
      '.post-content',
      '.entry-content',
      '.article-content',
      '#content',
      '#main',
    ];

    let mainContent: Element | null = null;
    for (const selector of contentSelectors) {
      mainContent = document.querySelector(selector);
      if (mainContent) break;
    }

    // If no specific content area found, use body
    if (!mainContent) {
      mainContent = document.body || document.documentElement;
    }

    // Extract text and clean up
    let text = mainContent.textContent || '';

    // Clean up whitespace
    text = text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n') // Preserve paragraph breaks
      .trim();

    return text;
  }

  /**
   * Extract content from PDF using PDF.js
   */
  private async extractFromPdf(buffer: ArrayBuffer, url?: string): Promise<ExtractedContent> {
    try {
      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const numPages = pdf.numPages;

      if (this.config.debug) {
        console.log(`[BrowserContentExtractor] PDF has ${numPages} pages`);
      }

      // Extract text from all pages
      const pageTexts: string[] = [];
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        // Extract text from items, preserving some structure
        let pageText = '';
        let lastY = -1;

        for (const item of textContent.items) {
          if ('str' in item) {
            // Check if we need a line break (different Y position)
            if (lastY !== -1 && Math.abs(lastY - item.transform[5]) > 5) {
              pageText += '\n';
            }
            pageText += item.str;
            lastY = item.transform[5];
          }
        }

        pageTexts.push(pageText.trim());
      }

      let text = pageTexts.join('\n\n');

      // Truncate if too long
      if (text.length > this.config.maxContentLength) {
        text = `${text.substring(0, this.config.maxContentLength)}...`;
      }

      // Try to extract PDF metadata
      const metadata: ExtractedContent['metadata'] = {};
      try {
        const pdfMetadata = await pdf.getMetadata();
        if (pdfMetadata.info) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const info = pdfMetadata.info as any; // PDF.js metadata has dynamic properties
          if (info.Author) {
            metadata.author = info.Author;
          }
          if (info.CreationDate) {
            metadata.publishedDate = info.CreationDate;
          }
          if (info.Subject) {
            metadata.excerpt = info.Subject;
          }
        }
      } catch (metadataError) {
        if (this.config.debug) {
          console.warn('[BrowserContentExtractor] Failed to extract PDF metadata:', metadataError);
        }
      }

      return {
        text,
        title: await this.extractPdfTitle(pdf),
        url,
        contentType: 'application/pdf',
        metadata,
      };
    } catch (error) {
      throw new PdfParseError(
        'Failed to parse PDF content',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Extract title from PDF metadata or first page
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async extractPdfTitle(pdf: any): Promise<string | undefined> {
    try {
      // Try to get title from metadata first
      const metadata = await pdf.getMetadata();
      if (metadata.info?.Title) {
        return metadata.info.Title;
      }

      // Fallback: try to extract title from first few lines of first page
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();

      if (textContent.items.length > 0) {
        // Get the first few lines of text
        const firstLines = textContent.items
          .slice(0, 5)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((item: any) => 'str' in item)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => item.str)
          .join(' ')
          .trim();

        // Use first line if it looks like a title (not too long, not empty)
        if (firstLines.length > 0 && firstLines.length < 200) {
          return firstLines;
        }
      }
    } catch (error) {
      // Ignore errors and return undefined
    }

    return undefined;
  }

  /**
   * Extract content from plain text
   */
  private extractFromText(text: string, url?: string, contentType?: string): ExtractedContent {
    try {
      // Truncate if too long
      let processedText = text;
      if (processedText.length > this.config.maxContentLength) {
        processedText = `${processedText.substring(0, this.config.maxContentLength)}...`;
      }

      // Try to extract a title from the first line if it looks like a title
      let title: string | undefined;
      const lines = processedText.split('\n');
      if (lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine.length > 0 && firstLine.length < 200) {
          title = firstLine;
        }
      }

      return {
        text: processedText,
        title,
        url,
        contentType: contentType || 'text/plain',
        metadata: {},
      };
    } catch (error) {
      throw new ContentExtractionError(
        'Failed to extract content from text',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }

  /**
   * Extract title from HTML document using browser DOM
   */
  private extractTitleFromHtml(document: Document): string | undefined {
    // Try title tag first
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.textContent) {
      return titleElement.textContent.trim();
    }

    // Try OpenGraph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const content = ogTitle.getAttribute('content');
      if (content) return content.trim();
    }

    // Try first h1
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent) {
      return h1.textContent.trim();
    }

    return undefined;
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
