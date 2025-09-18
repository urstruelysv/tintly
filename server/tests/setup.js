// Test setup file
const path = require('path');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_PATH = path.join(__dirname, '../data/test-themes.db');

// Extend Jest timeout for database operations
jest.setTimeout(10000);
