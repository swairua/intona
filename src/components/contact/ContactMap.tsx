import { MapPin } from 'lucide-react'
import { COMPANY } from '../../constants/company'

export function ContactMap() {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface h-[400px] flex items-center justify-center border border-border">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
        <p className="text-secondary font-medium">{COMPANY.address}</p>
        <p className="text-sm text-secondary/70 mt-2">Google Maps integration</p>
      </div>
    </div>
  )
}
