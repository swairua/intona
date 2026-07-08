import { post } from './client'

export function submitQuotation(data: {
  name: string
  company?: string
  email: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  description: string
}): Promise<{ message: string }> {
  return post<{ message: string }>('quotation', data)
}
