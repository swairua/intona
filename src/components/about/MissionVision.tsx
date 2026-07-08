import { motion } from 'framer-motion'
import { Container } from '../ui/Container'

export function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-accent mb-4">Our Mission</h3>
            <p className="text-secondary leading-relaxed text-lg">
              To deliver exceptional construction and engineering solutions that exceed client expectations, 
              create lasting value for communities, and set new standards for quality, safety and sustainability 
              in the construction industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-accent mb-4">Our Vision</h3>
            <p className="text-secondary leading-relaxed text-lg">
              To be the most trusted and innovative construction company in Africa, recognized for transforming 
              skylines, building sustainable infrastructure, and improving lives through world-class construction 
              excellence.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
