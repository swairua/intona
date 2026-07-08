import { cn } from '../../utils/cn'
import { Container } from './Container'
import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  bgColor?: string
  id?: string
  gradient?: boolean
}

export function Section({ children, className, bgColor = 'bg-white', id, gradient }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 sm:py-16 md:py-24',
        gradient && 'bg-gradient-to-br from-white to-surface',
        !gradient && bgColor,
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}
