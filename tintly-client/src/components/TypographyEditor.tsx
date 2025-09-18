'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Theme } from '@/lib/api'
import { Type, Bold, Italic, Underline } from 'lucide-react'

interface TypographyEditorProps {
  theme: Theme
  onUpdate: (updates: Partial<Theme>) => void
}

const fontFamilies = [
  { value: 'Inter', label: 'Inter', category: 'Sans Serif' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans Serif' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans Serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans Serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans Serif' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans Serif' },
  { value: 'Nunito', label: 'Nunito', category: 'Sans Serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'Lora', label: 'Lora', category: 'Serif' },
  { value: 'Crimson Text', label: 'Crimson Text', category: 'Serif' },
  { value: 'Fira Code', label: 'Fira Code', category: 'Monospace' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Monospace' },
  { value: 'Source Code Pro', label: 'Source Code Pro', category: 'Monospace' },
  { value: 'Cascadia Code', label: 'Cascadia Code', category: 'Monospace' },
]

const fontSizePresets = [
  { label: 'XS', value: '0.75rem', size: 12 },
  { label: 'SM', value: '0.875rem', size: 14 },
  { label: 'BASE', value: '1rem', size: 16 },
  { label: 'LG', value: '1.125rem', size: 18 },
  { label: 'XL', value: '1.25rem', size: 20 },
  { label: '2XL', value: '1.5rem', size: 24 },
  { label: '3XL', value: '1.875rem', size: 30 },
  { label: '4XL', value: '2.25rem', size: 36 },
]

export function TypographyEditor({ theme, onUpdate }: TypographyEditorProps) {
  const [fontSize, setFontSize] = useState(16)

  const updateTypography = (updates: Partial<Theme['typography']>) => {
    onUpdate({
      typography: {
        ...theme.typography,
        ...updates,
      },
    })
  }

  const updateFontFamily = (fontFamily: string) => {
    updateTypography({
      fontFamily: {
        sans: [fontFamily, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    })
  }

  const updateFontSize = (size: number) => {
    setFontSize(size)
    updateTypography({
      fontSize: {
        base: `${size}px`,
      },
    })
  }

  const currentFontFamily = theme.typography.fontFamily.sans[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5" />
          Typography
        </CardTitle>
        <CardDescription>
          Customize fonts, sizes, and text styles for your theme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Family */}
        <div className="space-y-3">
          <Label>Font Family</Label>
          <Select value={currentFontFamily} onValueChange={updateFontFamily}>
            <SelectTrigger>
              <SelectValue placeholder="Select a font family" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <div className="flex items-center justify-between w-full">
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {font.category}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <Label>Base Font Size: {fontSize}px</Label>
          <div className="space-y-2">
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => updateFontSize(value)}
              min={12}
              max={48}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12px</span>
              <span>48px</span>
            </div>
          </div>
          
          {/* Font Size Presets */}
          <div className="grid grid-cols-4 gap-2">
            {fontSizePresets.map((preset) => (
              <Button
                key={preset.label}
                variant={fontSize === preset.size ? "default" : "outline"}
                size="sm"
                onClick={() => updateFontSize(preset.size)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Weight */}
        <div className="space-y-3">
          <Label>Font Weight</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Bold className="h-4 w-4" />
              Bold
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Italic className="h-4 w-4" />
              Italic
            </Button>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="space-y-3">
          <Label>Preview</Label>
          <div 
            className="p-4 border rounded-lg bg-background"
            style={{ 
              fontFamily: currentFontFamily,
              fontSize: `${fontSize}px`,
            }}
          >
            <h1 className="text-2xl font-bold mb-2">Heading 1</h1>
            <h2 className="text-xl font-semibold mb-2">Heading 2</h2>
            <h3 className="text-lg font-medium mb-2">Heading 3</h3>
            <p className="text-base mb-2">
              This is a sample paragraph showing how your typography will look. 
              It includes <strong>bold text</strong> and <em>italic text</em>.
            </p>
            <p className="text-sm text-muted-foreground">
              Small text for captions and secondary information.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
