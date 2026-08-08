const env = import.meta.env
const builtInOwnerEmails = ['jwasakher@gmail.com', 'jwasakhergmail.com']

export const envConfig = {
  apiBaseUrl: env.VITE_API_BASE_URL || '',
  propertiesApiUrl: env.VITE_PROPERTIES_API_URL || '',
  leadsApiUrl: env.VITE_LEADS_API_URL || env.VITE_CONTACT_API_URL || '',
  newsletterApiUrl: env.VITE_NEWSLETTER_API_URL || '',
  bookingsApiUrl: env.VITE_BOOKINGS_API_URL || '',
  analyticsApiUrl: env.VITE_ANALYTICS_API_URL || '',
  cmsApiUrl: env.VITE_CMS_API_URL || '',
  ownerPropertiesApiUrl: env.VITE_OWNER_PROPERTIES_API_URL || '',
  ownerEmails: Array.from(new Set([
    ...builtInOwnerEmails,
    ...(env.VITE_OWNER_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  ])),
  siteUrl: env.VITE_SITE_URL || window.location.origin,
  imageCdnUrl: env.VITE_IMAGE_CDN_URL || '',
}

export const hasRemoteApi = Boolean(envConfig.apiBaseUrl || envConfig.propertiesApiUrl || envConfig.ownerPropertiesApiUrl || envConfig.leadsApiUrl || envConfig.newsletterApiUrl || envConfig.bookingsApiUrl || envConfig.analyticsApiUrl || envConfig.cmsApiUrl)