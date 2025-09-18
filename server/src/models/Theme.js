const { getDatabase } = require('./database');
const { v4: uuidv4 } = require('uuid');

/**
 * Default theme structure based on shadcn/ui and Tailwind CSS
 */
const DEFAULT_THEME = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      900: '#0c4a6e',
      foreground: '#ffffff'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      900: '#0f172a',
      foreground: '#ffffff'
    },
    accent: {
      50: '#fefce8',
      100: '#fef3c7',
      500: '#eab308',
      600: '#ca8a04',
      900: '#713f12',
      foreground: '#000000'
    },
    muted: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      900: '#111827',
      foreground: '#374151'
    },
    background: '#ffffff',
    foreground: '#09090b',
    card: '#ffffff',
    'card-foreground': '#09090b',
    popover: '#ffffff',
    'popover-foreground': '#09090b',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#0ea5e9',
    destructive: '#ef4444',
    'destructive-foreground': '#fef2f2'
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      mono: ['JetBrains Mono', 'ui-monospace', 'Consolas']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  radius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  }
};

class Theme {
  /**
   * Create a new theme
   */
  static async create(themeData) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const id = uuidv4();
      const now = new Date().toISOString();

      const theme = {
        id,
        name: themeData.name || 'Untitled Theme',
        description: themeData.description || '',
        colors: JSON.stringify(themeData.colors || DEFAULT_THEME.colors),
        typography: JSON.stringify(themeData.typography || DEFAULT_THEME.typography),
        spacing: JSON.stringify(themeData.spacing || DEFAULT_THEME.spacing),
        radius: JSON.stringify(themeData.radius || DEFAULT_THEME.radius),
        shadows: JSON.stringify(themeData.shadows || DEFAULT_THEME.shadows),
        created_at: now,
        updated_at: now
      };

      const sql = `
        INSERT INTO themes (id, name, description, colors, typography, spacing, radius, shadows, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(sql, [
        theme.id, theme.name, theme.description, theme.colors,
        theme.typography, theme.spacing, theme.radius, theme.shadows,
        theme.created_at, theme.updated_at
      ], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(Theme.parseTheme(theme));
      });
    });
  }

  /**
   * Get theme by ID
   */
  static async findById(id) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const sql = 'SELECT * FROM themes WHERE id = ?';

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row ? Theme.parseTheme(row) : null);
      });
    });
  }

  /**
   * Get all themes
   */
  static async findAll() {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const sql = 'SELECT * FROM themes ORDER BY updated_at DESC';

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows.map(row => Theme.parseTheme(row)));
      });
    });
  }

  /**
   * Update theme
   */
  static async update(id, themeData) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const now = new Date().toISOString();

      const updates = [];
      const values = [];

      if (themeData.name !== undefined) {
        updates.push('name = ?');
        values.push(themeData.name);
      }
      if (themeData.description !== undefined) {
        updates.push('description = ?');
        values.push(themeData.description);
      }
      if (themeData.colors !== undefined) {
        updates.push('colors = ?');
        values.push(JSON.stringify(themeData.colors));
      }
      if (themeData.typography !== undefined) {
        updates.push('typography = ?');
        values.push(JSON.stringify(themeData.typography));
      }
      if (themeData.spacing !== undefined) {
        updates.push('spacing = ?');
        values.push(JSON.stringify(themeData.spacing));
      }
      if (themeData.radius !== undefined) {
        updates.push('radius = ?');
        values.push(JSON.stringify(themeData.radius));
      }
      if (themeData.shadows !== undefined) {
        updates.push('shadows = ?');
        values.push(JSON.stringify(themeData.shadows));
      }

      updates.push('updated_at = ?');
      values.push(now);
      values.push(id);

      const sql = `UPDATE themes SET ${updates.join(', ')} WHERE id = ?`;

      db.run(sql, values, function(err) {
        if (err) {
          reject(err);
          return;
        }
        if (this.changes === 0) {
          resolve(null);
          return;
        }
        Theme.findById(id).then(resolve).catch(reject);
      });
    });
  }

  /**
   * Delete theme
   */
  static async delete(id) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const sql = 'DELETE FROM themes WHERE id = ?';

      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes > 0);
      });
    });
  }

  /**
   * Parse theme data from database
   */
  static parseTheme(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      colors: JSON.parse(row.colors),
      typography: JSON.parse(row.typography),
      spacing: JSON.parse(row.spacing),
      radius: JSON.parse(row.radius),
      shadows: JSON.parse(row.shadows),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Get default theme
   */
  static getDefaultTheme() {
    return DEFAULT_THEME;
  }
}

module.exports = Theme;
