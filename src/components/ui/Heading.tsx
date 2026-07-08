import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'

interface HeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function Heading({ title, subtitle, centered = true, light = false, className }: HeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-8 sm:mb-12 md:mb-16',
        centered && 'text-center',
        className,
      )}
    >
      <h2 className={cn(
        'text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight',
        light ? 'text-white' : 'text-accent',
        'bg-clip-text',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed',
          light ? 'text-gray-300' : 'text-secondary',
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-5 sm:mt-6 h-1 w-16 sm:w-20 rounded-full',
        centered ? 'mx-auto' : '',
        light ? 'bg-primary' : 'bg-primary',
      )} />
    </motion.div>
  )
}
