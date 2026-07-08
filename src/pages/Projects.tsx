import { useState, useEffect } from 'react'
import { SEO } from '../components/seo/SEO'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { ProjectFilters } from '../components/projects/ProjectFilters'
import { ProjectCard } from '../components/projects/ProjectCard'
import { CTASection } from '../components/home/CTASection'
import { getProjects } from '../api/projects'
import type { Project } from '../types'
import { motion } from 'framer-motion'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [active, setActive] = useState('All')

  useEffect(() => { getProjects().then(setProjects).catch(() => {}) }, [])

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <SEO title="Projects" description="Explore our portfolio of completed and ongoing construction projects." />
      <div className="pt-20 sm:pt-24 md:pt-28">
        <Section bgColor="bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Our Projects</h1>
              <p className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
                A portfolio of excellence — showcasing our finest work across sectors.
              </p>
            </motion.div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <ProjectFilters active={active} onSelect={setActive} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}
