/**
 * Test setup for Vitest
 */

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './__mocks__/server.js';

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});