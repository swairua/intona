import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCounter } from '../../hooks/useCounter'
import { Container } from '../ui/Container'
import { getStats } from '../../api/stats'
import type { Stats } from '../../api/stats'
import { HardHat, Building2, Users, Award, Activity } from 'lucide-react'

const ICON_MAP = [Award, Building2, Users, HardHat, Activity]
const LABELS = ['Years Experience', 'Completed Projects', 'Happy Clients', 'Engineers & Staff', 'Current Projects']
const SUFFIXES = ['+', '+', '+', '+', '']

function StatItem({ label, value, suffix, Icon, index }: { label: string; value: number; suffix: string; Icon: React.ElementType; index: number }) {
  const { count, ref } = useCounter(value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl border border-border p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary group-hover:text-white transition-colors" />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-accent">
          {count}{suffix}
        </div>
        <div className="mt-1 text-xs sm:text-sm text-secondary font-medium">{label}</div>
      </div>
    </motion.div>
  )
}

export function StatsCounter() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getStats().then(setStats).catch(() => {})
  }, [])

  if (!stats) return null

  const values = [stats.yearsExperience, stats.completedProjects, stats.happyClients, stats.engineers, stats.currentProjects]

  return (
    <section className="relative -mt-24 z-20 pb-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {values.map((value, i) => (
            <StatItem key={LABELS[i]} label={LABELS[i]} value={value} suffix={SUFFIXES[i]} Icon={ICON_MAP[i]} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
