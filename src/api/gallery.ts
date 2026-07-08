import { get } from './client'

export interface GalleryItem {
  id: number
  title: string
  image: string
  category: string
}

export function getGallery(category?: string): Promise<GalleryItem[]> {
  return get<GalleryItem[]>(`gallery${category ? '?category=' + category : ''}`)
}
