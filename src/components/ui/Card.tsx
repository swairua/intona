import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
  variant?: 'default' | 'dark' | 'premium'
}

export function Card({ children, className, hover = true, delay = 0, variant = 'default' }: CardProps) {
  const variantStyles = {
    default: cn(
      'bg-white border border-border rounded-2xl',
      'shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]',
      'hover:border-[var(--color-gold)]/40 transition-all duration-300'
    ),
    dark: cn(
      'bg-accent/5 border-2 border-[var(--color-gold)] text-white rounded-2xl',
      'shadow-[var(--shadow-premium-lg)] hover:shadow-[var(--shadow-premium-gold)]',
      'transition-all duration-300'
    ),
    premium: cn(
      'bg-white border-t-4 border-t-[var(--color-gold)] border border-b-border border-l-border border-r-border rounded-2xl',
      'shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]',
      'transition-all duration-300'
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -10, scale: 1.03, transition: { duration: 0.3, ease: 'easeOut' } } : undefined}
      className={cn(
        'overflow-hidden',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
