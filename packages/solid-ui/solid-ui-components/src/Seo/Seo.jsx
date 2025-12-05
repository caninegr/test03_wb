import React from 'react'
import useSiteMetadata from '@blocks-helpers/useSiteMetadata'

const Seo = ({
  title,
  description,
  excerpt,
  meta,
  keywords,
  author,
  thumbnail,
  siteUrl
}) => {
  const site = useSiteMetadata()

  const social = (author && author.social) || site.social || []
  const twitter =
    social.find(s => s.name && s.name.toLowerCase() === 'twitter') || {}

  description = excerpt || description || site.description

  thumbnail = thumbnail && thumbnail.hero && thumbnail.hero.src
  const thumbnailUrl =
    thumbnail &&
    (thumbnail.startsWith('//')
      ? thumbnail
      : siteUrl && `${siteUrl}${thumbnail}`)

  /**
   * Meta Tags
   */

  const metaTags = [
    { itemProp: 'name', content: title || site.title },
    { itemProp: 'description', content: description },
    { name: 'description', content: description },

    { property: 'og:title', content: title || site.title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:image', content: thumbnailUrl },

    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: site.name },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter.url }
  ]

  if (keywords && keywords.length > 0) {
    metaTags.push({ name: 'keywords', content: keywords.join(', ') })
  }

  if (meta) {
    metaTags.push(meta)
  }

  metaTags.push({ name: 'initial-scale', content: '1.0' })

  const pageTitle = title ? `${title} | ${site.title}` : site.title

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
    </>
  )
}

export default Seo
