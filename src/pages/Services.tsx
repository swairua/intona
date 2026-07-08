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
      <div className="pt-20 sm:pt-24 md:pt-32 services-hero-section relative">
        <Section bgColor="bg-accent text-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Our Services</h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  End-to-end construction and engineering solutions tailored to your project needs. From conception to completion, we deliver excellence.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden md:block relative rounded-2xl overflow-hidden aspect-video"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F047753769db24e5e91f7bfb612eaf949?format=webp&width=1200"
                  alt="Services showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-transparent" />
              </motion.div>
            </div>
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
