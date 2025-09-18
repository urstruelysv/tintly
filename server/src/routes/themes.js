const express = require('express');
const Joi = require('joi');
const Theme = require('../models/Theme');

const router = express.Router();

// Validation schemas
const createThemeSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow(''),
  colors: Joi.object().optional(),
  typography: Joi.object().optional(),
  spacing: Joi.object().optional(),
  radius: Joi.object().optional(),
  shadows: Joi.object().optional()
});

const updateThemeSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  description: Joi.string().max(500).allow('').optional(),
  colors: Joi.object().optional(),
  typography: Joi.object().optional(),
  spacing: Joi.object().optional(),
  radius: Joi.object().optional(),
  shadows: Joi.object().optional()
});

/**
 * GET /api/themes
 * Get all themes
 */
router.get('/', async (req, res) => {
  try {
    const themes = await Theme.findAll();
    res.json({
      success: true,
      data: themes,
      count: themes.length
    });
  } catch (error) {
    console.error('Error fetching themes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch themes'
    });
  }
});

/**
 * GET /api/themes/:id
 * Get theme by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const theme = await Theme.findById(id);

    if (!theme) {
      return res.status(404).json({
        success: false,
        error: 'Theme not found'
      });
    }

    res.json({
      success: true,
      data: theme
    });
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch theme'
    });
  }
});

/**
 * POST /api/themes
 * Create new theme
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = createThemeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details
      });
    }

    const theme = await Theme.create(value);
    res.status(201).json({
      success: true,
      data: theme,
      message: 'Theme created successfully'
    });
  } catch (error) {
    console.error('Error creating theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create theme'
    });
  }
});

/**
 * PUT /api/themes/:id
 * Update theme
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateThemeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details
      });
    }

    const theme = await Theme.update(id, value);

    if (!theme) {
      return res.status(404).json({
        success: false,
        error: 'Theme not found'
      });
    }

    res.json({
      success: true,
      data: theme,
      message: 'Theme updated successfully'
    });
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update theme'
    });
  }
});

/**
 * DELETE /api/themes/:id
 * Delete theme
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Theme.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Theme not found'
      });
    }

    res.json({
      success: true,
      message: 'Theme deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete theme'
    });
  }
});

/**
 * GET /api/themes/default/template
 * Get default theme template
 */
router.get('/default/template', (req, res) => {
  try {
    const defaultTheme = Theme.getDefaultTheme();
    res.json({
      success: true,
      data: defaultTheme,
      message: 'Default theme template'
    });
  } catch (error) {
    console.error('Error fetching default theme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch default theme'
    });
  }
});

module.exports = router;
