import { useState, useEffect } from 'react'
import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Card } from '../components/ui/Card'
import { CTASection } from '../components/home/CTASection'
import { getTestimonials } from '../api/testimonials'
import type { Testimonial } from '../types'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => { getTestimonials().then(setTestimonials).catch(() => {}) }, [])
  return (
    <>
      <SEO title="Testimonials" description="Hear from our clients about their experience working with Intona Constructions Ltd." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-4">Testimonials</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                Don't just take our word for it — hear from our clients.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <Card key={t.id} variant="premium" delay={i * 0.1}>
                <div className="p-5 sm:p-8">
                  <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-primary/20 mb-3 sm:mb-4" />
                  <p className="text-accent text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs sm:text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-accent text-sm sm:text-base">{t.name}</h4>
                      <p className="text-xs sm:text-sm text-secondary">{t.role}, {t.company}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
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
