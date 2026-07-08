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

export default function PhilosophyDelivery() {
  return (
    <>
      <SEO 
        title="Philosophy & Delivery Model"
        description="Our philosophy and delivery model focused on client success, problem-solving, and sustainable construction practices."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Philosophy & Delivery Model</h1>
            <p className="text-xl text-white/80">How we approach every project with purpose and excellence</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-accent mb-8">Our Philosophy</h2>
          <p className="text-lg text-secondary leading-relaxed mb-8">
            At Intona Constructions, we believe that exceptional construction outcomes are achieved through deep client understanding, 
            innovative problem-solving, unwavering commitment to sustainability, and dedication to delivering results that endure.
          </p>

          {/* Guiding Principles */}
          <div className="space-y-8 mb-16">
            <h3 className="text-3xl font-bold text-accent mt-12 mb-8">Guiding Principles</h3>
            {[
              {
                title: 'Client-First Thinking',
                description: 'We prioritize understanding your unique needs and crafting solutions tailored to your vision and constraints.',
              },
              {
                title: 'Problem-Solving',
                description: 'We tackle challenges proactively, leveraging expertise and innovation to deliver effective solutions.',
              },
              {
                title: 'Sustainability',
                description: 'We integrate environmental and social responsibility into every phase of construction.',
              },
              {
                title: 'Results That Endure',
                description: 'We focus on quality that lasts, creating infrastructure and facilities built for generations.',
              },
            ].map((principle, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border-l-4 border-primary pl-6 py-4"
              >
                <h4 className="text-2xl font-bold text-accent mb-3">{principle.title}</h4>
                <p className="text-secondary">{principle.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Delivery Model */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-accent mb-8">Our Delivery Model</h3>
            <p className="text-secondary mb-12">We deliver projects through four integrated phases:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  phase: '1',
                  title: 'Engage & Understand',
                  description: 'Deep consultation to understand your objectives, constraints, and vision for the project.',
                },
                {
                  phase: '2',
                  title: 'Plan & Prepare',
                  description: 'Comprehensive planning, resource allocation, and preparation to ensure smooth execution.',
                },
                {
                  phase: '3',
                  title: 'Execute with Excellence',
                  description: 'Skilled teams deliver quality work with rigorous oversight and continuous quality assurance.',
                },
                {
                  phase: '4',
                  title: 'Review & Deliver',
                  description: 'Final inspections, documentation, and handover with full accountability and support.',
                },
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="text-5xl font-bold text-primary mb-4">{phase.phase}</div>
                  <h4 className="text-xl font-bold text-accent mb-3">{phase.title}</h4>
                  <p className="text-secondary">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </>
  )
}
