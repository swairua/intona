import { uploadFile } from './client'

export function submitApplication(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  coverLetter?: string
  vacancyTitle?: string
  cv?: File | null
}): Promise<{ message: string }> {
  const fd = new FormData()
  fd.append('firstName', data.firstName)
  fd.append('lastName', data.lastName)
  fd.append('email', data.email)
  if (data.phone) fd.append('phone', data.phone)
  if (data.coverLetter) fd.append('coverLetter', data.coverLetter)
  if (data.vacancyTitle) fd.append('vacancyTitle', data.vacancyTitle)
  if (data.cv) fd.append('cv', data.cv)

  return uploadFile<{ message: string }>('careers', fd)
}
