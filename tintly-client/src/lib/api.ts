const API_BASE_URL = 'http://localhost:3001';

export interface Theme {
  id?: string;
  name: string;
  description?: string;
  colors: {
    primary: { 500: string; foreground: string };
    secondary: { 500: string; foreground: string };
    accent: { 500: string; foreground: string };
    muted: { 100: string; foreground: string };
    background: string;
    foreground: string;
    border: string;
    ring: string;
    destructive: string;
    'destructive-foreground': string;
  };
  typography: {
    fontFamily: { sans: string[] };
    fontSize: { base: string };
  };
  spacing: { md: string };
  radius: { md: string };
  shadows: { md: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ExportResponse {
  content: string;
  fileName: string;
  format: string;
  fileExtension: string;
}

// Theme API
export const themeApi = {
  async getAll(): Promise<Theme[]> {
    const response = await fetch(`${API_BASE_URL}/api/themes`);
    const result: ApiResponse<Theme[]> = await response.json();
    return result.data;
  },

  async getById(id: string): Promise<Theme> {
    const response = await fetch(`${API_BASE_URL}/api/themes/${id}`);
    const result: ApiResponse<Theme> = await response.json();
    return result.data;
  },

  async create(theme: Partial<Theme>): Promise<Theme> {
    const response = await fetch(`${API_BASE_URL}/api/themes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    });
    const result: ApiResponse<Theme> = await response.json();
    return result.data;
  },

  async update(id: string, theme: Partial<Theme>): Promise<Theme> {
    const response = await fetch(`${API_BASE_URL}/api/themes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    });
    const result: ApiResponse<Theme> = await response.json();
    return result.data;
  },

  async delete(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/api/themes/${id}`, {
      method: 'DELETE',
    });
  },

  async getDefaultTemplate(): Promise<Theme> {
    const response = await fetch(`${API_BASE_URL}/api/themes/default/template`);
    const result: ApiResponse<Theme> = await response.json();
    return result.data;
  },
};

// Export API
export const exportApi = {
  async exportTheme(themeId: string, format: 'tailwind' | 'css' | 'json'): Promise<ExportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ themeId, format }),
    });
    const result: ApiResponse<ExportResponse> = await response.json();
    return result.data;
  },

  async exportTailwind(themeId: string): Promise<ExportResponse> {
    const response = await fetch(`${API_BASE_URL}/api/export/tailwind`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ themeId }),
    });
    const result: ApiResponse<ExportResponse> = await response.json();
    return result.data;
  },
};

// Helper to download exported files
export function downloadFile(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
