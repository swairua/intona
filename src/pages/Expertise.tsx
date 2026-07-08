import { SEO } from '../components/seo/SEO'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
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
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden pt-20 expertise-hero-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-accent/90 to-accent/80 z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F7ea274c04f374b529778cd0cdf834ff6?format=webp&width=1920)'}} />
        
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
                  <Card variant="premium" delay={idx * 0.1}>
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 h-full">
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
                  </Card>
                </div>
                <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                  <img
                    src={[
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F047753769db24e5e91f7bfb612eaf949?format=webp&width=600',
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2Fbd1101b749f44231922e72387b40ec6b?format=webp&width=600',
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F4ce34cc1f7674d679ed4b0bdd0162e33?format=webp&width=600',
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F59dad5403e67408097449e7180418680?format=webp&width=600',
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F1faf6fe8df394827ac262dfdcc8d5a6b?format=webp&width=600',
                      'https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F4cbd85c3202a4b42b03c6472f85aed7b?format=webp&width=600',
                    ][idx]}
                    alt={service.title}
                    className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <Card variant="premium">
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-primary/10">
              <h3 className="text-2xl font-bold text-accent mb-4">Why Choose Our Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-secondary">✓ Proven track record across 100+ projects</p>
                <p className="text-secondary">✓ Certified professionals and specialists</p>
                <p className="text-secondary">✓ Latest technology and equipment</p>
                <p className="text-secondary">✓ Sustainable and ethical practices</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </>
  )
}
