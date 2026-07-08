import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Calendar } from 'lucide-react'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Badge } from '../ui/Badge'
import { getProjects } from '../../api/projects'
import type { Project } from '../../types'

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects({ featured: '1', limit: 3 }).then(setProjects).catch(() => {})
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <Heading
          title="Featured Projects"
          subtitle="Showcasing our commitment to excellence through landmark projects that define communities."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-surface">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-secondary">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <Badge variant={project.category === 'Infrastructure' ? 'info' : 'primary'} className="mb-2">
                    {project.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {project.duration}
                  </span>
                </div>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 group"
          >
            View All Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
