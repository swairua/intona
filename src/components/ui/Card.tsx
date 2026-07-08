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
    default: 'bg-white border-border shadow-md hover:shadow-2xl hover:border-[var(--color-gold)]/30',
    dark: 'bg-accent/5 border-[var(--color-gold)] text-white shadow-lg hover:shadow-2xl hover:border-[var(--color-gold)]',
    premium: 'bg-white border-t-4 border-t-[var(--color-gold)] border-l border-r border-b border-border shadow-lg hover:shadow-2xl',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -8, scale: 1.02, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'rounded-2xl border overflow-hidden transition-all duration-300',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
