import { envConfig } from '../config/env.js'
import { requestJson } from './request.js'

const buildEventPayload = (eventName, properties = {}) => ({
  event: eventName,
  properties,
  path: typeof window !== 'undefined' ? window.location.pathname : '',
  url: typeof window !== 'undefined' ? window.location.href : '',
  timestamp: new Date().toISOString(),
})

export const trackEvent = async (eventName, properties = {}) => {
  const payload = buildEventPayload(eventName, properties)

  if (!envConfig.analyticsApiUrl) {
    if (import.meta.env.DEV) {
      console.debug('[analytics]', payload)
    }

    return { success: true, source: 'mock', data: payload }
  }

  try {
    const body = JSON.stringify(payload)

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })
      const delivered = navigator.sendBeacon(envConfig.analyticsApiUrl, blob)

      if (delivered) {
        return { success: true, source: 'beacon', data: payload }
      }
    }

    const data = await requestJson(envConfig.analyticsApiUrl, {
      method: 'POST',
      body,
      keepalive: true,
    })

    return { success: true, source: 'api', data }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.debug('[analytics:error]', error)
    }

    return { success: false, source: 'error', error }
  }
}