import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { getTestimonials } from '../../api/testimonials'
import type { Testimonial } from '../../types'

export function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    getTestimonials().then(setTestimonials).catch(() => {})
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (testimonials.length === 0) return null

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section className="py-20 md:py-32 bg-surface relative overflow-hidden">
      <Container>
        <Heading
          title="What Our Clients Say"
          subtitle="Hear from the clients and partners who have trusted us with their most important projects."
        />

        <div className="relative max-w-4xl mx-auto mt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
            >
              {/* Testimonial Content */}
              <div className="p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <Quote className="w-12 h-12 text-primary/15 mb-8" />
                  <p className="text-lg md:text-xl text-accent leading-relaxed mb-10 italic font-light">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-accent">{t.name}</h4>
                    <p className="text-sm text-secondary">{t.role}, {t.company}</p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Image */}
              {t.image && (
                <div className="hidden md:block h-full min-h-96 overflow-hidden">
                  <img
                    src={t.image}
                    alt={`${t.name}'s project`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
