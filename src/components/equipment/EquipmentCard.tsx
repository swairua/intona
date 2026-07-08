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
        <Wrench className="w-16 h-16 text-secondary/30" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-accent">{item.name}</h3>
          <Badge variant={
            item.availability === 'available' ? 'success' : item.availability === 'rented' ? 'warning' : 'info'
          }>
            {item.availability}
          </Badge>
        </div>
        <p className="text-sm text-secondary mb-4">{item.description}</p>
        <div className="space-y-2">
          {Object.entries(item.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-secondary">{key}</span>
              <span className="font-semibold text-accent">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
