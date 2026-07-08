import { get } from './client'

export interface Stats {
  yearsExperience: number
  completedProjects: number
  happyClients: number
  engineers: number
  currentProjects: number
}

export function getStats(): Promise<Stats> {
  return get<Stats>('stats')
}
