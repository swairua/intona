import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Phone } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { COMPANY } from '../../constants/company'

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
            Ready to Build Your{' '}
            <span className="text-white underline decoration-white/30">Vision</span>?
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            Partner with Intona Constructions Ltd for your next project.
            Let's discuss how we can bring your vision to life with quality and excellence.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/request-quotation" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 shadow-2xl group">
                Request a Quote <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={`tel:${COMPANY.phone}`} className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full text-white border border-white/30 hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" /> Call Us
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
