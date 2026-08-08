import { dummyProperties } from '../assets/data.js'
import { envConfig } from '../config/env.js'
import { endpoints } from '../api/endpoints.js'
import { isApiClientError } from '../api/errors.js'
import { requestJson } from '../api/client.js'

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const selectedAmenities = (amenities = {}) =>
  Object.entries(amenities)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([name]) => name)

const normalizeProperty = (property) => ({
  ...property,
  _id: property?._id || `temp_${Date.now()}`,
  title: property?.title || '',
  description: property?.description || '',
  city: property?.city || '',
  country: property?.country || '',
  address: property?.address || '',
  propertyType: property?.propertyType || '',
  price: {
    rent: toNumber(property?.price?.rent),
    sale: toNumber(property?.price?.sale),
  },
  facilities: {
    bedrooms: toNumber(property?.facilities?.bedrooms),
    bathrooms: toNumber(property?.facilities?.bathrooms),
    garages: toNumber(property?.facilities?.garages),
  },
  area: toNumber(property?.area),
  amenities: Array.isArray(property?.amenities) ? property.amenities : selectedAmenities(property?.amenities),
  images: Array.isArray(property?.images) ? property.images : [],
  isAvailable: Boolean(property?.isAvailable ?? true),
  status: property?.status || (property?.isAvailable === false ? 'hidden' : 'available'),
})

const buildPropertyPayload = (input = {}) => ({
  title: input.title?.trim() || '',
  description: input.description?.trim() || '',
  city: input.city?.trim() || '',
  country: input.country?.trim() || '',
  address: input.address?.trim() || '',
  propertyType: input.propertyType || '',
  area: toNumber(input.area),
  price: {
    rent: toNumber(input.priceRent),
    sale: toNumber(input.priceSale),
  },
  facilities: {
    bedrooms: toNumber(input.bedrooms),
    bathrooms: toNumber(input.bathrooms),
    garages: toNumber(input.garages),
  },
  amenities: selectedAmenities(input.amenities),
  isAvailable: true,
  status: 'available',
})

const buildPropertyFormData = (input = {}) => {
  const formData = new FormData()
  const payload = buildPropertyPayload(input)

  Object.entries(payload).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      formData.append(key, JSON.stringify(value))
      return
    }

    formData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value ?? ''))
  })

  Array.from(input.images || [])
    .filter(Boolean)
    .forEach((imageFile) => formData.append('images', imageFile))

  return formData
}

export const ownerQueryKeys = {
  all: ['owner'],
  properties: (ownerId = 'me') => [...ownerQueryKeys.all, 'properties', ownerId],
  dashboard: (ownerId = 'me') => [...ownerQueryKeys.all, 'dashboard', ownerId],
}

export const getOwnerProperties = async (options = {}) => {
  if (!envConfig.ownerPropertiesApiUrl && !envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: Array.isArray(dummyProperties) ? dummyProperties.map(normalizeProperty) : [],
      source: 'mock',
    }
  }

  const url = endpoints.properties.ownerAll()

  try {
    const data = await requestJson(url, { getToken: options.getToken })

    return {
      success: true,
      data: Array.isArray(data) ? data.map(normalizeProperty) : [],
      source: 'api',
    }
  } catch (error) {
    if (isApiClientError(error)) {
      return {
        success: false,
        data: Array.isArray(dummyProperties) ? dummyProperties.map(normalizeProperty) : [],
        source: 'mock-fallback',
        error,
      }
    }

    console.error('Owner properties fetch error:', error)

    return {
      success: false,
      data: Array.isArray(dummyProperties) ? dummyProperties.map(normalizeProperty) : [],
      source: 'mock-fallback',
      error,
    }
  }
}

export const createOwnerProperty = async (input, options = {}) => {
  const payload = buildPropertyPayload(input)
  const fallbackImages = Array.from(input?.images || []).filter(Boolean).map((file) => URL.createObjectURL(file))

  if (!envConfig.ownerPropertiesApiUrl && !envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: normalizeProperty({
        ...payload,
        _id: `temp_${Date.now()}`,
        images: fallbackImages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
      source: 'mock',
    }
  }

  const url = endpoints.properties.ownerAll()
  const body = buildPropertyFormData(input)

  const data = await requestJson(url, {
    method: 'POST',
    body,
    getToken: options.getToken,
  })

  return {
    success: true,
    data: normalizeProperty({ ...payload, ...data }),
    source: 'api',
  }
}

export const updateOwnerProperty = async (propertyId, input, options = {}) => {
  const payload = buildPropertyPayload(input)

  if (!envConfig.ownerPropertiesApiUrl && !envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: normalizeProperty({
        ...payload,
        _id: propertyId,
        images: Array.isArray(input?.images) ? input.images : [],
        updatedAt: new Date().toISOString(),
      }),
      source: 'mock',
    }
  }

  const url = endpoints.properties.ownerOne(propertyId)
  const data = await requestJson(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    getToken: options.getToken,
  })

  return {
    success: true,
    data: normalizeProperty({ ...payload, ...data, _id: propertyId }),
    source: 'api',
  }
}

export const deleteOwnerProperty = async (propertyId, options = {}) => {
  if (!envConfig.ownerPropertiesApiUrl && !envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: { _id: propertyId },
      source: 'mock',
    }
  }

  const url = endpoints.properties.ownerOne(propertyId)
  await requestJson(url, {
    method: 'DELETE',
    getToken: options.getToken,
  })

  return {
    success: true,
    data: { _id: propertyId },
    source: 'api',
  }
}

export const toggleOwnerPropertyAvailability = async (propertyId, nextAvailability, options = {}) => {
  if (!envConfig.ownerPropertiesApiUrl && !envConfig.propertiesApiUrl) {
    return {
      success: true,
      data: { _id: propertyId, isAvailable: nextAvailability, status: nextAvailability ? 'available' : 'hidden' },
      source: 'mock',
    }
  }

  const url = endpoints.properties.ownerAvailability(propertyId)
  const data = await requestJson(url, {
    method: 'PATCH',
    body: JSON.stringify({ isAvailable: nextAvailability }),
    getToken: options.getToken,
  })

  return {
    success: true,
    data: { _id: propertyId, isAvailable: nextAvailability, status: nextAvailability ? 'available' : 'hidden', ...data },
    source: 'api',
  }
}

export const normalizeOwnerProperty = normalizeProperty