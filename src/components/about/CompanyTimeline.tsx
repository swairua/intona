import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Card } from '../ui/Card'
import { HISTORY } from '../../constants/company'
import { Building2 } from 'lucide-react'

export function CompanyTimeline() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <Container>
        <Heading
          title="Company Timeline"
          subtitle="Key milestones in our journey of growth and excellence."
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3.5 sm:left-7 top-0 bottom-0 w-0.5 bg-primary/20" />
          <div className="space-y-8 sm:space-y-12">
            {HISTORY.map((event, i) => (
              <div
                key={event.year}
                className="relative pl-16 sm:pl-24"
              >
                <div className="absolute left-0 sm:left-1 top-1 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-primary" />
                </div>
                <Card variant="premium" delay={i * 0.1}>
                  <div className="p-4 sm:p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold mb-2">
                      {event.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-accent mb-2">{event.title}</h3>
                    <p className="text-sm sm:text-base text-secondary leading-relaxed">{event.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
