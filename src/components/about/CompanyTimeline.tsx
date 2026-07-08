import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
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
        <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
          <div className="space-y-8 sm:space-y-12">
            {HISTORY.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 sm:pl-20"
              >
                <div className="absolute left-2 sm:left-4 top-1 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-primary" />
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-border shadow-sm hover:shadow-lg transition-shadow">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold mb-2">
                    {event.year}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-accent mb-2">{event.title}</h3>
                  <p className="text-sm sm:text-base text-secondary leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
