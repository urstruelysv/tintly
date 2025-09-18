#!/usr/bin/env node

/**
 * Simple script to test Tintly Backend API functionality
 * Run this to verify all endpoints work correctly
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing Tintly Backend API...\n');

  try {
    // 1. Health check
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', health.data.status);

    // 2. Get default theme
    console.log('\n2. Getting default theme template...');
    const defaultTheme = await axios.get(`${BASE_URL}/api/themes/default/template`);
    console.log('✅ Default theme loaded with', Object.keys(defaultTheme.data.data).length, 'sections');

    // 3. Create a new theme
    console.log('\n3. Creating new theme...');
    const newTheme = await axios.post(`${BASE_URL}/api/themes`, {
      name: 'Test Theme from Script',
      description: 'Created by test script',
      colors: {
        primary: { 500: '#8b5cf6', foreground: '#ffffff' },
        background: '#ffffff',
        foreground: '#1f2937'
      }
    });
    console.log('✅ Theme created with ID:', newTheme.data.data.id);
    const themeId = newTheme.data.data.id;

    // 4. Get all themes
    console.log('\n4. Fetching all themes...');
    const allThemes = await axios.get(`${BASE_URL}/api/themes`);
    console.log('✅ Found', allThemes.data.count, 'themes');

    // 5. Export as Tailwind config
    console.log('\n5. Exporting as Tailwind config...');
    const tailwindExport = await axios.post(`${BASE_URL}/api/export/tailwind`, {
      themeId: themeId
    });
    console.log('✅ Tailwind config exported:', tailwindExport.data.data.fileName);

    // 6. Export as CSS
    console.log('\n6. Exporting as CSS variables...');
    const cssExport = await axios.post(`${BASE_URL}/api/export`, {
      themeId: themeId,
      format: 'css'
    });
    console.log('✅ CSS exported:', cssExport.data.data.fileName);

    // 7. Export as JSON tokens
    console.log('\n7. Exporting as JSON tokens...');
    const jsonExport = await axios.post(`${BASE_URL}/api/export`, {
      themeId: themeId,
      format: 'json'
    });
    console.log('✅ JSON tokens exported:', jsonExport.data.data.fileName);

    // 8. Update theme
    console.log('\n8. Updating theme...');
    const updatedTheme = await axios.put(`${BASE_URL}/api/themes/${themeId}`, {
      name: 'Updated Test Theme',
      description: 'Updated by test script'
    });
    console.log('✅ Theme updated:', updatedTheme.data.data.name);

    // 9. Get available export formats
    console.log('\n9. Getting export formats...');
    const formats = await axios.get(`${BASE_URL}/api/export/formats`);
    console.log('✅ Available formats:', formats.data.data.map(f => f.key).join(', '));

    // 10. Delete theme
    console.log('\n10. Cleaning up (deleting test theme)...');
    await axios.delete(`${BASE_URL}/api/themes/${themeId}`);
    console.log('✅ Theme deleted');

    console.log('\n🎉 All tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    console.error('Make sure the server is running on port 3001');
  }
}

testBackend();
