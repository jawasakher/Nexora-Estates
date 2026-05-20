import { blogs as fallbackBlogs } from '../assets/data.js'
import { envConfig } from '../config/env.js'
import { isRequestError, requestJson } from './request.js'

const normalizeBlogPost = (post) => ({
  title: post?.title || 'Untitled post',
  category: post?.category || 'Insights',
  image: post?.image || '',
  description: post?.description || '',
  slug: post?.slug || '',
})

export const getBlogPosts = async () => {
  if (!envConfig.cmsApiUrl) {
    return {
      success: true,
      data: Array.isArray(fallbackBlogs) ? fallbackBlogs.map(normalizeBlogPost) : [],
      source: 'mock',
    }
  }

  try {
    const data = await requestJson(envConfig.cmsApiUrl)

    return {
      success: true,
      data: Array.isArray(data) ? data.map(normalizeBlogPost) : [],
      source: 'api',
    }
  } catch (error) {
    if (isRequestError(error)) {
      return {
        success: false,
        data: Array.isArray(fallbackBlogs) ? fallbackBlogs.map(normalizeBlogPost) : [],
        source: 'mock-fallback',
        error,
      }
    }

    console.error('Content fetch error:', error)

    return {
      success: false,
      data: Array.isArray(fallbackBlogs) ? fallbackBlogs.map(normalizeBlogPost) : [],
      source: 'mock-fallback',
      error,
    }
  }
}