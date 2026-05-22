import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { getBlogComponentBySlug, getBlogEntryBySlug } from '../../assets/blogs/index.js'
import EmptyState from '../../components/ui/EmptyState'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import OptimizedImage from '../../components/ui/OptimizedImage'

const BlogPost = () => {
  const { slug } = useParams()
  const post = useMemo(() => getBlogEntryBySlug(slug), [slug])
  const MdxContent = useMemo(() => (slug ? getBlogComponentBySlug(slug) : null), [slug])

  if (!post) {
    return (
      <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
        <div className='max-padd-container'>
          <EmptyState
            title='Article not found'
            description='The requested article does not exist yet. Return to the blog archive to browse available posts.'
          />
          <div className='mt-6'>
            <Link to='/blog' className='underline font-semibold'>Back to blog</Link>
          </div>
        </div>
      </div>
    )
  }

  const canonicalPath = `/blog/${post.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    url: new URL(canonicalPath, window.location.origin).toString(),
    author: {
      '@type': 'Organization',
      name: 'Nexora Estates',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexora Estates',
    },
  }

  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <Seo
        title={post.title}
        description={post.description}
        canonicalPath={canonicalPath}
        image={post.image}
        type='article'
        structuredData={structuredData}
      />
      <div className='max-padd-container'>
        <Card className='overflow-hidden p-0'>
          <div className='relative'>
            <OptimizedImage src={post.image} alt={post.title} className='h-88 w-full' priority useSkeleton />
            <Badge variant='info' className='absolute left-4 top-4'>
              {post.category}
            </Badge>
          </div>
          <div className='space-y-5 p-6 md:p-10'>
            <p className='text-sm font-medium uppercase tracking-[0.25em] text-secondary'>
              {post.category}
            </p>
            <h1 className='h2'>{post.title}</h1>
            <p className='max-w-3xl text-base leading-8 text-slate-700'>{post.description}</p>
            {MdxContent ? (
              <div className='prose max-w-none text-slate-700'>
                <MdxContent />
              </div>
            ) : null}
            <div className='pt-2'>
              <Link to='/blog' className='underline font-semibold'>Back to blog archive</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BlogPost
