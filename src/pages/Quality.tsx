import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'
import { CheckCircle, Search, FileCheck, RefreshCw, Award, BarChart3 } from 'lucide-react'

const QUALITY_ITEMS = [
  { icon: Award, title: 'ISO 9001:2015 Certified', description: 'Our quality management system meets international standards, ensuring consistent project excellence.' },
  { icon: CheckCircle, title: 'Quality Management', description: 'Comprehensive QMS covering all processes from procurement to project handover.' },
  { icon: Search, title: 'Inspection & Testing', description: 'Rigorous inspection protocols and materials testing at every construction stage.' },
  { icon: FileCheck, title: 'Documentation & Traceability', description: 'Complete documentation and traceability for all materials, processes and approvals.' },
  { icon: RefreshCw, title: 'Continuous Improvement', description: 'Regular audits, feedback loops and corrective actions to drive ongoing quality enhancement.' },
  { icon: BarChart3, title: 'Performance Monitoring', description: 'Real-time quality metrics and KPI tracking across all active projects.' },
]

export default function Quality() {
  return (
    <>
      <SEO title="Quality Assurance" description="Our commitment to ISO-certified quality management and continuous improvement." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-accent mb-4">Quality Assurance</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl">
                Excellence is not an act — it's a habit. Our quality systems ensure every project meets the highest standards.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading title="Our Quality Standards" subtitle="ISO-certified processes that guarantee exceptional project outcomes." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-t-4 border-t-[var(--color-gold)] border-b border-l border-r border-border shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-accent mb-2">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-surface">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading title="Quality Process" subtitle="How we ensure quality at every stage of your project." centered={false} />
            <div className="space-y-8">
              {[
                { step: '01', title: 'Planning & Design Review', desc: 'Thorough review of designs, specifications and requirements before commencement.' },
                { step: '02', title: 'Material Verification', desc: 'All materials are sourced from approved suppliers and tested for compliance.' },
                { step: '03', title: 'In-Process Inspection', desc: 'Regular inspections during construction to verify workmanship and compliance.' },
                { step: '04', title: 'Testing & Commissioning', desc: 'Comprehensive testing of all systems and structures before handover.' },
                { step: '05', title: 'Handover & Documentation', desc: 'Complete as-built documentation, warranties and maintenance manuals provided.' },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-accent">{item.title}</h3>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
