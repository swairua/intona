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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <Container>
        <Heading
          title="Our Services"
          subtitle="Comprehensive construction and engineering solutions delivered with precision and excellence."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card delay={i * 0.05}>
                  <div className="h-2 bg-gradient-to-r from-primary via-primary/50 to-primary/10 group-hover:from-primary group-hover:to-primary/20 transition-all duration-500" />
                  <div className="p-6 sm:p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300"
                    >
                      <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                    </motion.div>
                    <h3 className="text-base sm:text-lg font-bold text-accent mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 text-sm sm:text-base group"
          >
            View All Services
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
