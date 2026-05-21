import { envConfig } from '../config/env.js'

const joinUrl = (base, path) => {
  if (!base) return ''

  try {
    return new URL(path, base).toString()
  } catch {
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base
    const trimmedPath = path.startsWith('/') ? path : `/${path}`
    return `${trimmedBase}${trimmedPath}`
  }
}

const resolve = (directUrl, fallbackPath) => directUrl || joinUrl(envConfig.apiBaseUrl, fallbackPath)

export const endpoints = {
  properties: {
    public: () => resolve(envConfig.propertiesApiUrl, '/properties'),
    ownerAll: () => resolve(envConfig.ownerPropertiesApiUrl || envConfig.propertiesApiUrl, '/owner/properties'),
    ownerOne: (propertyId) => `${endpoints.properties.ownerAll()}/${propertyId}`,
    ownerAvailability: (propertyId) => `${endpoints.properties.ownerAll()}/${propertyId}/availability`,
  },
  bookings: {
    list: () => resolve(envConfig.bookingsApiUrl, '/bookings'),
    user: (userId) => resolve(envConfig.bookingsApiUrl, `/bookings/user/${encodeURIComponent(userId)}`),
  },
  leads: {
    submit: () => resolve(envConfig.leadsApiUrl, '/leads'),
  },
  newsletter: {
    subscribe: () => resolve(envConfig.newsletterApiUrl, '/newsletter'),
  },
  content: {
    blogs: () => resolve(envConfig.cmsApiUrl, '/cms/blogs'),
  },
  analytics: {
    track: () => resolve(envConfig.analyticsApiUrl, '/analytics/events'),
  },
}