import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function Card({ children, className, hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'bg-white rounded-2xl border border-border shadow-sm overflow-hidden transition-shadow duration-300',
        hover && 'hover:shadow-xl',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
