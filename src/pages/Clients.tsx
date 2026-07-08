import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { ClientCarousel } from '../components/clients/ClientCarousel'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'
import { Building2, Landmark, Heart, Briefcase } from 'lucide-react'

const CLIENT_GROUPS = [
  { icon: Landmark, title: 'Government Agencies', clients: ['Ministry of Works', 'UNRA', 'Kampala City Council', 'Ministry of Education', 'Ministry of Health', 'National Water'] },
  { icon: Heart, title: 'NGOs & Development Partners', clients: ['World Bank', 'African Development Bank', 'UNDP', 'UNICEF'] },
  { icon: Briefcase, title: 'Private Sector', clients: ['Kampala Properties Ltd', 'Prime Living Ltd', 'Uganda Breweries', 'Stanbic Bank', 'Airtel Uganda'] },
  { icon: Building2, title: 'International Clients', clients: ['East African Community', 'African Union', 'Total Energies'] },
]

export default function Clients() {
  return (
    <>
      <SEO title="Clients & Partners" description="Trusted by leading government agencies, NGOs and private enterprises across the region." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-accent mb-4">Our Clients</h1>
              <p className="text-xl text-secondary max-w-2xl">
                Trusted by government agencies, NGOs and private enterprises across the region.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading title="Who We Work With" subtitle="Proud to serve a diverse range of clients across sectors." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLIENT_GROUPS.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <group.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-accent">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.clients.map((client) => (
                    <span key={client} className="px-3 py-1.5 bg-surface rounded-lg text-sm text-secondary">
                      {client}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <ClientCarousel />
      <CTASection />
    </>
  )
}
