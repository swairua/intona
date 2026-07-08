import { SEO } from '../components/seo/SEO'
import { HeroSection } from '../components/home/HeroSection'
import { StatsCounter } from '../components/home/StatsCounter'
import { ServicesPreview } from '../components/home/ServicesPreview'
import { FeaturedProjects } from '../components/home/FeaturedProjects'
import { TestimonialSlider } from '../components/home/TestimonialSlider'
import { PartnersSection } from '../components/home/PartnersSection'
import { CTASection } from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <SEO />
      <HeroSection />
      <StatsCounter />
      <ServicesPreview />
      <FeaturedProjects />
      <TestimonialSlider />
      <PartnersSection />
      <CTASection />
    </>
  )
}
