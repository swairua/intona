import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { NewsList } from '../components/news/NewsList'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'

export default function News() {
  return (
    <>
      <SEO title="News" description="Latest news, project updates and industry insights from Intona Constructions." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-4">News & Updates</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                Stay informed with the latest from Intona Constructions Ltd.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <NewsList />
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
