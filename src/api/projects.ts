import { get } from './client'
import type { Project } from '../types'
import { MOCK_PROJECTS } from '../data/projects'

export async function getProjects(params?: { category?: string; status?: string; featured?: string; limit?: number; offset?: number }): Promise<Project[]> {
  try {
    const query = new URLSearchParams()
    if (params?.category) query.set('category', params.category)
    if (params?.status) query.set('status', params.status)
    if (params?.featured) query.set('featured', params.featured)
    if (params?.limit) query.set('limit', String(params.limit))
    if (params?.offset) query.set('offset', String(params.offset))
    const qs = query.toString()
    return await get<Project[]>(`projects${qs ? '?' + qs : ''}`)
  } catch {
    let result = [...MOCK_PROJECTS]
    if (params?.category) result = result.filter(p => p.category === params.category)
    if (params?.status) result = result.filter(p => p.status === params.status)
    if (params?.limit) result = result.slice(0, params.limit)
    if (params?.offset) result = result.slice(params.offset)
    return result
  }
}

export async function getProject(id: number | string): Promise<Project> {
  try {
    return await get<Project>(`projects?id=${id}`)
  } catch {
    return MOCK_PROJECTS.find(p => p.id === String(id)) || MOCK_PROJECTS[0]
  }
}
