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
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set())
  const location = useLocation()

  const toggleMobileExpand = (label: string) => {
    const newExpanded = new Set(expandedMobileItems)
    if (newExpanded.has(label)) {
      newExpanded.delete(label)
    } else {
      newExpanded.add(label)
    }
    setExpandedMobileItems(newExpanded)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
    setExpandedMobileItems(new Set())
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
        <div className="flex items-center justify-between h-20 md:h-24 px-4 sm:px-6">
          <Link to="/" className="flex items-center z-50 h-20 xl:h-48 mr-4 sm:mr-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F6fa2b67a369a4cabbee7a4d7f8558488%2F81d56599669b45b096087813285659d3?format=webp&width=200"
              alt="Intona Constructions"
              className="h-16 md:h-20 xl:h-48 w-auto object-contain"
            />
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
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1',
                    location.pathname === item.href
                      ? scrolled ? 'text-primary font-semibold' : 'text-primary font-semibold'
                      : scrolled ? 'text-accent/80 hover:text-primary hover:font-semibold' : 'text-white/80 hover:text-white hover:font-semibold',
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
              'xl:hidden z-50 p-2.5 rounded-lg transition-all duration-200 relative group',
              scrolled
                ? 'text-accent hover:bg-gray-100'
                : 'text-white hover:bg-white/10',
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="xl:hidden fixed inset-0 top-0 bg-black/50 z-30"
            />

            {/* Left slide drawer */}
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="xl:hidden fixed left-0 top-0 h-screen w-72 sm:w-80 bg-white z-40 overflow-y-auto shadow-2xl"
            >
              <div className="pt-24 pb-8 px-4 sm:px-6 space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isExpanded = expandedMobileItems.has(item.label)

                  return (
                    <div key={item.href}>
                      <div className="flex items-center gap-2">
                        <Link
                          to={item.href}
                          className={cn(
                            'flex-1 py-3 px-4 text-base font-semibold rounded-lg transition-all duration-200',
                            location.pathname === item.href
                              ? 'text-primary bg-primary/10'
                              : 'text-accent hover:text-primary hover:bg-gray-50',
                          )}
                          onClick={() => {
                            if (!item.children) setMobileOpen(false)
                          }}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <button
                            onClick={() => toggleMobileExpand(item.label)}
                            className="pr-3 text-primary hover:text-primary-dark transition-transform duration-200 p-2"
                            aria-expanded={isExpanded}
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </button>
                        )}
                      </div>

                      {item.children && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-2 sm:pl-4 overflow-hidden space-y-1"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={cn(
                                'block py-2.5 px-4 text-sm rounded-lg transition-all duration-200',
                                location.pathname === child.href
                                  ? 'text-primary font-medium bg-primary/5'
                                  : 'text-secondary hover:text-primary hover:bg-gray-50',
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-border mx-4 sm:mx-6 my-6" />

              <div className="px-4 sm:px-6 space-y-3 pb-8">
                <Link to="/request-quotation" className="block" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="w-full shadow-xl shadow-primary/25">
                    Get a Quote
                  </Button>
                </Link>
                <a href={`tel:${COMPANY.phone}`} className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    <Phone className="w-4 h-4 mr-2" /> Call Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
