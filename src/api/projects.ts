import { get } from './client'
import type { Project } from '../types'

export function getProjects(params?: { category?: string; status?: string; featured?: string; limit?: number; offset?: number }): Promise<Project[]> {
  const query = new URLSearchParams()
  if (params?.category) query.set('category', params.category)
  if (params?.status) query.set('status', params.status)
  if (params?.featured) query.set('featured', params.featured)
  if (params?.limit) query.set('limit', String(params.limit))
  if (params?.offset) query.set('offset', String(params.offset))
  const qs = query.toString()
  return get<Project[]>(`projects${qs ? '?' + qs : ''}`)
}

export function getProject(id: number): Promise<Project> {
  return get<Project>(`projects?id=${id}`)
}
