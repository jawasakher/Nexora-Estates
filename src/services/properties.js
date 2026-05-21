import { dummyProperties } from '../assets/data.js'
import { envConfig } from '../config/env.js'
import { endpoints } from '../api/endpoints.js'
import { isApiClientError } from '../api/errors.js'
import { requestJson } from '../api/client.js'

const normalizeProperty = (property) => property

export const getProperties = async () => {
  if (!envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: Array.isArray(dummyProperties) ? dummyProperties : [],
      source: 'mock',
    }
  }

  try {
    const data = await requestJson(endpoints.properties.public())

    return {
      success: true,
      data: Array.isArray(data) ? data.map(normalizeProperty) : [],
      source: 'api',
    }
  } catch (error) {
    if (isApiClientError(error)) {
      return {
        success: false,
        data: Array.isArray(dummyProperties) ? dummyProperties : [],
        source: 'mock-fallback',
        error,
      }
    }

    console.error('Property fetch error:', error)

    return {
      success: false,
      data: Array.isArray(dummyProperties) ? dummyProperties : [],
      source: 'mock-fallback',
      error,
    }
  }
}