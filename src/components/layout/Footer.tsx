import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ChevronRight, Send } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { COMPANY } from '../../constants/company'
import { FOOTER_LINKS, FOOTER_SERVICES } from '../../constants/navigation'

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-accent text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />

      <Container className="py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6 h-14 sm:h-16">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F6fa2b67a369a4cabbee7a4d7f8558488%2F81d56599669b45b096087813285659d3?format=webp&width=200"
                alt="Intona Constructions"
                className="h-full w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              {COMPANY.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-4">
              {[
                { icon: MapPin, label: 'Address', value: COMPANY.address },
                { icon: Phone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Clock, label: 'Hours', value: COMPANY.workingHours },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-2 group">
                  <Icon className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-xs sm:text-sm text-gray-300 hover:text-primary transition-colors break-all">
                        {value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-300 break-words">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-4 sm:mb-6">Newsletter</h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Subscribe for project updates and industry insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
              <Button type="submit" size="sm" className="shrink-0 w-full sm:w-auto">
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 sm:mt-8">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-4">Follow Us</h4>
              <div className="flex gap-2 sm:gap-3">
                {[
                  { label: 'LinkedIn', href: COMPANY.social.linkedin },
                  { label: 'Facebook', href: COMPANY.social.facebook },
                  { label: 'Twitter', href: COMPANY.social.twitter },
                  { label: 'Instagram', href: COMPANY.social.instagram },
                  { label: 'YouTube', href: COMPANY.social.youtube },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label={social.label}
                  >
                    <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 flex-wrap justify-center">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
            <button
              onClick={scrollToTop}
              className="text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              Back to top
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </Container>
      </div>
    </footer>
  )
}
