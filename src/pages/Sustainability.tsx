import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'
import { Leaf, Recycle, Sun, Trees, Heart, Globe } from 'lucide-react'

const INITIATIVES = [
  { icon: Leaf, title: 'Environmental Policy', description: 'We minimize environmental impact through responsible sourcing, waste reduction and pollution control measures across all operations.' },
  { icon: Sun, title: 'Green Building', description: 'Design and construction of energy-efficient buildings with sustainable materials, natural lighting and green certifications.' },
  { icon: Recycle, title: 'Waste Management', description: 'Comprehensive waste segregation, recycling programs and responsible disposal to minimize landfill contribution.' },
  { icon: Trees, title: 'Energy Efficiency', description: 'Implementation of energy-efficient systems, solar power integration and smart building technologies in our projects.' },
  { icon: Heart, title: 'CSR Projects', description: 'Community development initiatives including school construction, healthcare facilities and skills training programs.' },
  { icon: Globe, title: 'Carbon Footprint', description: 'Active monitoring and reduction of carbon emissions through efficient logistics, equipment and construction methods.' },
]

export default function Sustainability() {
  return (
    <>
      <SEO title="Sustainability" description="Our commitment to sustainable construction and environmental responsibility." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Sustainability</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl">
                Building a better future through responsible construction and environmental stewardship.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading title="Our Sustainability Initiatives" subtitle="Integrating environmental responsibility into every aspect of our operations." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIATIVES.map((item, i) => (
              <Card key={item.title} variant="premium" delay={i * 0.1}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-2">{item.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-surface">
        <Container>
          <Heading title="Our Environmental Impact" subtitle="Measurable commitments to a sustainable future." />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { value: '35%', label: 'Carbon Reduction' },
              { value: '60%', label: 'Waste Recycled' },
              { value: '500+', label: 'Trees Planted' },
              { value: '100%', label: 'ISO 14001 Compliant' },
            ].map((stat, i) => (
              <Card key={stat.label} variant="premium" delay={i * 0.1}>
                <div className="p-4 sm:p-8 text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-green-600">{stat.value}</div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-secondary font-medium">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
