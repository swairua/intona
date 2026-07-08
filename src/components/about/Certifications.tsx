import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { CERTIFICATIONS } from '../../constants/company'
import { Award } from 'lucide-react'

export function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-surface">
      <Container>
        <Heading
          title="Certifications & Accreditations"
          subtitle="Our commitment to quality and compliance is validated by industry-leading certifications."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-accent mb-2">{cert.title}</h3>
              <p className="text-sm text-secondary">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
