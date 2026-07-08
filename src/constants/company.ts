import type { Certification, TeamMember, Testimonial, TimelineEvent, Vacancy } from '../types'

export const COMPANY = {
  name: 'Intona Constructions Ltd',
  tagline: 'Building Excellence. Delivering Quality.',
  description:
    'Intona Constructions Ltd delivers innovative, reliable and sustainable construction solutions across residential, commercial and infrastructure projects.',
  phone: '+256 700 000 000',
  email: 'info@intonaconstructions.com',
  address: 'Plot 00, Kampala Road, Kampala, Uganda',
  workingHours: 'Mon – Fri: 8:00 AM – 5:00 PM',
  founded: 2010,
  employees: 200,
  whatsapp: '+256700000000',
  social: {
    linkedin: 'https://linkedin.com/company/intona',
    facebook: 'https://facebook.com/intona',
    twitter: 'https://twitter.com/intona',
    instagram: 'https://instagram.com/intona',
    youtube: 'https://youtube.com/@intona',
  },
} as const

export const STATS = {
  yearsExperience: 15,
  completedProjects: 120,
  happyClients: 80,
  engineers: 50,
  currentProjects: 12,
}

export const HISTORY: TimelineEvent[] = [
  { year: '2010', title: 'Founded', description: 'Intona Constructions Ltd was established with a vision to transform the construction landscape in Uganda.' },
  { year: '2012', title: 'First Major Project', description: 'Completed our first commercial building project, setting the standard for quality and timely delivery.' },
  { year: '2014', title: 'Civil Engineering Expansion', description: 'Expanded into civil engineering and infrastructure projects including roads and bridges.' },
  { year: '2016', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems.' },
  { year: '2018', title: 'Regional Expansion', description: 'Extended operations to neighboring countries with multiple infrastructure projects.' },
  { year: '2020', title: 'Innovation & Sustainability', description: 'Launched sustainable construction practices and green building initiatives.' },
  { year: '2023', title: '100+ Projects Milestone', description: 'Celebrated completing over 100 successful projects with a growing team of 200+ professionals.' },
  { year: '2025', title: 'Industry Leader', description: 'Recognized as one of the leading construction companies in the region with ISO 14001 and OHSAS 18001 certifications.' },
]

export const TEAM: TeamMember[] = [
  { id: '1', name: 'Eng. John Doe', role: 'Managing Director', image: '/images/team/placeholder.svg', bio: 'Over 20 years of experience in construction and civil engineering. Leads the company with a vision for excellence and innovation.' },
  { id: '2', name: 'Jane Smith', role: 'Chief Operations Officer', image: '/images/team/placeholder.svg', bio: 'Expert in construction operations and project management. Ensures seamless delivery across all projects.' },
  { id: '3', name: 'Eng. Robert Mugisha', role: 'Head of Engineering', image: '/images/team/placeholder.svg', bio: 'Leads the engineering team with deep expertise in structural design and infrastructure development.' },
  { id: '4', name: 'Sarah Nakato', role: 'Director of Quality & Safety', image: '/images/team/placeholder.svg', bio: 'Ensures the highest standards of quality, safety and environmental compliance across all operations.' },
  { id: '5', name: 'David Wasswa', role: 'Commercial Director', image: '/images/team/placeholder.svg', bio: 'Manages business development, client relations and strategic partnerships.' },
  { id: '6', name: 'Grace Achieng', role: 'Head of Sustainability', image: '/images/team/placeholder.svg', bio: 'Drives sustainable construction practices and corporate social responsibility initiatives.' },
]

export const CERTIFICATIONS: Certification[] = [
  { title: 'ISO 9001:2015', description: 'Quality Management System', image: '/images/certs/iso-9001.svg' },
  { title: 'ISO 14001:2015', description: 'Environmental Management', image: '/images/certs/iso-14001.svg' },
  { title: 'OHSAS 18001', description: 'Occupational Health & Safety', image: '/images/certs/ohsas.svg' },
  { title: 'NCA Registration', description: 'National Construction Authority Class A', image: '/images/certs/nca.svg' },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Peter Kamau', company: 'Ministry of Works & Transport', role: 'Permanent Secretary', content: 'Intona Constructions delivered our flagship infrastructure project ahead of schedule with exceptional quality. Their professionalism and attention to detail are unmatched.', rating: 5, image: '' },
  { id: '2', name: 'Dr. Sarah Ochieng', company: 'East African Development Bank', role: 'Project Director', content: 'Working with Intona on our commercial complex was a seamless experience. Their team demonstrated remarkable expertise in project management and execution.', rating: 5, image: '' },
  { id: '3', name: 'Michael Kuteesa', company: 'Kampala City Council', role: 'City Engineer', content: 'The road infrastructure project completed by Intona has transformed transportation in our district. We appreciate their commitment to quality and community engagement.', rating: 5, image: '' },
  { id: '4', name: 'Alice Mukamana', company: 'Rwanda Housing Authority', role: 'Director', content: 'Intona Constructions exceeded our expectations on the residential development project. Their attention to detail and adherence to timelines is commendable.', rating: 5, image: '' },
  { id: '5', name: 'James Opondo', company: 'Uganda National Roads Authority', role: 'Senior Engineer', content: 'We have contracted Intona for multiple bridge construction projects and they have consistently delivered world-class results.', rating: 5, image: '' },
]

export const CORE_VALUES = [
  { title: 'Integrity', description: 'We uphold the highest standards of honesty and transparency in all our dealings.', icon: 'Shield' },
  { title: 'Excellence', description: 'We strive for excellence in every project, delivering quality that exceeds expectations.', icon: 'Award' },
  { title: 'Innovation', description: 'We embrace innovative technologies and methods to improve construction efficiency and sustainability.', icon: 'Lightbulb' },
  { title: 'Safety', description: 'We prioritize the health and safety of our workforce, partners and communities.', icon: 'HardHat' },
  { title: 'Sustainability', description: 'We are committed to environmentally responsible construction practices.', icon: 'Leaf' },
  { title: 'Collaboration', description: 'We work closely with clients, stakeholders and communities to achieve shared success.', icon: 'Handshake' },
]

export const VACANCIES: Vacancy[] = [
  { id: '1', title: 'Senior Civil Engineer', department: 'Engineering', location: 'Kampala, Uganda', type: 'full-time', description: 'Lead structural design and supervision of major infrastructure projects.', requirements: ['BSc in Civil Engineering', '10+ years experience', 'Professional registration', 'Project management skills'] },
  { id: '2', title: 'Project Manager', department: 'Projects', location: 'Kampala, Uganda', type: 'full-time', description: 'Manage end-to-end delivery of construction projects within budget and timeline.', requirements: ['Degree in Engineering/Construction', '8+ years experience', 'PMP certification preferred', 'Strong leadership skills'] },
  { id: '3', title: 'Quantity Surveyor', department: 'Commercial', location: 'Kampala, Uganda', type: 'full-time', description: 'Handle cost estimation, tendering and contract administration.', requirements: ['Degree in Quantity Surveying', '5+ years experience', 'Membership of professional body', 'Proficient in cost estimation software'] },
  { id: '4', title: 'Safety Officer', department: 'HSE', location: 'Kampala, Uganda', type: 'full-time', description: 'Ensure compliance with health, safety and environmental regulations on sites.', requirements: ['NEBOSH or equivalent', '5+ years HSE experience', 'First aid certification', 'Strong communication skills'] },
  { id: '5', title: 'Architect', department: 'Design', location: 'Kampala, Uganda', type: 'full-time', description: 'Develop architectural designs and oversee construction alignment.', requirements: ['Degree in Architecture', '7+ years experience', 'RIBA or equivalent', 'Proficient in AutoCAD, Revit'] },
]
