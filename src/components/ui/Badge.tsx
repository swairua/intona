import { cn } from '../../utils/cn'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info'
  className?: string
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
        variant === 'primary' && 'bg-primary/10 text-primary',
        variant === 'secondary' && 'bg-secondary/10 text-secondary',
        variant === 'success' && 'bg-green-100 text-green-700',
        variant === 'warning' && 'bg-yellow-100 text-yellow-700',
        variant === 'info' && 'bg-blue-100 text-blue-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
