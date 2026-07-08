import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { CTASection } from '../components/home/CTASection'
import { motion } from 'framer-motion'
import { Shield, HardHat, AlertTriangle, ClipboardCheck, Users, TrendingUp } from 'lucide-react'

const POLICIES = [
  { icon: HardHat, title: 'Personal Protective Equipment', description: 'Mandatory PPE for all personnel and visitors on every site, including hard hats, safety boots, high-visibility vests, gloves and harnesses.' },
  { icon: Shield, title: 'Site Safety Management', description: 'Comprehensive site safety plans, regular inspections and safety audits to identify and mitigate hazards proactively.' },
  { icon: AlertTriangle, title: 'Risk Assessment', description: 'Thorough risk assessments before every project phase, with documented method statements and control measures.' },
  { icon: ClipboardCheck, title: 'Incident Reporting', description: 'Structured incident reporting and investigation system to prevent recurrence and continuously improve safety.' },
  { icon: Users, title: 'Training & Awareness', description: 'Regular safety training, toolbox talks and emergency drills for all employees across all levels.' },
  { icon: TrendingUp, title: 'Continuous Improvement', description: 'Data-driven safety performance monitoring with monthly reviews and quarterly safety committees.' },
]

const STATS = [
  { label: 'Safety Training Hours', value: '15,000+' },
  { label: 'Days Without LTI', value: '890' },
  { label: 'Safety Audits Conducted', value: '240+' },
  { label: 'Certified Safety Officers', value: '25' },
]

export default function Safety() {
  return (
    <>
      <SEO title="Health & Safety" description="Our commitment to health, safety and wellbeing across all construction sites." />
      <div className="pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-accent mb-4">Health & Safety</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl">
                Safety is not a priority — it's a value embedded in everything we do.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <Heading title="Our Safety Policies" subtitle="Comprehensive safety framework protecting our people, partners and communities." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POLICIES.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <policy.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-accent mb-2">{policy.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{policy.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bgColor="bg-surface">
        <Container>
          <Heading title="Safety Performance" subtitle="Our commitment to zero harm — measured, tracked and improved." />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 sm:p-8 text-center border border-border shadow-sm"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
