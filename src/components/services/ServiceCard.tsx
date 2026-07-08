import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../../types'

const iconPath: Record<string, string> = {
  Building2: 'M3 21h18M3 7v14M21 7v14M6 21V3h12v18M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2',
  Blueprint: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7',
  Route: 'M16 3h5v5M8 3H3v5M12 20V10M3 21l9-9 9 9',
  Bridge: 'M2 20h20M6 20V8m12 12V8M10 20l-2-6 4-4 4 4-2 6',
  Droplets: 'M12 2v20M2 12h20M2 12a10 10 0 0120 0',
  Store: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  Home: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
  Factory: 'M2 20V8l6-4v16M18 20V4l6 4v12M2 20h20M6 12h4M14 12h4M6 16h4M14 16h4',
  Wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  ClipboardList: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M8 2h8v4H8V2zM12 11h4M12 16h4M8 11h.01M8 16h.01',
  Ruler: 'M15 5l4 4M7 3l-4 4M3 7l4 4M15 13l4 4M7 11l-4 4M3 15l4 4',
  Compass: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
  PencilRuler: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
  Briefcase: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
}

interface ServiceCardProps {
  service: Service
  index: number
  key?: string | number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Card delay={index * 0.05}>
      <div className="p-4 sm:p-6">
        <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
          <svg className="w-6 sm:w-7 h-6 sm:h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath[service.icon] || iconPath.Building2} />
          </svg>
        </div>
        <Badge variant="primary" className="mb-2 sm:mb-3 text-xs sm:text-sm">{service.category}</Badge>
        <h3 className="text-base sm:text-lg font-bold text-accent mb-2">{service.title}</h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-3 sm:mb-4">{service.description}</p>
        <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all">
          Read More <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
        </button>
      </div>
    </Card>
  )
}
