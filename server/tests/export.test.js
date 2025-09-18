const request = require('supertest');
const app = require('../src/server');
const { exportTheme } = require('../src/services/exportService');

describe('Export API', () => {
  const testTheme = {
    name: 'Export Test Theme',
    colors: {
      primary: { 500: '#0ea5e9', foreground: '#ffffff' },
      background: '#ffffff',
      foreground: '#09090b'
    },
    typography: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      fontSize: { base: '1rem' }
    },
    spacing: { md: '1rem' },
    radius: { md: '0.375rem' },
    shadows: { md: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
  };

  // Test export formats endpoint
  test('GET /api/export/formats - Get available formats', async () => {
    const response = await request(app)
      .get('/api/export/formats')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    // Check that required formats are available
    const formatKeys = response.body.data.map(f => f.key);
    expect(formatKeys).toContain('tailwind');
    expect(formatKeys).toContain('css');
    expect(formatKeys).toContain('json');
  });

  // Test exporting as Tailwind config
  test('POST /api/export/tailwind - Export as Tailwind config', async () => {
    const response = await request(app)
      .post('/api/export/tailwind')
      .send({ theme: testTheme })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.format).toBe('tailwind');
    expect(response.body.data.fileName).toBe('tailwind.config.js');
    expect(response.body.data.content).toContain('module.exports');
    expect(response.body.data.content).toContain('theme');
  });

  // Test generic export endpoint
  test('POST /api/export - Export with format parameter', async () => {
    const response = await request(app)
      .post('/api/export')
      .send({
        theme: testTheme,
        format: 'json'
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.format).toBe('json');
    expect(response.body.data.content).toContain('tokens');

    // Verify JSON is valid
    const parsed = JSON.parse(response.body.data.content);
    expect(parsed.tokens).toBeDefined();
    expect(parsed.tokens.colors).toBeDefined();
  });

  // Test validation error
  test('POST /api/export - Validation error without theme or themeId', async () => {
    const response = await request(app)
      .post('/api/export')
      .send({ format: 'tailwind' })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Validation error');
  });
});

describe('Export Service Unit Tests', () => {
  const testTheme = {
    name: 'Unit Test Theme',
    colors: {
      primary: { 500: '#0ea5e9', foreground: '#ffffff' },
      background: '#ffffff',
      foreground: '#09090b'
    },
    typography: {
      fontFamily: { sans: ['Inter', 'sans-serif'] }
    },
    spacing: { md: '1rem' },
    radius: { md: '0.375rem' },
    shadows: { md: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
  };

  test('Export as Tailwind config', () => {
    const result = exportTheme(testTheme, 'tailwind');
    expect(typeof result).toBe('string');
    expect(result).toContain('module.exports');
    expect(result).toContain('theme');
    expect(result).toContain('extend');
  });

  test('Export as CSS', () => {
    const result = exportTheme(testTheme, 'css');
    expect(typeof result).toBe('string');
    expect(result).toContain(':root');
    expect(result).toContain('--primary');
    expect(result).toContain('--background');
  });

  test('Export as JSON', () => {
    const result = exportTheme(testTheme, 'json');
    expect(typeof result).toBe('string');

    // Verify it's valid JSON
    const parsed = JSON.parse(result);
    expect(parsed.tokens).toBeDefined();
    expect(parsed.name).toBe(testTheme.name);
  });

  test('Export with invalid format throws error', () => {
    expect(() => {
      exportTheme(testTheme, 'invalid');
    }).toThrow('Unsupported export format: invalid');
  });
});
