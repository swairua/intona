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

export default function SocialImpact() {
  return (
    <>
      <SEO 
        title="Social Impact & Empowerment"
        description="Intona Constructions' commitment to social responsibility, local empowerment, skills development, and community advancement."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Social Impact & Empowerment</h1>
            <p className="text-xl text-white/80">Creating opportunities, transforming lives</p>
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
            Intona Constructions recognizes that we have a responsibility to contribute to Kenya's social and economic development. 
            We create opportunities for local communities, develop human capital, and empower our stakeholders.
          </p>

          {/* Empowerment Principles */}
          <h2 className="text-3xl font-bold text-accent mb-8">Empowerment Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Local Labor First',
                icon: '👥',
                description: 'We prioritize hiring from local communities. Our workforce development programs create employment and support livelihoods in the regions where we operate.',
              },
              {
                title: 'Skills Transfer',
                icon: '📚',
                description: 'We invest in training and knowledge transfer. From apprenticeships to professional development, we build human capacity across the construction sector.',
              },
              {
                title: 'SME Support',
                icon: '🏢',
                description: 'We partner with small and medium enterprises. Through procurement practices and partnerships, we help local businesses grow and create value.',
              },
              {
                title: 'Internships & Mentorship',
                icon: '🎓',
                description: 'We develop future leaders. Our internship programs and mentorship initiatives guide young professionals into successful construction careers.',
              },
              {
                title: 'Fair Pay & Dignity',
                icon: '💼',
                description: 'We ensure fair compensation and dignity for all workers. Our wage standards meet or exceed statutory requirements, ensuring worker welfare.',
              },
              {
                title: 'Community Engagement',
                icon: '🤝',
                description: 'We listen and engage with communities. Ongoing stakeholder dialogue ensures our projects benefit and respect local interests.',
              },
            ].map((principle, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-accent mb-3">{principle.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Impact Areas */}
          <h2 className="text-3xl font-bold text-accent mb-8 mt-16">Areas of Impact</h2>
          <div className="space-y-8 mb-16">
            {[
              {
                title: 'Economic Empowerment',
                description: 'Jobs created, supplier relationships strengthened, and local economic activity stimulated through our projects and operations.',
              },
              {
                title: 'Skills & Education',
                description: 'Training programs, apprenticeships, and professional development opportunities that enhance employability and career prospects.',
              },
              {
                title: 'Community Infrastructure',
                description: 'Building roads, water systems, schools, and health facilities that improve quality of life and enable community development.',
              },
              {
                title: 'Youth Empowerment',
                description: 'Creating pathways for young people through internships, training, and mentorship in the construction and related industries.',
              },
              {
                title: 'Gender & Inclusion',
                description: 'Promoting women\'s participation in construction, supporting marginalized groups, and creating inclusive workplaces.',
              },
            ].map((area, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border-l-4 border-primary pl-6 py-4"
              >
                <h3 className="text-xl font-bold text-accent mb-2">{area.title}</h3>
                <p className="text-secondary leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Committed to Shared Prosperity</h3>
            <p className="text-secondary leading-relaxed">
              We believe that sustainable business growth comes from creating value for all stakeholders. By empowering local 
              communities, developing human potential, and contributing to Kenya's development, we build a stronger society 
              and a more resilient business for the future.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
