import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Wrench } from 'lucide-react'
import type { Equipment } from '../../types'

interface EquipmentCardProps {
  item: Equipment
  index: number
  key?: string | number
}

export function EquipmentCard({ item, index }: EquipmentCardProps) {
  return (
    <Card delay={index * 0.1}>
      <div className="aspect-[4/3] bg-surface flex items-center justify-center">
        <Wrench className="w-14 sm:w-16 h-14 sm:h-16 text-secondary/30" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-bold text-accent line-clamp-2">{item.name}</h3>
          <Badge variant={
            item.availability === 'available' ? 'success' : item.availability === 'rented' ? 'warning' : 'info'
          } className="text-xs whitespace-nowrap">
            {item.availability}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-secondary mb-3 sm:mb-4 line-clamp-2">{item.description}</p>
        <div className="space-y-1.5 sm:space-y-2">
          {Object.entries(item.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between text-xs sm:text-sm">
              <span className="text-secondary truncate">{key}</span>
              <span className="font-semibold text-accent ml-2 truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
