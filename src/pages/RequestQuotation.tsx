import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { QuotationForm } from '../components/quotation/QuotationForm'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, MessageCircle } from 'lucide-react'

const BENEFITS = [
  { icon: Clock, title: 'Response within 24 hours', description: 'Our team reviews every inquiry promptly.' },
  { icon: CheckCircle, title: 'Free consultation', description: 'Initial consultation and site visit at no cost.' },
  { icon: MessageCircle, title: 'Detailed proposal', description: 'Comprehensive quotation with scope, timeline and budget.' },
]

export default function RequestQuotation() {
  return (
    <>
      <SEO title="Request a Quotation" description="Request a detailed quotation for your construction project from Intona Constructions Ltd." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Request a Quotation</h1>
              <p className="text-xl text-secondary max-w-2xl">
                Tell us about your project and we'll provide a detailed, no-obligation quotation.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="space-y-6 lg:sticky lg:top-28">
                {BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-2xl bg-surface"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent">{benefit.title}</h4>
                      <p className="text-sm text-secondary">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 order-1 lg:order-2">
              <QuotationForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
