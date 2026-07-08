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

export default function RoadAhead() {
  return (
    <>
      <SEO 
        title="The Road Ahead"
        description="Intona Constructions' strategic vision for 2026 and beyond, focusing on growth, innovation, sustainability, and market expansion."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">The Road Ahead</h1>
            <p className="text-xl text-white/80">Our vision for 2026 and beyond</p>
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
            Intona Constructions is positioned for significant growth and impact. Our strategic priorities for 2026 and beyond 
            reflect our commitment to becoming Kenya's most trusted construction partner while driving national development.
          </p>

          {/* Strategic Priorities */}
          <h2 className="text-3xl font-bold text-accent mb-8">Strategic Priorities 2026+</h2>
          <div className="space-y-8 mb-16">
            {[
              {
                number: '1',
                title: 'Expand Project Scale',
                description: 'We are targeting larger, more complex infrastructure and development projects. By 2026, we aim to be executing projects worth billions of shillings, from mega-infrastructure to large commercial developments.',
              },
              {
                number: '2',
                title: 'Deepen Partnerships',
                description: 'Strategic partnerships with local and international organizations strengthen our capabilities. We\'re building alliances with government bodies, development agencies, and private sector leaders.',
              },
              {
                number: '3',
                title: 'Invest in Technology',
                description: 'Digital transformation and advanced construction technology will enhance efficiency and quality. We\'re adopting BIM, AI-powered project management, drone surveys, and IoT monitoring.',
              },
              {
                number: '4',
                title: 'Champion Sustainability',
                description: 'By 2026, all our projects will integrate sustainability principles from inception. We\'re targeting carbon-neutral operations and positioning ourselves as industry sustainability leaders.',
              },
              {
                number: '5',
                title: 'Grow Local Footprint',
                description: 'While maintaining our Nairobi headquarters, we\'re expanding regional presence in Mombasa, Kisumu, and other strategic centers to serve clients nationwide and capture market opportunities.',
              },
            ].map((priority, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {priority.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">{priority.title}</h3>
                  <p className="text-secondary leading-relaxed">{priority.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Initiatives */}
          <h2 className="text-3xl font-bold text-accent mb-8 mt-16">Key Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Innovation Lab',
                icon: '🔬',
                items: ['R&D in construction tech', 'Process improvements', 'New service offerings', 'Pilot projects'],
              },
              {
                title: 'Talent Development',
                icon: '👨‍💼',
                items: ['Graduate programs', 'Professional certifications', 'Leadership training', 'Industry partnerships'],
              },
              {
                title: 'Market Expansion',
                icon: '🗺️',
                items: ['Regional offices', 'New service lines', 'International partnerships', 'Market research'],
              },
              {
                title: 'Sustainability Goals',
                icon: '🌱',
                items: ['Carbon neutrality', 'Green certifications', 'Community programs', 'Environmental impact'],
              },
            ].map((initiative, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20"
              >
                <div className="text-4xl mb-4">{initiative.icon}</div>
                <h3 className="text-xl font-bold text-accent mb-4">{initiative.title}</h3>
                <ul className="space-y-2">
                  {initiative.items.map((item, i) => (
                    <li key={i} className="text-secondary flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Long-term Vision */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 mb-12"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Our Long-term Vision</h3>
            <p className="text-secondary leading-relaxed mb-4">
              By 2030, Intona Constructions will be recognized as:
            </p>
            <ul className="space-y-3">
              {[
                'Kenya\'s most trusted construction partner for quality, innovation, and integrity',
                'A leader in sustainable, technology-enabled construction practices',
                'A major contributor to Kenya\'s infrastructure development and economic growth',
                'An exemplary employer known for developing talent and creating opportunities',
                'A company that builds not just structures, but communities and futures',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✦</span>
                  <span className="text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Join Us on This Journey</h3>
            <p className="text-secondary leading-relaxed">
              We invite clients, partners, employees, and communities to join us as we build Kenya's future. Together, 
              we can create lasting infrastructure, drive innovation, empower people, and contribute to a more prosperous and sustainable nation.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
