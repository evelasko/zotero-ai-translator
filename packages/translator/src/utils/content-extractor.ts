/**
 * Content extraction utilities for URL and PDF processing
 */

import axios, { AxiosRequestConfig } from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import pdfParse from 'pdf-parse';
import { ExtractedContent, TranslatorConfig, ContentExtractionError, UrlFetchError, PdfParseError } from '../types';

/**
 * Content extractor class for handling URL and PDF content extraction
 */
export class ContentExtractor {
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
  }

  /**
   * Extract content from a URL
   */
  async extractFromUrl(url: string): Promise<ExtractedContent> {
    if (this.config.debug) {
      console.log(`[ContentExtractor] Extracting content from URL: ${url}`);
    }

    try {
      const response = await this.fetchWithRetry(url);
      const contentType = response.headers['content-type'] || '';

      if (contentType.includes('application/pdf')) {
        return this.extractFromPdf(response.data, url);
      } else if (contentType.includes('text/html')) {
        return this.extractFromHtml(response.data, url);
      } else {
        // Fallback for other content types
        return this.extractFromText(response.data, url, contentType);
      }
    } catch (error) {
      throw new UrlFetchError(
        `Failed to fetch content from URL: ${url}`,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Extract content from source text
   */
  async extractFromSourceText(sourceText: string): Promise<ExtractedContent> {
    if (this.config.debug) {
      console.log(`[ContentExtractor] Extracting content from source text (${sourceText.length} chars)`);
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
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Fetch URL with retry logic
   */
  private async fetchWithRetry(url: string, attempt = 1): Promise<any> {
    const config: AxiosRequestConfig = {
      timeout: this.config.timeout,
      headers: {
        'User-Agent': this.config.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/pdf;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      responseType: 'arraybuffer', // Handle both text and binary content
    };

    try {
      const response = await axios.get(url, config);
      return {
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      if (attempt < this.config.maxRetries) {
        if (this.config.debug) {
          console.log(`[ContentExtractor] Retry ${attempt}/${this.config.maxRetries} for URL: ${url}`);
        }
        await this.delay(1000 * attempt); // Exponential backoff
        return this.fetchWithRetry(url, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Extract content from HTML using Readability
   */
  private extractFromHtml(html: string | Buffer, url?: string): ExtractedContent {
    try {
      const htmlString = html instanceof Buffer ? html.toString('utf-8') : html;
      const dom = new JSDOM(htmlString, { url });
      const document = dom.window.document;

      // Use Readability to extract clean content
      const reader = new Readability(document);
      const article = reader.parse();

      if (!article) {
        throw new ContentExtractionError('Failed to parse HTML content with Readability');
      }

      let text = article.textContent || '';
      
      // Truncate if too long
      if (text.length > this.config.maxContentLength) {
        text = `${text.substring(0, this.config.maxContentLength)  }...`;
      }

      // Extract additional metadata
      const metadata: ExtractedContent['metadata'] = {};
      
      // Try to get author from meta tags
      const authorMeta = document.querySelector('meta[name="author"]') || 
                        document.querySelector('meta[property="article:author"]');
      if (authorMeta) {
        metadata.author = authorMeta.getAttribute('content') || undefined;
      }

      // Try to get published date
      const dateMeta = document.querySelector('meta[property="article:published_time"]') ||
                      document.querySelector('meta[name="date"]');
      if (dateMeta) {
        metadata.publishedDate = dateMeta.getAttribute('content') || undefined;
      }

      // Try to get excerpt/description
      const descMeta = document.querySelector('meta[name="description"]') ||
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
        title: article.title || this.extractTitleFromHtml(document),
        url,
        contentType: 'text/html',
        metadata,
      };
    } catch (error) {
      throw new ContentExtractionError(
        'Failed to extract content from HTML',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Extract content from PDF buffer
   */
  private async extractFromPdf(buffer: Buffer, url?: string): Promise<ExtractedContent> {
    try {
      const data = await pdfParse(buffer);
      
      let text = data.text || '';
      
      // Truncate if too long
      if (text.length > this.config.maxContentLength) {
        text = `${text.substring(0, this.config.maxContentLength)  }...`;
      }

      // Extract metadata from PDF info
      const metadata: ExtractedContent['metadata'] = {};
      if (data.info) {
        if (data.info.Author) {
          metadata.author = data.info.Author;
        }
        if (data.info.CreationDate) {
          metadata.publishedDate = data.info.CreationDate;
        }
        if (data.info.Subject) {
          metadata.excerpt = data.info.Subject;
        }
      }

      return {
        text,
        title: data.info?.Title || undefined,
        url,
        contentType: 'application/pdf',
        metadata,
      };
    } catch (error) {
      throw new PdfParseError(
        'Failed to parse PDF content',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Extract content from plain text
   */
      private extractFromText(text: string | Buffer, url?: string, contentType?: string): ExtractedContent {
      try {
        // Ensure text is always a string
        const textContent = (text instanceof Buffer ? text.toString('utf-8') : text) as string;
        
        // Truncate if too long  
        let processedText: string = textContent;
      if (processedText.length > this.config.maxContentLength) {
        processedText = `${processedText.substring(0, this.config.maxContentLength)  }...`;
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
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Extract title from HTML document
   */
  private extractTitleFromHtml(document: any): string | undefined {
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