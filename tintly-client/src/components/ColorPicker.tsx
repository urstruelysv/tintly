'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, RotateCcw } from 'lucide-react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
  showAdvanced?: boolean
}

// Helper functions for color conversion
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360
  s /= 100
  l /= 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function ColorPicker({ label, value, onChange, className, showAdvanced = false }: ColorPickerProps) {
  const [hsl, setHsl] = useState({ h: 0, s: 50, l: 50 })
  const [hex, setHex] = useState(value)

  useEffect(() => {
    if (value && value !== hex) {
      setHex(value)
      const hslValue = hexToHsl(value)
      setHsl(hslValue)
    }
  }, [value])

  const handleHexChange = (newHex: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      setHex(newHex)
      const hslValue = hexToHsl(newHex)
      setHsl(hslValue)
      onChange(newHex)
    } else {
      setHex(newHex)
    }
  }

  const handleHslChange = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl)
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l)
    setHex(newHex)
    onChange(newHex)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex)
  }

  const resetToDefault = () => {
    const defaultColor = '#000000'
    setHex(defaultColor)
    setHsl(hexToHsl(defaultColor))
    onChange(defaultColor)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={label}>{label}</Label>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefault}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Color Preview */}
        <div className="flex gap-2 items-center">
          <div
            className="w-12 h-10 border rounded cursor-pointer border-gray-300"
            style={{ backgroundColor: hex }}
            onClick={() => document.getElementById(`${label}-color`)?.click()}
          />
          <Input
            id={`${label}-color`}
            type="color"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="hidden"
          />
          <Input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="flex-1 font-mono text-sm"
            placeholder="#000000"
          />
        </div>

        {showAdvanced && (
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="hsl" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hsl" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Hue: {Math.round(hsl.h)}°</Label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hsl.h}
                      onChange={(e) => handleHslChange({ ...hsl, h: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Saturation: {Math.round(hsl.s)}%</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={hsl.s}
                      onChange={(e) => handleHslChange({ ...hsl, s: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Lightness: {Math.round(hsl.l)}%</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={hsl.l}
                      onChange={(e) => handleHslChange({ ...hsl, l: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="rgb" className="mt-3">
                  <div className="text-sm text-muted-foreground">
                    RGB values will be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
