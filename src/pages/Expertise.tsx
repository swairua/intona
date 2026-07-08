import { SEO } from '../components/seo/SEO'
import { Container } from '../components/ui/Container'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function Expertise() {
  return (
    <>
      <SEO 
        title="Our Expertise"
        description="Comprehensive construction capabilities spanning civil engineering, building construction, electrical infrastructure, renewable energy, and water systems."
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-accent/90 to-accent/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920')] bg-cover bg-center" />
        
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Expertise</h1>
            <p className="text-xl text-white/80">Six core service areas delivering transformative solutions</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="max-w-5xl mx-auto"
        >
          <p className="text-lg text-secondary leading-relaxed mb-16 text-center">
            Intona Constructions leverages decades of expertise across six core service areas, 
            each supported by specialized teams, proven methodologies, and cutting-edge technology.
          </p>

          <div className="space-y-12">
            {[
              {
                title: 'Civil & Road Construction',
                highlights: ['Highway construction & rehabilitation', 'Urban road networks', 'Traffic systems', 'Drainage & utilities'],
              },
              {
                title: 'Building Construction & Renovation',
                highlights: ['Residential developments', 'Commercial complexes', 'Institutional buildings', 'Heritage restoration'],
              },
              {
                title: 'Electrical Engineering & Infrastructure',
                highlights: ['Power distribution systems', 'Telecommunications networks', 'Building automation', 'Industrial installations'],
              },
              {
                title: 'Renewable Energy Systems',
                highlights: ['Solar installations', 'Wind energy projects', 'Hydroelectric schemes', 'Energy efficiency upgrades'],
              },
              {
                title: 'Water & Sewer Pipeline Infrastructure',
                highlights: ['Water supply systems', 'Wastewater treatment', 'Pipeline networks', 'Rainwater harvesting'],
              },
              {
                title: 'Construction Equipment Supply',
                highlights: ['Heavy machinery rental', 'Equipment leasing', 'Maintenance services', 'Operator training'],
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 h-full">
                    <h3 className="text-2xl font-bold text-accent mb-6">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">✓</span>
                          <span className="text-secondary">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <img
                    src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1541888946425-d81bb19240f4' : '1552664730-d307ca884978'}?w=500&h=400&fit=crop`}
                    alt={service.title}
                    className="rounded-2xl shadow-lg w-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Why Choose Our Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-secondary">✓ Proven track record across 100+ projects</p>
              <p className="text-secondary">✓ Certified professionals and specialists</p>
              <p className="text-secondary">✓ Latest technology and equipment</p>
              <p className="text-secondary">✓ Sustainable and ethical practices</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
