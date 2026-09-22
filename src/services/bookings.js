import { dummyBookingsData } from '../assets/data.js'
import { envConfig } from '../config/env.js'
import { endpoints } from '../api/endpoints.js'
import { isApiClientError } from '../api/errors.js'
import { requestJson } from '../api/client.js'

const extractBookingList = (response) => {
  if (Array.isArray(response)) return response
  return Array.isArray(response?.data) ? response.data : []
}

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
      data: extractBookingList(data),
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