import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Search, Phone } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { NAV_ITEMS } from '../../constants/navigation'
import { COMPANY } from '../../constants/company'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent',
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-2 z-50">
            <span className={cn(
              'text-2xl md:text-3xl font-black tracking-tight transition-colors',
              scrolled ? 'text-accent' : 'text-white',
            )}>
              INTONA
            </span>
            <span className={cn(
              'text-xs font-medium tracking-widest uppercase hidden sm:block transition-colors',
              scrolled ? 'text-secondary' : 'text-white/80',
            )}>
              Constructions
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveMega(item.label)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1',
                    location.pathname === item.href
                      ? scrolled ? 'text-primary' : 'text-primary'
                      : scrolled ? 'text-accent hover:text-primary' : 'text-white/90 hover:text-white',
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeMega === item.label && 'rotate-180',
                    )} />
                  )}
                </Link>
                {item.children && activeMega === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-border p-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-3 text-sm text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <Button variant="ghost" size="sm" className={scrolled ? 'text-accent' : 'text-white'}>
              <Search className="w-4 h-4" />
            </Button>
            <Link to="/request-quotation">
              <Button size="md" className="shadow-xl shadow-primary/25">
                Get a Quote
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'xl:hidden z-50 p-2 rounded-lg transition-colors',
              scrolled ? 'text-accent' : 'text-white',
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden fixed inset-0 top-0 bg-white z-40 overflow-y-auto"
          >
            <div className="pt-24 pb-8 px-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    className="block py-4 text-lg font-semibold text-accent border-b border-border"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-3 text-base text-secondary hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8 space-y-3">
                <Link to="/request-quotation" className="block w-full" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="w-full shadow-xl shadow-primary/25">
                    Get a Quote
                  </Button>
                </Link>
                <a href={`tel:${COMPANY.phone}`} className="block w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    <Phone className="w-4 h-4 mr-2" /> Call Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
