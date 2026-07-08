import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { PROJECT_CATEGORIES } from '../../constants/projects'

interface ProjectFiltersProps {
  active: string
  onSelect: (category: string) => void
}

export function ProjectFilters({ active, onSelect }: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      {PROJECT_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            active === cat
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-surface text-secondary hover:bg-primary/10 hover:text-primary',
          )}
        >
          {cat}
        </button>
      ))}
    </motion.div>
  )
}
