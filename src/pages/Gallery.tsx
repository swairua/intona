import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { GalleryGrid } from '../components/gallery/GalleryGrid'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'

export default function Gallery() {
  return (
    <>
      <SEO title="Gallery" description="View our project gallery showcasing construction excellence across sectors." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Gallery</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                A visual journey through our projects and operations.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <GalleryGrid />
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
