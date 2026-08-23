import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import OptimizedImage from '../components/ui/OptimizedImage'
import { blogEntries } from '../assets/blogs/index.js'
import EmptyState from '../components/ui/EmptyState'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useI18n } from '../i18n/I18nContext.jsx'

const Blog = () => {
  const { t, isRTL } = useI18n()
  const posts = blogEntries

  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <Seo
        title={t('blog.seoTitle')}
        description={t('blog.seoDescription')}
        canonicalPath='/blog'
        type='blog'
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: t('blog.seoTitle'),
          url: new URL('/blog', window.location.origin).toString(),
          description: t('blog.seoDescription'),
        }}
      />
      <div className='max-padd-container'>
        {posts.length ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((blog, index) => (
              <Card key={`${blog.title}-${index}`} className='min-w-0 overflow-hidden p-0'>
                <div className='relative'>
                  <OptimizedImage
                    src={blog.image}
                    alt={blog.title}
                    className='h-56 w-full object-cover'
                    useSkeleton
                  />
                  <Badge variant='info' className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                    {blog.category}
                  </Badge>
                </div>
                <div className='flex h-full flex-col p-4'>
                  <h5 className='h5 mb-2 line-clamp-2'>{blog.title}</h5>
                  <p className='text-sm text-slate-600'>{blog.description}</p>
                  <Link to={`/blog/${blog.slug || index}`} className='mt-3 inline-block underline bold-14 line-clamp-2'>
                    {t('blog.continueReading')}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title={t('blog.noArticles')}
            description={t('blog.noArticlesDescription')}
          />
        )}
      </div>
    </div>
  )
};

export default Blog;
