const defaultHeaders = {
  'Content-Type': 'application/json',
}

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'REQUEST_ERROR', details = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => '')
}

const normalizeRequestError = async (response) => {
  const body = await parseResponseBody(response)
  const details = body && typeof body === 'object' ? body : { message: body }
  const message = details?.message || `Request failed with status ${response.status}`

  return new ApiError(message, {
    status: response.status,
    code: details?.code || `HTTP_${response.status}`,
    details,
  })
}

export const requestJson = async (url, options = {}) => {
  const { getToken, headers, ...fetchOptions } = options
  const token = typeof getToken === 'function' ? await getToken() : null

  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...fetchOptions,
  })

  if (!response.ok) {
    throw await normalizeRequestError(response)
  }

  if (response.status === 204) return null

  return parseResponseBody(response)
}

export const isRequestError = (error) => error instanceof ApiError