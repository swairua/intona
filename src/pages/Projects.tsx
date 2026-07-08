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
      <div className="pt-20 sm:pt-24 md:pt-32 projects-hero-section relative">
        <Section bgColor="bg-accent text-white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-family-display)' }}>Our Projects</h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  A portfolio of excellence — showcasing our finest work across sectors. From residential communities to major infrastructure, each project reflects our commitment to quality.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden md:block relative rounded-2xl overflow-hidden aspect-video"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc289c2c29f354ddfba7264f2fced3fad%2F4cbd85c3202a4b42b03c6472f85aed7b?format=webp&width=1200"
                  alt="Projects showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-transparent" />
              </motion.div>
            </div>
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
