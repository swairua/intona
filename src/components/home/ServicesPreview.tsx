import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Building2, Route, ArrowLeftRight, Droplets, Factory, Home, Wrench, Ruler, Briefcase, PencilRuler, Compass, ClipboardList, Store, FileText } from 'lucide-react'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Card } from '../ui/Card'
import { getServices } from '../../api/services'
import type { Service } from '../../types'

const FALLBACK_ICONS: Record<string, React.ElementType> = {
  Building2, Route, ArrowLeftRight, Droplets, Factory, Home, Wrench, Ruler, Briefcase, PencilRuler, Compass, ClipboardList, Store, FileText,
}

function getIcon(name: string): React.ElementType {
  return FALLBACK_ICONS[name] || Building2
}

export function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    getServices().then(s => setServices(s.slice(0, 6))).catch(() => {})
  }, [])
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-surface">
      <Container>
        <Heading
          title="Our Services"
          subtitle="Comprehensive construction and engineering solutions delivered with precision and excellence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <Card key={service.id} delay={i * 0.1}>
                <div className="h-2 bg-gradient-to-r from-primary/20 to-primary/5" />
                <div className="p-4 sm:p-6">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-accent mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">{service.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm sm:text-base"
          >
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
