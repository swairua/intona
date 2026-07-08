import { cn } from '../../utils/cn'
import { Container } from './Container'
import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  bgColor?: string
  id?: string
}

export function Section({ children, className, bgColor = 'bg-white', id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', bgColor, className)}>
      <Container>{children}</Container>
    </section>
  )
}
