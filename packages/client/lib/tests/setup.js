"use strict";
/**
 * Test setup for Vitest
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("./__mocks__/server");
// Start server before all tests
(0, vitest_1.beforeAll)(() => {
    server_1.server.listen({ onUnhandledRequest: 'warn' });
});
// Reset handlers after each test
(0, vitest_1.afterEach)(() => {
    server_1.server.resetHandlers();
});
// Close server after all tests
(0, vitest_1.afterAll)(() => {
    server_1.server.close();
});
//# sourceMappingURL=setup.js.map