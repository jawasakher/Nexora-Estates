import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import OptimizedImage from '../components/ui/OptimizedImage'
import { blogEntries } from '../assets/blogs/index.js'
import EmptyState from '../components/ui/EmptyState'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const Blog = () => {
  const posts = blogEntries

  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <Seo
        title='Real Estate Insights'
        description='Read market insights, buyer tips, and real estate updates from Nexora Estates.'
        canonicalPath='/blog'
        type='blog'
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Real Estate Insights',
          url: new URL('/blog', window.location.origin).toString(),
          description: 'Read market insights, buyer tips, and real estate updates from Nexora Estates.',
        }}
      />
      <div className='max-padd-container'>
        {posts.length ? (
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((blog, index) => (
              <Card key={`${blog.title}-${index}`} className='overflow-hidden p-0'>
                <div className='relative'>
                  <OptimizedImage
                    src={blog.image}
                    alt={blog.title}
                    className='h-56 w-full'
                    useSkeleton
                  />
                  <Badge variant='info' className='absolute left-4 top-4'>
                    {blog.category}
                  </Badge>
                </div>
                <div className='p-4'>
                  <h5 className='h5 mb-2 line-clamp-2'>{blog.title}</h5>
                  <p className='text-sm text-slate-600'>{blog.description}</p>
                  <Link to={`/blog/${blog.slug || index}`} className='mt-3 inline-block underline bold-14 line-clamp-2'>
                    Continue reading
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title='No articles available'
            description='Add MDX files under src/assets/blogs to publish articles.'
          />
        )}
      </div>
    </div>
  )
};

export default Blog;
