const express = require('express');
const Joi = require('joi');
const Theme = require('../models/Theme');
const {
  exportTheme,
  getFileExtension,
  getFileName
} = require('../services/exportService');

const router = express.Router();

// Validation schema for export requests
const exportSchema = Joi.object({
  themeId: Joi.string().optional(),
  theme: Joi.object().optional(),
  format: Joi.string().valid('tailwind', 'css', 'json', 'shadcn').required()
}).or('themeId', 'theme');

/**
 * POST /api/export
 * Export theme in specified format
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = exportSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details
      });
    }

    const { themeId, theme: themeData, format } = value;
    let theme;

    // Get theme data
    if (themeId) {
      theme = await Theme.findById(themeId);
      if (!theme) {
        return res.status(404).json({
          success: false,
          error: 'Theme not found'
        });
      }
    } else {
      theme = themeData;
    }

    // Generate export content
    const exportContent = exportTheme(theme, format);
    const fileName = getFileName(format, theme.name);
    const fileExtension = getFileExtension(format);

    res.json({
      success: true,
      data: {
        content: exportContent,
        fileName: fileName,
        format: format,
        fileExtension: fileExtension,
        theme: {
          id: theme.id,
          name: theme.name
        }
      },
      message: `Theme exported as ${format}`
    });

  } catch (error) {
    console.error('Error exporting theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export theme',
      details: error.message
    });
  }
});

/**
 * POST /api/export/tailwind
 * Export theme as Tailwind config
 */
router.post('/tailwind', async (req, res) => {
  try {
    const { themeId, theme: themeData } = req.body;
    let theme;

    if (themeId) {
      theme = await Theme.findById(themeId);
      if (!theme) {
        return res.status(404).json({
          success: false,
          error: 'Theme not found'
        });
      }
    } else if (themeData) {
      theme = themeData;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Either themeId or theme data is required'
      });
    }

    const exportContent = exportTheme(theme, 'tailwind');
    const fileName = getFileName('tailwind', theme.name);

    res.json({
      success: true,
      data: {
        content: exportContent,
        fileName: fileName,
        format: 'tailwind',
        fileExtension: 'js'
      },
      message: 'Theme exported as Tailwind config'
    });

  } catch (error) {
    console.error('Error exporting Tailwind config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export Tailwind config'
    });
  }
});

/**
 * GET /api/export/formats
 * Get available export formats
 */
router.get('/formats', (req, res) => {
  try {
    const formats = [
      {
        key: 'tailwind',
        name: 'Tailwind Config',
        description: 'Generate tailwind.config.js file',
        fileExtension: 'js',
        fileName: 'tailwind.config.js'
      },
      {
        key: 'css',
        name: 'CSS Variables',
        description: 'Generate CSS file with theme variables',
        fileExtension: 'css',
        fileName: 'theme.css'
      },
      {
        key: 'json',
        name: 'JSON Tokens',
        description: 'Generate design tokens as JSON',
        fileExtension: 'json',
        fileName: 'tokens.json'
      }
    ];

    res.json({
      success: true,
      data: formats,
      count: formats.length
    });
  } catch (error) {
    console.error('Error fetching export formats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch export formats'
    });
  }
});

module.exports = router;
