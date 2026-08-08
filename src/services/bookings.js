import { dummyBookingsData } from '../assets/data.js'
import { envConfig } from '../config/env.js'
import { endpoints } from '../api/endpoints.js'
import { isApiClientError } from '../api/errors.js'
import { requestJson } from '../api/client.js'

export const getBookings = async (options = {}) => {
  if (!envConfig.bookingsApiUrl) {
    return {
      success: true,
      data: Array.isArray(dummyBookingsData) ? dummyBookingsData : [],
      source: 'mock',
    }
  }

  try {
    const data = await requestJson(endpoints.bookings.list(), { getToken: options.getToken })

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
      source: 'api',
    }
  } catch (error) {
    if (isApiClientError(error)) {
      return {
        success: false,
        data: Array.isArray(dummyBookingsData) ? dummyBookingsData : [],
        source: 'mock-fallback',
        error,
      }
    }

    console.error('Bookings fetch error:', error)

    return {
      success: false,
      data: Array.isArray(dummyBookingsData) ? dummyBookingsData : [],
      source: 'mock-fallback',
      error,
    }
  }
}