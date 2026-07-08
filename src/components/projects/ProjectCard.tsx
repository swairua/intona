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
      className="group h-full"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/9] bg-surface hover:shadow-lg transition-shadow duration-300 project-card-image">
        {project.images && project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent z-10" />
        {!project.images || !project.images[0] && (
          <div className="absolute inset-0 flex items-center justify-center text-secondary">
            <svg className="w-14 sm:w-16 h-14 sm:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant={
            project.status === 'completed' ? 'success' : project.status === 'ongoing' ? 'info' : 'warning'
          } className="text-xs">
            {project.status}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2">{project.title}</h3>
        </div>
      </div>
      <div className="space-y-3">
        <Badge variant="primary" className="text-xs">{project.category}</Badge>
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-secondary">
          <span className="flex items-center gap-1 min-w-0"><MapPin className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{project.location}</span></span>
          <span className="flex items-center gap-1 min-w-0"><Calendar className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{project.duration}</span></span>
          <span className="flex items-center gap-1 min-w-0"><User className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{project.client}</span></span>
          <span className="flex items-center gap-1 min-w-0"><DollarSign className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{project.budget}</span></span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  )
}
