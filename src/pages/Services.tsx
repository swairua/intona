import { useState, useEffect } from 'react'
import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { ServiceCard } from '../components/services/ServiceCard'
import { CTASection } from '../components/home/CTASection'
import { getServices } from '../api/services'
import type { Service } from '../types'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'construction', label: 'Construction' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'consultancy', label: 'Consultancy' },
]

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [active, setActive] = useState('all')

  useEffect(() => { getServices().then(setServices).catch(() => {}) }, [])

  const filtered = active === 'all' ? services : services.filter((s) => s.category === active)

  return (
    <>
      <SEO title="Services" description="Comprehensive construction and engineering services by Intona Constructions Ltd." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Our Services</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                End-to-end construction and engineering solutions tailored to your project needs.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12"
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all',
                  active === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface text-secondary hover:bg-primary/10 hover:text-primary',
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
