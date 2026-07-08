import { cn } from '../../utils/cn'
import { motion } from 'framer-motion'

interface HeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
  titleColor?: 'accent' | 'primary' | 'gold' | 'white'
  accentColor?: 'primary' | 'gold' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
}

export function Heading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
  titleColor = light ? 'white' : 'accent',
  accentColor = 'primary',
  size = 'lg'
}: HeadingProps) {
  const sizeMap = {
    sm: 'text-2xl sm:text-3xl md:text-4xl',
    md: 'text-3xl sm:text-4xl md:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
  }

  const titleColorMap = {
    accent: light ? 'text-white' : 'text-accent',
    primary: 'text-primary',
    gold: 'text-[var(--color-gold)]',
    white: 'text-white',
  }

  const accentMap = {
    primary: 'bg-primary',
    gold: 'bg-[var(--color-gold)]',
    gradient: 'bg-gradient-to-r from-primary to-[var(--color-gold)]',
  }

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
        sizeMap[size],
        'font-bold tracking-tight lg:tracking-tighter',
        'font-serif',
        titleColorMap[titleColor],
      )} style={{ fontFamily: 'var(--font-family-display)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 sm:mt-5 md:mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed tracking-normal',
          light ? 'text-gray-200' : 'text-secondary',
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-6 sm:mt-8 h-1.5 w-16 sm:w-20 rounded-full',
        centered ? 'mx-auto' : '',
        accentMap[accentColor],
      )} />
    </motion.div>
  )
}
