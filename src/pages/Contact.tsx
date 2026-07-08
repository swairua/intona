import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactMap } from '../components/contact/ContactMap'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { COMPANY } from '../constants/company'

const CONTACT_DETAILS = [
  { icon: MapPin, label: 'Office Address', value: COMPANY.address },
  { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Clock, label: 'Working Hours', value: COMPANY.workingHours },
]

export default function Contact() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Intona Constructions Ltd for your construction needs." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-4">Contact Us</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                Ready to start your project? Get in touch with our team.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {CONTACT_DETAILS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-surface hover:shadow-md transition-shadow"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-xs sm:text-sm">{item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-xs sm:text-sm text-secondary hover:text-primary transition-colors break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm text-secondary">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-surface">
        <Container>
          <ContactMap />
        </Container>
      </Section>
    </>
  )
}
