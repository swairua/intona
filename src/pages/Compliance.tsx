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

export default function Compliance() {
  return (
    <>
      <SEO 
        title="Compliance & Certifications"
        description="Intona Constructions' comprehensive compliance framework and industry certifications ensuring highest safety, health, environmental, and quality standards."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Compliance & Certifications</h1>
            <p className="text-xl text-white/80">Upholding the highest standards of excellence</p>
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
            Intona Constructions maintains comprehensive SHEQ (Safety, Health, Environment, Quality) policies and holds 
            industry certifications demonstrating our commitment to excellence and responsible business practices.
          </p>

          {/* SHEQ Pillars */}
          <h2 className="text-3xl font-bold text-accent mb-8">SHEQ Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: 'Safety',
                icon: '🛡️',
                points: ['Zero-accident culture', 'PPE requirements', 'Incident reporting', 'Emergency protocols'],
              },
              {
                title: 'Health',
                icon: '🏥',
                points: ['Medical surveillance', 'Wellness programs', 'Mental health support', 'Occupational safety'],
              },
              {
                title: 'Environment',
                icon: '🌍',
                points: ['Waste management', 'Emissions control', 'Water conservation', 'Biodiversity protection'],
              },
              {
                title: 'Quality',
                icon: '⭐',
                points: ['Quality assurance', 'Testing & inspection', 'Documentation', 'Continuous improvement'],
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-accent mb-4">{pillar.title}</h3>
                <ul className="space-y-2">
                  {pillar.points.map((point, i) => (
                    <li key={i} className="text-sm text-secondary flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Compliance Details */}
          <h2 className="text-3xl font-bold text-accent mb-8 mt-16">Compliance Standards</h2>
          <div className="space-y-6 mb-16">
            {[
              {
                title: 'Regulatory Compliance',
                items: ['National Construction Authority (NCA) registration', 'Environmental Impact Assessment (EIA) compliance', 'Building Code adherence', 'Labour law compliance'],
              },
              {
                title: 'Industry Standards',
                items: ['ISO 9001 - Quality Management', 'ISO 45001 - Occupational Health & Safety', 'ISO 14001 - Environmental Management', 'International Construction Standards'],
              },
              {
                title: 'Professional Certifications',
                items: ['FIDIC-certified practitioners', 'Professional engineer registrations', 'Safety officer certifications', 'Training and competency certifications'],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border-l-4 border-primary pl-6 py-4"
              >
                <h3 className="text-xl font-bold text-accent mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
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
            <h3 className="text-2xl font-bold text-accent mb-4">Commitment to Continuous Improvement</h3>
            <p className="text-secondary leading-relaxed">
              We view compliance not as a checkbox but as a foundation for excellence. Regular audits, staff training, 
              and stakeholder feedback help us continuously refine our practices and maintain industry-leading standards.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
