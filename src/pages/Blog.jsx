import React, { useEffect, useState } from 'react'
import Seo from '../components/Seo'
import { getBlogPosts } from '../services/content.js'
import Loader from '../components/ui/Loader'
import EmptyState from '../components/ui/EmptyState'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getBlogPosts()
      .then((result) => {
        if (!isMounted) return
        setPosts(Array.isArray(result?.data) ? result.data : [])
      })
      .catch((error) => {
        console.error('Failed to load blog posts', error)
        if (!isMounted) return
        setPosts([])
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <Seo
        title='Real Estate Insights'
        description='Read market insights, buyer tips, and real estate updates from Nexora Estates.'
        canonicalPath='/blog'
      />
      <div className='max-padd-container'>
        {loading ? (
          <div className='flex min-h-[50vh] items-center justify-center py-20'>
            <Loader />
          </div>
        ) : posts.length ? (
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((blog, index) => (
              <Card key={`${blog.title}-${index}`} className='overflow-hidden p-0'>
                <div className='relative'>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='h-56 w-full object-cover'
                    loading='lazy'
                    decoding='async'
                  />
                  <Badge variant='info' className='absolute left-4 top-4'>
                    {blog.category}
                  </Badge>
                </div>
                <div className='p-4'>
                  <h5 className='h5 mb-2 line-clamp-2'>{blog.title}</h5>
                  <p className='text-sm text-slate-600'>{blog.description}</p>
                  <button className='mt-3 underline bold-14 line-clamp-2'>
                    Continue reading
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title='No articles available'
            description='Connect a CMS endpoint to publish blog content dynamically.'
          />
        )}
      </div>
    </div>
  )
};

export default Blog;
