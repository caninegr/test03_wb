import React from 'react'
import { getSrc } from 'gatsby-plugin-image'
import useSiteMetadata from '@helpers-blog/useSiteMetadata'
import getImageVariant from '@components/utils/getImageVariant'

const Seo = ({
  title,
  description,
  excerpt,
  meta,
  keywords,
  author,
  category,
  date,
  timeToRead,
  children,
  thumbnail,
  siteUrl,
  locale
}) => {
  const site = useSiteMetadata()

  const social = (author && author.social) || site.social || []
  const twitter =
    social.find(s => s.name && s.name.toLowerCase() === 'twitter') || {}

  description = excerpt || description || site.description

  const imageSrc = getSrc(getImageVariant(thumbnail, 'hero'))
  const imageUrl =
    imageSrc &&
    (imageSrc.startsWith('//')
      ? 'https:' + imageSrc
      : siteUrl && `${siteUrl}${imageSrc}`)

  /**
   * Meta Tags
   */

  const metaTags = [
    { itemProp: 'name', content: title || site.title },
    { itemProp: 'description', content: description },
    { name: 'description', content: description },

    { property: 'og:title', content: title || site.title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: date ? 'article' : 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:image', content: imageUrl },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.name },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter.url },
    { name: 'twitter:image', content: imageUrl }
  ]

  if (keywords && keywords.length > 0) {
    metaTags.push({ name: 'keywords', content: keywords.join(', ') })
  }

  if (date) {
    metaTags.push({ name: 'article:published_time', content: date })
  }

  if (timeToRead) {
    metaTags.push({ name: 'twitter:label1', value: 'Reading time' })
    metaTags.push({
      name: 'twitter:data1',
      value: `${timeToRead} ' διάβασμα`
    })
  }

  if (meta) {
    metaTags.push(meta)
  }

  /**
   * Structured Data (JSON-LD)
   */

  const jsonLdScripts = []

  // Article
  if (title && author) {
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      image: imageUrl,
      datePublished: date,
      author: {
        '@type': 'Person',
        name: author.name,
        url: author.slug
      }
    }
    jsonLdScripts.push(
      <script type="application/ld+json" key="article-jsonld">
        {JSON.stringify(articleJsonLd)}
      </script>
    )
  }

  // Breadcrumb
  if (title && category) {
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: site.name,
          item: 'https://thetruthaboutdogs.gr'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.name,
          item: `${'https://thetruthaboutdogs.gr'}${category.slug}`
        }
      ]
    }
    jsonLdScripts.push(
      <script type="application/ld+json" key="breadcrumb-jsonld">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
    )
  }

  const pageTitle = title ? `${title} | ${site.title}` : site.title

  return (
    <>
      <html lang={locale || 'en'} />
      <title>{pageTitle}</title>
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      {jsonLdScripts}
      {children}
    </>
  )
}

export default Seo
