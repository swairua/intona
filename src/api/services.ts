import { get } from './client'
import type { Service } from '../types'
import { MOCK_SERVICES } from '../data/services'

export async function getServices(category?: string): Promise<Service[]> {
  try {
    const qs = category ? `?category=${category}` : ''
    return await get<Service[]>(`services${qs}`)
  } catch {
    return category
      ? MOCK_SERVICES.filter(s => s.category === category)
      : MOCK_SERVICES
  }
}
