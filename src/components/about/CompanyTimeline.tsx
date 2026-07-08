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
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
          <div className="space-y-12">
            {HISTORY.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-4 top-1 w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold text-accent mb-2">{event.title}</h3>
                  <p className="text-secondary leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
