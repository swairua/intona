import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'

const CLIENTS = [
  'Ministry of Works', 'UNRA', 'Kampala City Council', 'East African Development Bank',
  'Uganda Investment Authority', 'Ministry of Education', 'Ministry of Health',
  'National Water & Sewerage',
]

export function ClientCarousel() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          title="Our Clients & Partners"
          subtitle="Trusted by leading government agencies, NGOs and private enterprises."
        />
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-8"
          >
            <div className="flex gap-8 animate-scroll">
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <div
                  key={`${client}-${i}`}
                  className="flex-shrink-0 w-48 h-20 bg-surface rounded-2xl border border-border flex items-center justify-center px-6"
                >
                  <span className="text-sm font-bold text-secondary text-center">{client}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
