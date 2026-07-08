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
        'mb-12 md:mb-16',
        centered && 'text-center',
        className,
      )}
    >
      <h2 className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
        light ? 'text-white' : 'text-accent',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed',
          light ? 'text-gray-300' : 'text-secondary',
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-6 h-1 w-20 mx-auto rounded-full',
        centered ? 'mx-auto' : '',
        light ? 'bg-primary' : 'bg-primary',
      )} />
    </motion.div>
  )
}
