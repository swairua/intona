import { get } from './client'
import type { Testimonial } from '../types'

export function getTestimonials(): Promise<Testimonial[]> {
  return get<Testimonial[]>('testimonials')
}
