import React, { useEffect } from 'react'

const SITE_NAME = 'Nexora Estates'
const MANAGED_ATTR = 'data-seo-managed'

const toAbsoluteUrl = (value) => {
  if (!value) return ''
  if (/^(https?:|data:|blob:)/.test(value)) return value

  return new URL(value, window.location.origin).toString()
}

const upsertNode = (tagName, selector, attrs, content) => {
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement(tagName)
    node.setAttribute(MANAGED_ATTR, 'true')
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))
    document.head.appendChild(node)
  }

  node.setAttribute(MANAGED_ATTR, 'true')
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))

  if (content !== undefined) {
    node.setAttribute('content', content)
  }

  return node
}

const upsertLink = (selector, attrs) => {
  let node = document.head.querySelector(selector)

  if (!node) {
    node = document.createElement('link')
    node.setAttribute(MANAGED_ATTR, 'true')
    document.head.appendChild(node)
  }

  node.setAttribute(MANAGED_ATTR, 'true')
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))

  return node
}

const Seo = ({
  title,
  description,
  canonicalPath,
  image,
  type = 'website',
  noindex = false,
  structuredData,
}) => {
  useEffect(() => {
    const previousTitle = document.title
    const canonicalUrl = canonicalPath
      ? new URL(canonicalPath, window.location.origin).toString()
      : new URL(window.location.pathname, window.location.origin).toString()
    const absoluteImage = toAbsoluteUrl(image) || new URL('/favicon.svg', window.location.origin).toString()

    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    upsertNode('meta', 'meta[name="description"]', { name: 'description' }, description)
    upsertNode('meta', 'meta[name="robots"]', { name: 'robots' }, noindex ? 'noindex, nofollow' : 'index, follow')

    upsertNode('meta', 'meta[property="og:title"]', { property: 'og:title' }, title || SITE_NAME)
    upsertNode('meta', 'meta[property="og:description"]', { property: 'og:description' }, description)
    upsertNode('meta', 'meta[property="og:type"]', { property: 'og:type' }, type)
    upsertNode('meta', 'meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    upsertNode('meta', 'meta[property="og:image"]', { property: 'og:image' }, absoluteImage)
    upsertNode('meta', 'meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME)

    upsertNode('meta', 'meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertNode('meta', 'meta[name="twitter:title"]', { name: 'twitter:title' }, title || SITE_NAME)
    upsertNode('meta', 'meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    upsertNode('meta', 'meta[name="twitter:image"]', { name: 'twitter:image' }, absoluteImage)

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })

    const existingScript = document.head.querySelector('script#seo-structured-data')
    if (existingScript) {
      existingScript.remove()
    }

    if (structuredData) {
      const script = document.createElement('script')
      script.id = 'seo-structured-data'
      script.type = 'application/ld+json'
      script.setAttribute(MANAGED_ATTR, 'true')
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    // Auto-generate basic Article JSON-LD when type is 'article' and no structuredData provided
    if (!structuredData && type === 'article' && title) {
      try {
        const articleLd = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: description || '',
          url: canonicalUrl,
          name: title,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
        }

        const scriptAuto = document.createElement('script')
        scriptAuto.id = 'seo-structured-data'
        scriptAuto.type = 'application/ld+json'
        scriptAuto.setAttribute(MANAGED_ATTR, 'true')
        scriptAuto.textContent = JSON.stringify(articleLd)
        document.head.appendChild(scriptAuto)
      } catch (e) {
        console.error('Seo: failed to generate structured data', e)
      }
    }

    return () => {
      document.title = previousTitle
      document.querySelectorAll(`[${MANAGED_ATTR}="true"]`).forEach((node) => node.remove())
      const script = document.head.querySelector('script#seo-structured-data')
      if (script) {
        script.remove()
      }
    }
  }, [title, description, canonicalPath, image, type, noindex, structuredData])

  return null
}

export default Seo