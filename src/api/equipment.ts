import { get } from './client'
import type { Equipment } from '../types'

export function getEquipment(availability?: string): Promise<Equipment[]> {
  return get<Equipment[]>(`equipment${availability ? '?availability=' + availability : ''}`)
}
