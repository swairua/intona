import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ChevronRight, Send, Building2, Wrench, Zap } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { COMPANY } from '../../constants/company'
import { FOOTER_LINKS, FOOTER_SERVICES } from '../../constants/navigation'

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-accent to-accent/95 text-white relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />

      {/* Brand Story Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 border-b border-white/10"
      >
        <Container className="py-12 sm:py-16">
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>
              Built on <span className="text-primary">Excellence</span> &amp; <span className="text-primary">Trust</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Founded in 2015, Intona Constructions Limited has become a trusted partner in delivering innovative, reliable, and sustainable
              infrastructure solutions across Kenya. We don't just build structures—we build opportunities, strengthen communities, and engineer Kenya's future.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { icon: Building2, title: 'Quality First', desc: 'Engineering excellence in every project' },
              { icon: Wrench, title: 'Trusted Partners', desc: 'Delivering on time, within budget' },
              { icon: Zap, title: 'Sustainable Impact', desc: 'Building responsible infrastructure' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                </div>
              )
            })}
          </motion.div>
        </Container>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Container className="py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-2">
              <Link to="/" className="inline-block mb-6 h-12 sm:h-14">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F6fa2b67a369a4cabbee7a4d7f8558488%2F81d56599669b45b096087813285659d3?format=webp&width=200"
                  alt="Intona Construction Limited"
                  className="h-full w-auto object-contain"
                />
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
                {COMPANY.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: 'Address', value: COMPANY.address },
                  { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                  { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                  { icon: Clock, label: 'Hours', value: COMPANY.workingHours },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    variants={itemVariants}
                    className="flex items-start gap-2 group p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4 text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors duration-200 break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-300 break-words">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">Services</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {FOOTER_SERVICES.map((service) => (
                  <motion.li
                    key={service.label}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={service.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 text-xs sm:text-sm flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {service.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white">Connect</h4>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
                Subscribe for project updates and industry insights.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 flex-col mb-6">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Your email"
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                />
                <Button type="submit" size="sm" className="w-full group">
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div>
                <h5 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3">Follow</h5>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {[
                    { label: 'LinkedIn', href: COMPANY.social.linkedin },
                    { label: 'Facebook', href: COMPANY.social.facebook },
                    { label: 'Twitter', href: COMPANY.social.twitter },
                    { label: 'Instagram', href: COMPANY.social.instagram },
                    { label: 'YouTube', href: COMPANY.social.youtube },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white border border-white/10 hover:border-primary transition-all duration-300"
                      aria-label={social.label}
                    >
                      <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-white/10 relative z-10"
      >
        <Container className="py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 flex-wrap justify-center">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors duration-200">Terms of Service</Link>
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors duration-200 flex items-center justify-center gap-1 group"
            >
              Back to top
              <ArrowUpRight className="w-3 h-3 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
            </motion.button>
          </div>
        </Container>
      </motion.div>
    </footer>
  )
}
