import type { NavItem } from '../types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Company Overview', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Certifications', href: '/about#certifications' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Equipment', href: '/equipment' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Health & Safety', href: '/safety' },
      { label: 'Quality Assurance', href: '/quality' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Careers', href: '/careers' },
      { label: 'News', href: '/news' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  { label: 'Clients', href: '/clients' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_SERVICES = [
  { label: 'Building Construction', href: '/services' },
  { label: 'Civil Engineering', href: '/services' },
  { label: 'Road Construction', href: '/services' },
  { label: 'Bridge Construction', href: '/services' },
  { label: 'Water Projects', href: '/services' },
  { label: 'Project Management', href: '/services' },
]

export const FOOTER_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Health & Safety', href: '/safety' },
  { label: 'Quality Assurance', href: '/quality' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]
