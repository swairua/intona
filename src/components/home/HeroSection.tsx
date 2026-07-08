import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  } as const

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-accent via-accent to-[#0a0a0a] overflow-hidden">
      {/* Decorative accent line on left */}
      <div className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-primary via-primary to-transparent" />

      {/* Subtle background accent gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Container className="h-screen flex items-center px-4 py-12 sm:py-16 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 order-2 md:order-1"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Established 2010
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-family-display)' }}
            >
              Building
              <br />
              <span className="text-primary">Excellence.</span>
              <br />
              Delivering{' '}
              <span className="text-primary">Quality.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 sm:mt-10 text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl font-light"
            >
              Intona Constructions Ltd delivers innovative, reliable and sustainable construction
              solutions across residential, commercial and infrastructure projects.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center"
            >
              <Link to="/request-quotation" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-primary/40 group">
                  Get a Quote
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-accent transition-all duration-300">
                  View Projects
                </Button>
              </Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              className="hidden md:inline-flex items-center justify-center gap-3 mt-8 text-white/70 hover:text-white transition-colors group"
            >
              <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 group-hover:border-primary transition-all duration-300">
                <Play className="w-5 h-5 ml-0.5" />
              </span>
              <span className="text-sm font-medium">Watch Our Work</span>
            </motion.button>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="relative h-96 md:h-full md:min-h-screen order-1 md:order-2 -mx-4 md:mx-0"
          >
            <div className="absolute inset-0 bg-cover bg-center rounded-lg md:rounded-none overflow-hidden hero-image-container">
              {/* Overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-accent/60" />
            </div>

            {/* Floating accent element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 right-8 w-20 h-20 rounded-lg bg-primary/20 border-2 border-primary/40 backdrop-blur-sm hidden md:block"
            />
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  )
}
