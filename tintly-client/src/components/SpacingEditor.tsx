'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Theme } from '@/lib/api'
import { Ruler, CornerUpLeft } from 'lucide-react'

interface SpacingEditorProps {
  theme: Theme
  onUpdate: (updates: Partial<Theme>) => void
}

const spacingPresets = [
  { label: 'XS', value: '0.25rem', size: 4 },
  { label: 'SM', value: '0.5rem', size: 8 },
  { label: 'MD', value: '1rem', size: 16 },
  { label: 'LG', value: '1.5rem', size: 24 },
  { label: 'XL', value: '2rem', size: 32 },
  { label: '2XL', value: '3rem', size: 48 },
  { label: '3XL', value: '4rem', size: 64 },
]

const radiusPresets = [
  { label: 'None', value: '0px', size: 0 },
  { label: 'SM', value: '0.125rem', size: 2 },
  { label: 'MD', value: '0.375rem', size: 6 },
  { label: 'LG', value: '0.5rem', size: 8 },
  { label: 'XL', value: '0.75rem', size: 12 },
  { label: '2XL', value: '1rem', size: 16 },
  { label: 'Full', value: '9999px', size: 9999 },
]

export function SpacingEditor({ theme, onUpdate }: SpacingEditorProps) {
  const [spacing, setSpacing] = useState(16)
  const [radius, setRadius] = useState(6)

  const updateSpacing = (newSpacing: number) => {
    setSpacing(newSpacing)
    onUpdate({
      spacing: {
        md: `${newSpacing}px`,
      },
    })
  }

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius)
    onUpdate({
      radius: {
        md: `${newRadius}px`,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Spacing Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Spacing
          </CardTitle>
          <CardDescription>
            Customize spacing and padding values for your theme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Base Spacing: {spacing}px</Label>
            <div className="space-y-2">
              <Slider
                value={[spacing]}
                onValueChange={([value]) => updateSpacing(value)}
                min={4}
                max={64}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4px</span>
                <span>64px</span>
              </div>
            </div>
            
            {/* Spacing Presets */}
            <div className="grid grid-cols-4 gap-2">
              {spacingPresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant={spacing === preset.size ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSpacing(preset.size)}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Spacing Preview */}
          <div className="space-y-3">
            <Label>Preview</Label>
            <div className="space-y-2">
              <div 
                className="bg-primary text-primary-foreground p-2 rounded"
                style={{ padding: `${spacing}px` }}
              >
                <div className="text-sm">Padding: {spacing}px</div>
              </div>
              <div className="flex gap-2">
                <div 
                  className="bg-secondary h-8 rounded"
                  style={{ width: `${spacing}px` }}
                />
                <div 
                  className="bg-accent h-8 rounded"
                  style={{ width: `${spacing * 2}px` }}
                />
                <div 
                  className="bg-muted h-8 rounded"
                  style={{ width: `${spacing * 3}px` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radius Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CornerUpLeft className="h-5 w-5" />
            Border Radius
          </CardTitle>
          <CardDescription>
            Customize border radius for rounded corners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Border Radius: {radius}px</Label>
            <div className="space-y-2">
              <Slider
                value={[radius]}
                onValueChange={([value]) => updateRadius(value)}
                min={0}
                max={32}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0px</span>
                <span>32px</span>
              </div>
            </div>
            
            {/* Radius Presets */}
            <div className="grid grid-cols-4 gap-2">
              {radiusPresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant={radius === preset.size ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateRadius(preset.size)}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Radius Preview */}
          <div className="space-y-3">
            <Label>Preview</Label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="bg-primary text-primary-foreground p-4 text-center"
                style={{ borderRadius: `${radius}px` }}
              >
                <div className="text-sm">Radius: {radius}px</div>
              </div>
              <div 
                className="bg-secondary text-secondary-foreground p-4 text-center"
                style={{ borderRadius: `${radius}px` }}
              >
                <div className="text-sm">Rounded</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
