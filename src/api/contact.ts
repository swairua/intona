import { post } from './client'

export function submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<{ message: string }> {
  return post<{ message: string }>('contact', data)
}
