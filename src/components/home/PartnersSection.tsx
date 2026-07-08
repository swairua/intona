import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'

const PARTNERS = [
  {
    id: 1,
    name: 'Kenya Rural Roads Authority',
    logo: 'https://cdn.builder.io/api/v1/image/assets%2F2e1b29dcc9aa4c3abf66ffea21abf48e%2F02864bd2356d4fa6a18bd87e9d307fc5?format=webp&width=800&height=1200',
  },
  {
    id: 2,
    name: 'NGO Foundation',
    logo: 'https://cdn.builder.io/api/v1/image/assets%2F2e1b29dcc9aa4c3abf66ffea21abf48e%2F2348ee6d9acd4626a41aecd2be3d99c7?format=webp&width=800&height=1200',
  },
  {
    id: 3,
    name: 'County Government',
    logo: 'https://cdn.builder.io/api/v1/image/assets%2F2e1b29dcc9aa4c3abf66ffea21abf48e%2F2b3171060c434de6968bbd348dc3a806?format=webp&width=800&height=1200',
  },
  {
    id: 4,
    name: 'County Assembly',
    logo: 'https://cdn.builder.io/api/v1/image/assets%2F2e1b29dcc9aa4c3abf66ffea21abf48e%2Fdff6579ca2064f0281dc35d3a86c492b?format=webp&width=800&height=1200',
  },
  {
    id: 5,
    name: 'Community Development',
    logo: 'https://cdn.builder.io/api/v1/image/assets%2F2e1b29dcc9aa4c3abf66ffea21abf48e%2F6ad8bfa9093746c5ac8489805b090a29?format=webp&width=800&height=1200',
  },
]

export function PartnersSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 partners-section">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <Heading level="h2" className="mb-4">
            Our Trusted Partners
          </Heading>
          <p className="text-base sm:text-lg text-secondary max-w-2xl mx-auto">
            We work with leading government institutions and organizations to deliver quality infrastructure and construction solutions across Kenya.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="partner-logo-wrapper"
            >
              <div className="h-24 sm:h-28 flex items-center justify-center p-4 rounded-2xl bg-white border border-border/30 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm text-secondary text-center mt-3 font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
