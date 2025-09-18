const request = require('supertest');
const app = require('../src/server');

describe('Theme API', () => {
  let themeId;

  // Test creating a theme
  test('POST /api/themes - Create new theme', async () => {
    const themeData = {
      name: 'Test Theme',
      description: 'A test theme for backend verification',
      colors: {
        primary: { 500: '#0ea5e9', foreground: '#ffffff' },
        secondary: { 500: '#64748b', foreground: '#ffffff' }
      }
    };

    const response = await request(app)
      .post('/api/themes')
      .send(themeData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(themeData.name);
    expect(response.body.data.id).toBeDefined();

    themeId = response.body.data.id;
  });

  // Test getting all themes
  test('GET /api/themes - Get all themes', async () => {
    const response = await request(app)
      .get('/api/themes')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.count).toBeGreaterThan(0);
  });

  // Test getting theme by ID
  test('GET /api/themes/:id - Get theme by ID', async () => {
    const response = await request(app)
      .get(`/api/themes/${themeId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(themeId);
  });

  // Test updating theme
  test('PUT /api/themes/:id - Update theme', async () => {
    const updateData = {
      name: 'Updated Test Theme',
      description: 'Updated description'
    };

    const response = await request(app)
      .put(`/api/themes/${themeId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(updateData.name);
  });

  // Test getting default theme template
  test('GET /api/themes/default/template - Get default theme', async () => {
    const response = await request(app)
      .get('/api/themes/default/template')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.colors).toBeDefined();
    expect(response.body.data.typography).toBeDefined();
  });

  // Test deleting theme (run last)
  test('DELETE /api/themes/:id - Delete theme', async () => {
    const response = await request(app)
      .delete(`/api/themes/${themeId}`)
      .expect(200);

    expect(response.body.success).toBe(true);
  });

  // Test 404 for non-existent theme
  test('GET /api/themes/:id - 404 for non-existent theme', async () => {
    const response = await request(app)
      .get('/api/themes/non-existent-id')
      .expect(404);

    expect(response.body.success).toBe(false);
  });
});
