'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { exportApi, downloadFile } from '@/lib/api'
import { useState } from 'react'
import { Download, FileText, Palette, Settings } from 'lucide-react'

interface ExportOptionsProps {
  themeId: string
  themeName: string
}

export function ExportOptions({ themeId, themeName }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null)

  const handleExport = async (format: 'tailwind' | 'css' | 'json') => {
    setIsExporting(format)
    try {
      const result = await exportApi.exportTheme(themeId, format)
      downloadFile(result.content, result.fileName)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Make sure the backend server is running.')
    } finally {
      setIsExporting(null)
    }
  }

  const exportOptions = [
    {
      key: 'tailwind' as const,
      title: 'Tailwind Config',
      description: 'Download tailwind.config.js for your project',
      icon: Settings,
      filename: 'tailwind.config.js',
      badge: 'JS'
    },
    {
      key: 'css' as const,
      title: 'CSS Variables',
      description: 'Download CSS file with theme variables',
      icon: Palette,
      filename: `${themeName.toLowerCase().replace(/\s+/g, '-')}.css`,
      badge: 'CSS'
    },
    {
      key: 'json' as const,
      title: 'Design Tokens',
      description: 'Download JSON file with design tokens',
      icon: FileText,
      filename: `${themeName.toLowerCase().replace(/\s+/g, '-')}-tokens.json`,
      badge: 'JSON'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export Theme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((option) => {
          const Icon = option.icon
          const isLoading = isExporting === option.key

          return (
            <Card key={option.key} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary">{option.badge}</Badge>
                </div>
                <CardTitle className="text-base">{option.title}</CardTitle>
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  onClick={() => handleExport(option.key)}
                  disabled={isLoading}
                  className="w-full"
                  size="sm"
                >
                  {isLoading ? (
                    'Exporting...'
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  {option.filename}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
