import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { CompanyHistory } from '../components/about/CompanyHistory'
import { MissionVision } from '../components/about/MissionVision'
import { CoreValues } from '../components/about/CoreValues'
// WhyChooseUs is defined inline below
import { CompanyTimeline } from '../components/about/CompanyTimeline'
import { ManagementTeam } from '../components/about/ManagementTeam'
import { Certifications } from '../components/about/Certifications'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'
import { Shield, Award, Clock, Users, ThumbsUp, Building2 } from 'lucide-react'

const REASONS = [
  { icon: Award, title: 'Proven Track Record', description: '120+ successful projects delivered on time and within budget.' },
  { icon: Users, title: 'Expert Team', description: '200+ skilled professionals including 50+ engineers.' },
  { icon: Shield, title: 'Certified Quality', description: 'ISO 9001:2015, ISO 14001:2015 and OHSAS 18001 certified.' },
  { icon: Clock, title: 'Timely Delivery', description: 'Consistent track record of completing projects ahead of schedule.' },
  { icon: ThumbsUp, title: 'Client Satisfaction', description: '80+ happy clients with 95% repeat business rate.' },
  { icon: Building2, title: 'Modern Equipment', description: 'State-of-the-art machinery fleet for efficient execution.' },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">Why Choose Intona?</h2>
            <div className="mt-4 h-1 w-20 bg-primary rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-surface hover:bg-primary/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-accent mb-1">{reason.title}</h3>
                  <p className="text-sm text-secondary">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about Intona Constructions Ltd's history, mission, team and certifications." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-accent mb-4">About Us</h1>
              <p className="text-xl text-secondary max-w-2xl">
                Building excellence since 2010 — a legacy of quality, innovation and trust.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>
      <CompanyHistory />
      <MissionVision />
      <CoreValues />
      <WhyChooseUs />
      <CompanyTimeline />
      <ManagementTeam />
      <Certifications />
      <CTASection />
    </>
  )
}
