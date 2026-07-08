import { get } from './client'

export interface NewsItem {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  image: string
  featured: number
  date_published: string
}

export function getNews(category?: string, limit?: number): Promise<NewsItem[]> {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (limit) params.set('limit', String(limit))
  const qs = params.toString()
  return get<NewsItem[]>(`news${qs ? '?' + qs : ''}`)
}
