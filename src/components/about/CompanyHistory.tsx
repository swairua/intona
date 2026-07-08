import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'

export function CompanyHistory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          title="Our Story"
          subtitle="From humble beginnings to industry leadership — our journey of building excellence."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6">
            Founded in 2010, Intona Constructions Ltd has grown from a small contracting firm into one of
            the region's most respected construction and civil engineering companies. Our journey has been
            defined by a relentless commitment to quality, safety, and client satisfaction.
          </p>
          <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6">
            Over the past 15+ years, we have successfully delivered over 120 projects spanning residential,
            commercial, industrial, and infrastructure sectors. Each project reflects our dedication to
            excellence and our ability to overcome complex engineering challenges.
          </p>
          <p className="text-base sm:text-lg text-secondary leading-relaxed">
            Today, with a team of over 200 skilled professionals and a fleet of modern construction equipment,
            we continue to push boundaries, embracing innovation and sustainable practices to build a better future.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
