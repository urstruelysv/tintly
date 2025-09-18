# Tintly Backend API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
Currently no authentication required.

## Health Check

### GET /health
Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Tintly Backend API"
}
```

## Theme Management

### GET /api/themes
Get all themes.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Theme Name",
      "description": "Theme description",
      "colors": {...},
      "typography": {...},
      "spacing": {...},
      "radius": {...},
      "shadows": {...},
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/themes/:id
Get a specific theme by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Theme Name",
    // ... theme data
  }
}
```

### POST /api/themes
Create a new theme.

**Request Body:**
```json
{
  "name": "My Theme",
  "description": "Optional description",
  "colors": {
    "primary": {"500": "#0ea5e9", "foreground": "#ffffff"},
    "background": "#ffffff"
  },
  "typography": {...},
  "spacing": {...},
  "radius": {...},
  "shadows": {...}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "generated-uuid",
    // ... complete theme data
  },
  "message": "Theme created successfully"
}
```

### PUT /api/themes/:id
Update an existing theme.

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "colors": {...}
}
```

### DELETE /api/themes/:id
Delete a theme.

**Response:**
```json
{
  "success": true,
  "message": "Theme deleted successfully"
}
```

### GET /api/themes/default/template
Get the default theme template.

**Response:**
```json
{
  "success": true,
  "data": {
    "colors": {...},
    "typography": {...},
    "spacing": {...},
    "radius": {...},
    "shadows": {...}
  },
  "message": "Default theme template"
}
```

## Export

### GET /api/export/formats
Get available export formats.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "key": "tailwind",
      "name": "Tailwind Config",
      "description": "Generate tailwind.config.js file",
      "fileExtension": "js",
      "fileName": "tailwind.config.js"
    }
  ],
  "count": 4
}
```

### POST /api/export
Export theme in specified format.

**Request Body:**
```json
{
  "themeId": "uuid", // OR "theme": {...}
  "format": "tailwind" // tailwind, css, json, shadcn
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "/** @type {import('tailwindcss').Config} */\nmodule.exports = {...}",
    "fileName": "tailwind.config.js",
    "format": "tailwind",
    "fileExtension": "js",
    "theme": {
      "id": "uuid",
      "name": "Theme Name"
    }
  },
  "message": "Theme exported as tailwind"
}
```

### POST /api/export/tailwind
Shortcut to export as Tailwind config.

**Request Body:**
```json
{
  "themeId": "uuid" // OR "theme": {...}
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Example Usage

### Create and Export a Theme
```bash
# 1. Create theme
curl -X POST http://localhost:3001/api/themes \
  -H "Content-Type: application/json" \
  -d '{"name": "My Theme", "colors": {"primary": {"500": "#0ea5e9"}}}'

# 2. Export as Tailwind (using theme ID from step 1)
curl -X POST http://localhost:3001/api/export/tailwind \
  -H "Content-Type: application/json" \
  -d '{"themeId": "YOUR_THEME_ID"}'
```
