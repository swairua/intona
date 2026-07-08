import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-accent/90 to-accent/80 z-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f4?w=1920')] bg-cover bg-center bg-fixed" />

      <Container className="relative z-20 w-full px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Established 2010
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
          >
            Building
            <br className="hidden sm:block" />
            <span className="text-primary">Excellence.</span>
            <br className="hidden sm:block" />
            Delivering{' '}
            <span className="text-primary">Quality.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            Intona Constructions Ltd delivers innovative, reliable and sustainable construction
            solutions across residential, commercial and infrastructure projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center"
          >
            <Link to="/request-quotation" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-primary/30 group">
                Get a Quote
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-accent">
                View Projects
              </Button>
            </Link>
            <button className="hidden sm:inline-flex items-center justify-center gap-3 px-6 py-3 text-white/70 hover:text-white transition-colors">
              <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Play className="w-5 h-5 ml-0.5" />
              </span>
              <span className="text-sm font-medium">Watch Our Work</span>
            </button>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
