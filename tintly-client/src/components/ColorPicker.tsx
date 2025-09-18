'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={label}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          id={label}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border rounded cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
