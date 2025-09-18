/**
 * Export Service - Generates theme files in different formats
 */

/**
 * Generate Tailwind CSS configuration
 */
function generateTailwindConfig(theme) {
  const config = {
    theme: {
      extend: {
        colors: {
          ...theme.colors,
          // Map theme colors to shadcn/ui CSS variables
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          }
        },
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeight,
        lineHeight: theme.typography.lineHeight,
        spacing: theme.spacing,
        borderRadius: theme.radius,
        boxShadow: theme.shadows
      }
    },
    plugins: []
  };

  // Generate the JavaScript file content
  const configString = `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)}`;

  return configString;
}

/**
 * Generate CSS variables theme file
 */
function generateThemeCSS(theme) {
  // Convert colors to HSL values for CSS variables
  function hexToHsl(hex) {
    if (!hex || typeof hex !== 'string') return '0 0% 0%';

    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
  }

  const css = `@layer base {
  :root {
    /* Colors */
    --background: ${hexToHsl(theme.colors.background)};
    --foreground: ${hexToHsl(theme.colors.foreground)};
    --card: ${hexToHsl(theme.colors.card)};
    --card-foreground: ${hexToHsl(theme.colors['card-foreground'])};
    --popover: ${hexToHsl(theme.colors.popover)};
    --popover-foreground: ${hexToHsl(theme.colors['popover-foreground'])};
    --primary: ${hexToHsl(theme.colors.primary['500'])};
    --primary-foreground: ${hexToHsl(theme.colors.primary.foreground)};
    --secondary: ${hexToHsl(theme.colors.secondary['500'])};
    --secondary-foreground: ${hexToHsl(theme.colors.secondary.foreground)};
    --muted: ${hexToHsl(theme.colors.muted['100'])};
    --muted-foreground: ${hexToHsl(theme.colors.muted.foreground)};
    --accent: ${hexToHsl(theme.colors.accent['500'])};
    --accent-foreground: ${hexToHsl(theme.colors.accent.foreground)};
    --destructive: ${hexToHsl(theme.colors.destructive)};
    --destructive-foreground: ${hexToHsl(theme.colors['destructive-foreground'])};
    --border: ${hexToHsl(theme.colors.border)};
    --input: ${hexToHsl(theme.colors.input)};
    --ring: ${hexToHsl(theme.colors.ring)};

    /* Border Radius */
    --radius: ${theme.radius.md};
  }

  .dark {
    --background: ${hexToHsl(theme.colors.secondary['900'])};
    --foreground: ${hexToHsl(theme.colors.secondary['50'])};
    --card: ${hexToHsl(theme.colors.secondary['900'])};
    --card-foreground: ${hexToHsl(theme.colors.secondary['50'])};
    --popover: ${hexToHsl(theme.colors.secondary['900'])};
    --popover-foreground: ${hexToHsl(theme.colors.secondary['50'])};
    --primary: ${hexToHsl(theme.colors.primary['400'])};
    --primary-foreground: ${hexToHsl(theme.colors.primary['900'])};
    --secondary: ${hexToHsl(theme.colors.secondary['800'])};
    --secondary-foreground: ${hexToHsl(theme.colors.secondary['50'])};
    --muted: ${hexToHsl(theme.colors.secondary['800'])};
    --muted-foreground: ${hexToHsl(theme.colors.secondary['400'])};
    --accent: ${hexToHsl(theme.colors.accent['400'])};
    --accent-foreground: ${hexToHsl(theme.colors.accent['900'])};
    --destructive: ${hexToHsl(theme.colors.destructive)};
    --destructive-foreground: ${hexToHsl(theme.colors['destructive-foreground'])};
    --border: ${hexToHsl(theme.colors.secondary['800'])};
    --input: ${hexToHsl(theme.colors.secondary['800'])};
    --ring: ${hexToHsl(theme.colors.primary['400'])};
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

  return css;
}

/**
 * Generate tokens JSON file
 */
function generateTokensJSON(theme) {
  const tokens = {
    name: theme.name || 'Untitled Theme',
    description: theme.description || '',
    version: '1.0.0',
    tokens: {
      colors: theme.colors,
      typography: theme.typography,
      spacing: theme.spacing,
      radius: theme.radius,
      shadows: theme.shadows
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      generator: 'Tintly Theme Generator'
    }
  };

  return JSON.stringify(tokens, null, 2);
}

/**
 * Generate shadcn/ui component theme
 */
function generateShadcnTheme(theme) {
  const shadcnConfig = {
    style: 'default',
    rsc: false,
    tsx: true,
    tailwind: {
      config: './tailwind.config.js',
      css: './src/app/globals.css',
      baseColor: 'slate',
      cssVariables: true,
      prefix: ''
    },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils'
    }
  };

  return JSON.stringify(shadcnConfig, null, 2);
}

/**
 * Main export function that generates all formats
 */
function exportTheme(theme, format) {
  switch (format) {
    case 'tailwind':
      return generateTailwindConfig(theme);
    case 'css':
      return generateThemeCSS(theme);
    case 'json':
      return generateTokensJSON(theme);
    case 'shadcn':
      return generateShadcnTheme(theme);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

/**
 * Get file extension for format
 */
function getFileExtension(format) {
  const extensions = {
    tailwind: 'js',
    css: 'css',
    json: 'json',
    shadcn: 'json'
  };
  return extensions[format] || 'txt';
}

/**
 * Get filename for format
 */
function getFileName(format, themeName = 'theme') {
  const cleanName = themeName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filenames = {
    tailwind: 'tailwind.config.js',
    css: `${cleanName}.css`,
    json: `${cleanName}-tokens.json`,
    shadcn: 'components.json'
  };
  return filenames[format] || `${cleanName}.txt`;
}

module.exports = {
  exportTheme,
  generateTailwindConfig,
  generateThemeCSS,
  generateTokensJSON,
  generateShadcnTheme,
  getFileExtension,
  getFileName
};
