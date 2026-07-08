import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { getTeam } from '../../api/team'
import type { TeamMember } from '../../types'
import { ExternalLink } from 'lucide-react'

export function ManagementTeam() {
  const [members, setMembers] = useState<TeamMember[]>([])

  useEffect(() => { getTeam().then(setMembers).catch(() => {}) }, [])
  return (
    <section id="team" className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          title="Management Team"
          subtitle="Meet the experienced leaders driving our vision forward."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-surface aspect-[4/5] mb-5">
                <div className="absolute inset-0 flex items-center justify-center text-secondary">
                  <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-accent">{member.name}</h3>
              <p className="text-sm text-primary font-medium">{member.role}</p>
              <p className="mt-2 text-sm text-secondary leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
