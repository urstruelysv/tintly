'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Theme } from '@/lib/api'
import { Palette, Sparkles, Moon, Sun, Zap } from 'lucide-react'

interface ThemePresetsProps {
  onApplyPreset: (preset: Theme) => void
}

const themePresets: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and minimal shadcn/ui theme',
    colors: {
      primary: { 500: '#0f172a', foreground: '#f8fafc' },
      secondary: { 500: '#f1f5f9', foreground: '#0f172a' },
      accent: { 500: '#f1f5f9', foreground: '#0f172a' },
      muted: { 100: '#f1f5f9', foreground: '#64748b' },
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#e2e8f0',
      ring: '#0f172a',
      destructive: '#ef4444',
      'destructive-foreground': '#f8fafc',
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '6px' },
    shadows: { md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Dark theme with high contrast',
    colors: {
      primary: { 500: '#f8fafc', foreground: '#0f172a' },
      secondary: { 500: '#1e293b', foreground: '#f8fafc' },
      accent: { 500: '#1e293b', foreground: '#f8fafc' },
      muted: { 100: '#1e293b', foreground: '#94a3b8' },
      background: '#0f172a',
      foreground: '#f8fafc',
      border: '#1e293b',
      ring: '#f8fafc',
      destructive: '#ef4444',
      'destructive-foreground': '#f8fafc',
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '6px' },
    shadows: { md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)' },
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    description: 'Calming blue color scheme',
    colors: {
      primary: { 500: '#2563eb', foreground: '#ffffff' },
      secondary: { 500: '#dbeafe', foreground: '#1e40af' },
      accent: { 500: '#dbeafe', foreground: '#1e40af' },
      muted: { 100: '#f0f9ff', foreground: '#64748b' },
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#e0e7ff',
      ring: '#2563eb',
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '8px' },
    shadows: { md: '0 4px 6px -1px rgb(37 99 235 / 0.1), 0 2px 4px -2px rgb(37 99 235 / 0.1)' },
  },
  {
    id: 'green',
    name: 'Forest Green',
    description: 'Natural green color palette',
    colors: {
      primary: { 500: '#059669', foreground: '#ffffff' },
      secondary: { 500: '#d1fae5', foreground: '#064e3b' },
      accent: { 500: '#d1fae5', foreground: '#064e3b' },
      muted: { 100: '#f0fdf4', foreground: '#64748b' },
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#dcfce7',
      ring: '#059669',
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '8px' },
    shadows: { md: '0 4px 6px -1px rgb(5 150 105 / 0.1), 0 2px 4px -2px rgb(5 150 105 / 0.1)' },
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant purple theme',
    colors: {
      primary: { 500: '#7c3aed', foreground: '#ffffff' },
      secondary: { 500: '#ede9fe', foreground: '#581c87' },
      accent: { 500: '#ede9fe', foreground: '#581c87' },
      muted: { 100: '#faf5ff', foreground: '#64748b' },
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#e9d5ff',
      ring: '#7c3aed',
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '12px' },
    shadows: { md: '0 4px 6px -1px rgb(124 58 237 / 0.1), 0 2px 4px -2px rgb(124 58 237 / 0.1)' },
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    description: 'Warm orange color scheme',
    colors: {
      primary: { 500: '#ea580c', foreground: '#ffffff' },
      secondary: { 500: '#fed7aa', foreground: '#9a3412' },
      accent: { 500: '#fed7aa', foreground: '#9a3412' },
      muted: { 100: '#fff7ed', foreground: '#64748b' },
      background: '#ffffff',
      foreground: '#0f172a',
      border: '#fed7aa',
      input: '#fed7aa',
      ring: '#ea580c',
      card: { DEFAULT: '#ffffff', foreground: '#0f172a' },
      popover: { DEFAULT: '#ffffff', foreground: '#0f172a' },
      destructive: { DEFAULT: '#ef4444', foreground: '#ffffff' },
    },
    typography: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      fontSize: { base: '16px' },
    },
    spacing: { md: '16px' },
    radius: { md: '6px' },
    shadows: { md: '0 4px 6px -1px rgb(234 88 12 / 0.1), 0 2px 4px -2px rgb(234 88 12 / 0.1)' },
  },
]

const presetIcons = {
  default: Palette,
  dark: Moon,
  blue: Sun,
  green: Sparkles,
  purple: Zap,
  orange: Sun,
}

export function ThemePresets({ onApplyPreset }: ThemePresetsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Theme Presets
        </CardTitle>
        <CardDescription>
          Quick-start themes to get you started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themePresets.map((preset) => {
            const Icon = presetIcons[preset.id as keyof typeof presetIcons] || Palette
            
            return (
              <div
                key={preset.id}
                className="relative group cursor-pointer"
                onClick={() => onApplyPreset(preset)}
              >
                <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: preset.colors.primary[500] }}
                      >
                        <Icon className="h-4 w-4" style={{ color: preset.colors.primary.foreground }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{preset.name}</h3>
                        <p className="text-xs text-muted-foreground">{preset.description}</p>
                      </div>
                    </div>
                    
                    {/* Color Preview */}
                    <div className="flex gap-1 mb-3">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: preset.colors.primary[500] }}
                        title="Primary"
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: preset.colors.secondary[500] }}
                        title="Secondary"
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: preset.colors.accent[500] }}
                        title="Accent"
                      />
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: preset.colors.background }}
                        title="Background"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {preset.typography.fontFamily.sans[0]}
                      </Badge>
                      <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
