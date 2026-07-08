export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  category: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  location: string
  duration: string
  client: string
  budget: string
  technologies: string[]
  images: string[]
  status: 'completed' | 'ongoing' | 'planned'
}

export interface Equipment {
  id: string
  name: string
  image: string
  description: string
  specifications: Record<string, string>
  availability: 'available' | 'rented' | 'maintenance'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
  image: string
}

export interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  description: string
  requirements: string[]
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface Certification {
  title: string
  description: string
  image: string
}
