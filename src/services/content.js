import { envConfig } from '../config/env.js'
import { endpoints } from '../api/endpoints.js'
import { isApiClientError } from '../api/errors.js'
import { requestJson } from '../api/client.js'
import { blogEntries } from '../assets/blogs/index.js'

export const getBlogPosts = async () => {
  if (!envConfig.cmsApiUrl) {
    return {
      success: true,
      data: blogEntries,
      source: 'local-mdx',
    }
  }

  try {
    const data = await requestJson(endpoints.content.blogs())

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
      source: 'api',
    }
  } catch (error) {
    if (isApiClientError(error)) {
      return {
        success: false,
        data: blogEntries,
        source: 'local-mdx-fallback',
        error,
      }
    }

    console.error('Content fetch error:', error)

    return {
      success: false,
      data: blogEntries,
      source: 'local-mdx-fallback',
      error,
    }
  }
}