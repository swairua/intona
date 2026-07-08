import { useState, useEffect } from 'react'
import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { EquipmentCard } from '../components/equipment/EquipmentCard'
import { CTASection } from '../components/home/CTASection'
import { getEquipment } from '../api/equipment'
import type { Equipment } from '../types'
import { motion } from 'framer-motion'

export default function Equipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([])

  useEffect(() => { getEquipment().then(setEquipment).catch(() => {}) }, [])
  return (
    <>
      <SEO title="Equipment" description="Explore our fleet of modern construction machinery and equipment." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-4">Our Equipment</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                Modern machinery fleet for efficient and quality project execution.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading
            title="Construction Machinery"
            subtitle="State-of-the-art equipment to handle projects of any scale and complexity."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {equipment.map((item, i) => (
              <EquipmentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
