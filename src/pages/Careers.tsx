import { useState } from 'react'
import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { CTASection } from '../components/home/CTASection'
import { VACANCIES } from '../constants/company'
import { motion } from 'framer-motion'
import { MapPin, Clock, Briefcase, Upload, Send } from 'lucide-react'

export default function Careers() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <SEO title="Careers" description="Join the Intona Constructions team — explore vacancies and apply today." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Careers</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl">
                Build your career with a company that values excellence, innovation and people.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading title="Open Positions" subtitle="Join our team of 200+ professionals shaping the future of construction." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VACANCIES.map((vacancy, i) => (
              <Card key={vacancy.id} delay={i * 0.1}>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-accent mb-2">{vacancy.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-secondary">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {vacancy.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {vacancy.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {vacancy.type}</span>
                  </div>
                  <p className="text-sm text-secondary mb-4">{vacancy.description}</p>
                  <ul className="space-y-1 mb-6">
                    {vacancy.requirements.map((req) => (
                      <li key={req} className="text-xs text-secondary flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span> {req}
                      </li>
                    ))}
                  </ul>
                  <Button size="md" onClick={() => setSelected(selected === vacancy.id ? null : vacancy.id)}>
                    {selected === vacancy.id ? 'Close' : 'Apply Now'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {selected && (
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-accent mb-6">Application Form</h2>
              <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input id="app-name" label="Full Name" placeholder="Your name" />
                  <Input id="app-email" type="email" label="Email" placeholder="your@email.com" />
                </div>
                <Input id="app-phone" type="tel" label="Phone" placeholder="+256 700 000 000" />
                <Textarea id="app-cover" label="Cover Letter" placeholder="Tell us why you're a great fit..." />
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-secondary">Upload CV (PDF, DOC — Max 10MB)</p>
                </div>
                <Button type="submit" size="lg">
                  <Send className="w-4 h-4 mr-2" /> Submit Application
                </Button>
              </form>
            </motion.div>
          </Container>
        </Section>
      )}

      <CTASection />
    </>
  )
}
