import { get } from './client'
import type { Service } from '../types'

export function getServices(category?: string): Promise<Service[]> {
  const qs = category ? `?category=${category}` : ''
  return get<Service[]>(`services${qs}`)
}
