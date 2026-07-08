import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Card } from '../ui/Card'
import { CORE_VALUES } from '../../constants/company'
import { Shield, Award, Lightbulb, HardHat, Leaf, Handshake } from 'lucide-react'

const iconMap: Record<string, typeof Shield> = {
  Shield, Award, Lightbulb, HardHat, Leaf, Handshake,
}

export function CoreValues() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          title="Our Core Values"
          subtitle="The principles that guide every decision, project and relationship."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((value, i) => {
            const Icon = iconMap[value.icon] || Shield
            return (
              <Card key={value.title} delay={i * 0.1}>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-2">{value.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{value.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
