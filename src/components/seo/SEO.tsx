import { Helmet } from 'react-helmet-async'
import { COMPANY } from '../../constants/company'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: string
}

export function SEO({ title, description, canonical, image, type = 'website' }: SEOProps) {
  const pageTitle = title ? `${title} | ${COMPANY.name}` : `${COMPANY.name} — ${COMPANY.tagline}`
  const pageDescription = description || COMPANY.description
  const pageImage = image || '/og-image.jpg'

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical || `https://www.intonaconstructions.com${canonical}`} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: COMPANY.name,
          description: COMPANY.description,
          url: 'https://www.intonaconstructions.com',
          telephone: COMPANY.phone,
          address: { '@type': 'PostalAddress', streetAddress: COMPANY.address },
          sameAs: Object.values(COMPANY.social),
        })}
      </script>
    </Helmet>
  )
}
