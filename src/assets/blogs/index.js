const mdxModules = import.meta.glob('./*.mdx', { eager: true })

const buildBlogEntry = ([filePath, module]) => {
  const metadata = module.metadata || {}
  const slugFromPath = filePath.split('/').pop().replace(/\.mdx$/, '')

  return {
    slug: metadata.slug || slugFromPath,
    title: metadata.title || 'Untitled post',
    category: metadata.category || 'Insights',
    image: metadata.image || '',
    description: metadata.description || '',
    order: metadata.order ?? 999,
    Component: module.default,
  }
}

const blogRecords = Object.entries(mdxModules)
  .map(buildBlogEntry)
  .sort((left, right) => left.order - right.order || left.title.localeCompare(right.title))

export const blogEntries = blogRecords.map(({ Component, order, ...entry }) => entry)
export const blogModules = mdxModules
export const getBlogEntryBySlug = (slug) => blogRecords.find((entry) => entry.slug === slug) || null
export const getBlogComponentBySlug = (slug) => getBlogEntryBySlug(slug)?.Component || null
export const blogSlugs = blogRecords.map((entry) => entry.slug)
export const blogFeedEntries = blogRecords.map(({ Component, order, ...entry }) => entry)
