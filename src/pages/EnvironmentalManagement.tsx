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

export default function EnvironmentalManagement() {
  return (
    <>
      <SEO 
        title="Environmental Management"
        description="Intona Constructions' comprehensive environmental commitment including sustainability, climate action, and ecological stewardship."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Environmental Management</h1>
            <p className="text-xl text-white/80">Building for today, protecting tomorrow</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <p className="text-lg text-secondary leading-relaxed mb-12">
            Environmental stewardship is integral to our operations. We proactively manage environmental impacts, 
            reduce our carbon footprint, and contribute to Kenya's sustainability goals.
          </p>

          {/* Environmental Commitments */}
          <h2 className="text-3xl font-bold text-accent mb-8">Our Environmental Commitments</h2>
          <div className="space-y-8 mb-16">
            {[
              {
                title: 'EIA Compliance',
                icon: '📋',
                description: 'Full Environmental Impact Assessment compliance for all projects. We conduct thorough environmental due diligence, engage with stakeholders, and implement mitigation measures.',
              },
              {
                title: 'Dust & Noise Management',
                icon: '💨',
                description: 'Advanced dust suppression systems and noise reduction measures. We monitor air quality, control construction noise, and minimize disruption to surrounding communities.',
              },
              {
                title: 'Fuel Efficiency',
                icon: '⛽',
                description: 'Optimized fleet management and equipment usage. We invest in fuel-efficient machinery, regular maintenance, and driver training to reduce consumption and emissions.',
              },
              {
                title: 'Water Conservation',
                icon: '💧',
                description: 'Smart water management across all sites. We implement rainwater harvesting, recycled water systems, and efficient water usage in construction processes.',
              },
              {
                title: 'Vegetation Protection',
                icon: '🌿',
                description: 'Biodiversity conservation and habitat protection. We identify sensitive ecosystems, implement exclusion zones, and restore vegetation post-construction.',
              },
              {
                title: 'Worksite Rehabilitation',
                icon: '🌍',
                description: 'Comprehensive site restoration. All project sites are rehabilitated to appropriate environmental standards, with landscaping and erosion control measures.',
              },
            ].map((commitment, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 items-start border-l-4 border-primary pl-6 py-4"
              >
                <div className="text-5xl">{commitment.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">{commitment.title}</h3>
                  <p className="text-secondary leading-relaxed">{commitment.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sustainability Initiatives */}
          <h2 className="text-3xl font-bold text-accent mb-8 mt-16">Sustainability Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Renewable Energy',
                items: ['Solar power on sites', 'Energy-efficient equipment', 'LED lighting systems', 'Battery-powered tools'],
              },
              {
                title: 'Waste Management',
                items: ['Waste segregation', 'Material recycling', 'Hazardous waste handling', 'Landfill diversion'],
              },
              {
                title: 'Carbon Footprint',
                items: ['Emissions monitoring', 'Fleet optimization', 'Local sourcing', 'Carbon offset programs'],
              },
              {
                title: 'Community Impact',
                items: ['Tree planting programs', 'Ecosystem restoration', 'Environmental education', 'Stakeholder engagement'],
              },
            ].map((initiative, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20"
              >
                <h3 className="text-xl font-bold text-accent mb-4">{initiative.title}</h3>
                <ul className="space-y-2">
                  {initiative.items.map((item, i) => (
                    <li key={i} className="text-secondary flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Our Vision for Sustainability</h3>
            <p className="text-secondary leading-relaxed mb-4">
              We envision construction that enhances rather than diminishes our environment. Through proactive environmental 
              management, innovation, and stakeholder collaboration, we're building a sustainable future for Kenya.
            </p>
            <p className="text-secondary leading-relaxed">
              Every project is an opportunity to demonstrate environmental leadership and contribute to climate action.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
