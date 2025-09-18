'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Theme } from '@/lib/api'

interface ThemePreviewProps {
  theme: Theme
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  // Apply theme colors as CSS variables
  const themeStyle = {
    '--primary': theme.colors.primary[500],
    '--primary-foreground': theme.colors.primary.foreground,
    '--secondary': theme.colors.secondary[500],
    '--secondary-foreground': theme.colors.secondary.foreground,
    '--accent': theme.colors.accent[500],
    '--accent-foreground': theme.colors.accent.foreground,
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--border': theme.colors.border,
    '--ring': theme.colors.ring,
  } as React.CSSProperties

  return (
    <div className="space-y-6 p-6 rounded-lg border" style={themeStyle}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Theme Preview</h3>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button style={{ backgroundColor: theme.colors.primary[500], color: theme.colors.primary.foreground }}>
            Primary Button
          </Button>
          <Button
            variant="secondary"
            style={{ backgroundColor: theme.colors.secondary[500], color: theme.colors.secondary.foreground }}
          >
            Secondary Button
          </Button>
          <Button
            variant="outline"
            style={{ borderColor: theme.colors.border, color: theme.colors.foreground }}
          >
            Outline Button
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.colors.foreground }}>Card Title</CardTitle>
              <CardDescription style={{ color: theme.colors.muted.foreground }}>
                This is a card description to show muted text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: theme.colors.foreground }}>
                Card content with your theme colors applied.
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: theme.colors.accent[500], borderColor: theme.colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.colors.accent.foreground }}>Accent Card</CardTitle>
              <CardDescription style={{ color: theme.colors.accent.foreground, opacity: 0.8 }}>
                Card with accent background color.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Form Elements */}
        <div className="space-y-4">
          <Input
            placeholder="Sample input field"
            style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.background }}
          />

          <div className="flex gap-2">
            <Badge style={{ backgroundColor: theme.colors.primary[500], color: theme.colors.primary.foreground }}>
              Primary
            </Badge>
            <Badge
              variant="secondary"
              style={{ backgroundColor: theme.colors.secondary[500], color: theme.colors.secondary.foreground }}
            >
              Secondary
            </Badge>
            <Badge
              variant="outline"
              style={{ borderColor: theme.colors.border, color: theme.colors.foreground }}
            >
              Outline
            </Badge>
          </div>
        </div>

        {/* Text Examples */}
        <div className="space-y-2">
          <h4 className="font-semibold" style={{ color: theme.colors.foreground }}>
            Text Examples
          </h4>
          <p style={{ color: theme.colors.foreground }}>
            Primary text in your theme's foreground color.
          </p>
          <p style={{ color: theme.colors.muted.foreground }}>
            Muted text for secondary information.
          </p>
        </div>
      </div>
    </div>
  )
}
