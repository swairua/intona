import type { NavItem } from '../types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Company Overview', href: '/about' },
      { label: 'Vision & Mission', href: '/vision-mission' },
      { label: 'Leadership', href: '/about#team' },
      { label: 'Certifications', href: '/compliance' },
    ],
  },
  {
    label: 'What We Do',
    href: '/services',
    children: [
      { label: 'Services', href: '/services' },
      { label: 'Our Expertise', href: '/expertise' },
      { label: 'Projects', href: '/projects' },
      { label: 'Equipment', href: '/equipment' },
    ],
  },
  {
    label: 'Responsibility',
    href: '#',
    children: [
      { label: 'Philosophy & Delivery', href: '/philosophy-delivery' },
      { label: 'Health & Safety', href: '/safety' },
      { label: 'Quality Assurance', href: '/quality' },
      { label: 'Environmental Management', href: '/environmental' },
      { label: 'Staff Wellness', href: '/wellness' },
      { label: 'Social Impact', href: '/social-impact' },
    ],
  },
  {
    label: 'Company',
    href: '#',
    children: [
      { label: 'Strategic Objectives', href: '/objectives' },
      { label: 'The Road Ahead', href: '/road-ahead' },
      { label: 'Careers', href: '/careers' },
      { label: 'News & Updates', href: '/news' },
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
  { label: 'Vision & Mission', href: '/vision-mission' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Our Expertise', href: '/expertise' },
  { label: 'Compliance & Certifications', href: '/compliance' },
  { label: 'Health & Safety', href: '/safety' },
  { label: 'Quality Assurance', href: '/quality' },
  { label: 'Environmental Management', href: '/environmental' },
  { label: 'Social Impact', href: '/social-impact' },
  { label: 'Strategic Objectives', href: '/objectives' },
  { label: 'The Road Ahead', href: '/road-ahead' },
  { label: 'Careers', href: '/careers' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]
