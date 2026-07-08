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

export default function StrategicObjectives() {
  return (
    <>
      <SEO 
        title="Strategic Objectives"
        description="Intona Constructions' 9 strategic objectives driving quality, ethics, innovation, and sustainable growth."
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Strategic Objectives</h1>
            <p className="text-xl text-white/80">Our roadmap for sustainable growth and impact</p>
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
            These nine strategic objectives guide our decisions, investments, and actions, ensuring we create sustainable value 
            for all stakeholders while advancing Kenya's development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: '1',
                title: 'Deliver Quality Work',
                description: 'Maintain the highest standards of workmanship and project delivery across all engagements.',
              },
              {
                number: '2',
                title: 'Uphold Ethics',
                description: 'Operate with integrity and transparency in all business dealings and stakeholder relationships.',
              },
              {
                number: '3',
                title: 'Develop Skills',
                description: 'Invest in continuous training and professional development of our team members.',
              },
              {
                number: '4',
                title: 'Promote Inclusion',
                description: 'Create opportunities for women, youth, and marginalized groups in our workforce and supply chain.',
              },
              {
                number: '5',
                title: 'Support Local Business',
                description: 'Partner with local suppliers and contractors, strengthening Kenya\'s construction ecosystem.',
              },
              {
                number: '6',
                title: 'Innovate Cost-Effectively',
                description: 'Deploy technology and creative solutions to reduce costs without compromising quality.',
              },
              {
                number: '7',
                title: 'Work Efficiently',
                description: 'Optimize resources, timelines, and processes to maximize productivity and minimize waste.',
              },
              {
                number: '8',
                title: 'Protect Environment',
                description: 'Minimize environmental impact and contribute to climate action in all our projects.',
              },
              {
                number: '9',
                title: 'Build Long-Term Partnerships',
                description: 'Cultivate lasting relationships with clients, suppliers, and communities based on mutual success.',
              },
            ].map((obj, idx) => (
              <Card
                key={idx}
                variant="default"
                delay={idx * 0.1}
                className="p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {obj.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-accent mb-2">{obj.title}</h3>
                    <p className="text-sm text-secondary/80">{obj.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card
            variant="premium"
            className="mt-16 p-8"
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Impact Through Objectives</h3>
            <p className="text-secondary leading-relaxed">
              By pursuing these nine objectives, we create a virtuous cycle of excellence: quality work attracts more projects,
              ethical operations build trust, skilled teams deliver better results, and long-term partnerships ensure sustainability.
              Together, these objectives position Intona Constructions as a leader in Kenya's construction industry.
            </p>
          </Card>
        </motion.div>
      </Container>
    </>
  )
}
