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

export default function Wellness() {
  return (
    <>
      <SEO 
        title="Staff Wellness & Support"
        description="Intona Constructions' comprehensive employee wellness programs including HIV support, mental health, and family care initiatives."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Staff Wellness & Support</h1>
            <p className="text-xl text-white/80">Caring for our people, strengthening our community</p>
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
            At Intona Constructions, we recognize that our people are our greatest asset. We provide comprehensive 
            wellness and support programs that address physical, mental, and emotional health.
          </p>

          {/* HIV & Wellness Policy */}
          <h2 className="text-3xl font-bold text-accent mb-8">HIV & Wellness Policy</h2>
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl border border-primary/20 mb-16"
          >
            <h3 className="text-xl font-bold text-accent mb-4">Our Commitment</h3>
            <p className="text-secondary leading-relaxed mb-6">
              We maintain a comprehensive HIV and wellness policy that ensures non-discrimination, confidentiality, 
              and access to healthcare. All employees are entitled to:
            </p>
            <ul className="space-y-3">
              {[
                'Confidential HIV testing and counseling services',
                'Free antiretroviral therapy for employees with HIV',
                'Comprehensive health insurance coverage',
                'Mental health and psychosocial support',
                'Flexible working arrangements for health needs',
                'Workplace dignity and freedom from discrimination',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Initiatives */}
          <h2 className="text-3xl font-bold text-accent mb-8">Staff Support Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Health & Medical',
                icon: '🏥',
                initiatives: [
                  'Annual medical check-ups',
                  'Dental and eye care',
                  'Occupational health services',
                  'Health insurance benefits',
                ],
              },
              {
                title: 'Mental & Emotional',
                icon: '🧠',
                initiatives: [
                  'Counseling services',
                  'Stress management programs',
                  'Mental health awareness',
                  'Work-life balance support',
                ],
              },
              {
                title: 'Family Support',
                icon: '👨‍👩‍👧‍👦',
                initiatives: [
                  'Family health programs',
                  'Maternity/paternity benefits',
                  'Childcare support',
                  'Education assistance',
                ],
              },
              {
                title: 'Lifestyle & Wellness',
                icon: '🏃',
                initiatives: [
                  'Fitness programs',
                  'Nutrition counseling',
                  'Recreational activities',
                  'Wellness workshops',
                ],
              },
            ].map((initiative, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-4">{initiative.icon}</div>
                <h3 className="text-xl font-bold text-accent mb-4">{initiative.title}</h3>
                <ul className="space-y-2">
                  {initiative.initiatives.map((item, i) => (
                    <li key={i} className="text-sm text-secondary flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
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
            <h3 className="text-2xl font-bold text-accent mb-4">Wellness for All</h3>
            <p className="text-secondary leading-relaxed">
              We believe that a healthy workforce is a productive and engaged workforce. By investing in comprehensive 
              wellness programs, we create an inclusive workplace where every team member can thrive both professionally and personally.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </>
  )
}
