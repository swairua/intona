import { SEO } from '../components/seo/SEO'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function VisionMission() {
  return (
    <>
      <SEO
        title="Vision & Mission"
        description="Discover Intona Constructions' vision for engineered excellence and our mission to deliver transformative construction solutions across Kenya."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Vision & Mission</h1>
            <p className="text-xl text-white/80">Our commitment to excellence and sustainable growth</p>
          </motion.div>
        </Container>
      </section>

      <Container className="py-16 md:py-24 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-20"
        >
          {/* Vision Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop"
                alt="Our Vision"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">Our Vision</h2>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                To be Kenya's most trusted construction partner, engineered for impact and built to last.
              </p>
              <p className="text-base text-secondary/80 leading-relaxed">
                We envision a Kenya where quality infrastructure empowers communities, where innovation drives sustainability, and where construction excellence becomes the standard. Through our work, we aim to transform the built environment and create lasting legacies that serve generations.
              </p>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">Our Mission</h2>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                To deliver transformative construction solutions that exceed expectations, drive economic growth, and enhance lives across Kenya.
              </p>
              <p className="text-base text-secondary/80 leading-relaxed">
                We are committed to executing projects with excellence, integrity, and innovation. Through sustainable practices, skilled teams, and forward-thinking leadership, we create value for our clients, communities, and stakeholders while maintaining the highest standards of safety, quality, and environmental responsibility.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Our Mission"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </motion.div>

          {/* Core Values Section */}
          <motion.div variants={itemVariants} className="mt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-12 text-center">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: 'Integrity',
                  description: 'We act with honesty and strong moral principles in all our dealings.',
                  icon: '🛡️',
                },
                {
                  title: 'Innovation',
                  description: 'We embrace creative solutions and continuous improvement in our work.',
                  icon: '💡',
                },
                {
                  title: 'Excellence',
                  description: 'We pursue the highest standards of quality in every project we undertake.',
                  icon: '⭐',
                },
                {
                  title: 'Responsibility',
                  description: 'We are accountable to our clients, communities, and the environment.',
                  icon: '🌍',
                },
                {
                  title: 'Customer-Centricity',
                  description: 'We prioritize understanding and exceeding client needs and expectations.',
                  icon: '👥',
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  variant="default"
                  delay={index * 0.1}
                  className="p-8"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-accent mb-3">{value.title}</h3>
                  <p className="text-sm text-secondary/80 leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
