import { motion } from 'framer-motion'
import { MapPin, Calendar, DollarSign, User } from 'lucide-react'
import { Badge } from '../ui/Badge'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  index: number
  key?: string | number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/9] bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-secondary">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div className="absolute top-4 left-4 z-20">
          <Badge variant={
            project.status === 'completed' ? 'success' : project.status === 'ongoing' ? 'info' : 'warning'
          }>
            {project.status}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
      </div>
      <div className="space-y-3">
        <Badge variant="primary">{project.category}</Badge>
        <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.duration}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {project.client}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {project.budget}</span>
        </div>
        <p className="text-sm text-secondary leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  )
}
