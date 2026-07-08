import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { Badge } from '../ui/Badge'
import { Image } from 'lucide-react'
import { getGallery } from '../../api/gallery'
import type { GalleryItem } from '../../api/gallery'

export function GalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [active, setActive] = useState('All')

  useEffect(() => { getGallery().then(setItems).catch(() => {}) }, [])

  const categories = ['All', ...new Set(items.map(i => i.category).filter(Boolean))]
  const filtered = active === 'All' ? items : items.filter((g) => g.category === active)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              active === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-surface text-secondary hover:bg-primary/10 hover:text-primary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl bg-surface aspect-[4/3] cursor-pointer"
          >
            {item.image ? (
            <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-secondary">
              <Image className="w-12 h-12" />
            </div>
          )}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="text-white font-bold">{item.title}</h4>
              <Badge variant="primary">{item.category}</Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
