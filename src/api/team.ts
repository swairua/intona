import { get } from './client'
import type { TeamMember } from '../types'

export function getTeam(): Promise<TeamMember[]> {
  return get<TeamMember[]>('team')
}
