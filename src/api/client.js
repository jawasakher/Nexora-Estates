import { ApiClientError, isRetryableStatus } from './errors.js'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const parseResponseBody = async (response) => {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => '')
}

const normalizeResponseError = async (response) => {
  const body = await parseResponseBody(response)
  const details = body && typeof body === 'object' ? body : { message: body }

  return new ApiClientError(details?.message || `Request failed with status ${response.status}`, {
    status: response.status,
    code: details?.code || `HTTP_${response.status}`,
    details,
    retryable: isRetryableStatus(response.status),
  })
}

const shouldRetry = (error) => {
  if (error instanceof ApiClientError) {
    return error.retryable
  }

  return error?.name === 'AbortError' || error instanceof TypeError
}

export const requestJson = async (url, options = {}) => {
  const {
    getToken,
    headers,
    timeoutMs = 15000,
    retry = 2,
    retryDelayMs = 250,
    ...fetchOptions
  } = options

  const token = typeof getToken === 'function' ? await getToken() : null
  const isFormData = typeof FormData !== 'undefined' && fetchOptions.body instanceof FormData

  let lastError = null

  for (let attempt = 0; attempt <= retry; attempt += 1) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timeoutId = controller
      ? window.setTimeout(() => controller.abort(), timeoutMs)
      : null

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller?.signal,
        headers: {
          ...(!isFormData ? defaultHeaders : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(headers || {}),
        },
      })

      if (!response.ok) {
        throw await normalizeResponseError(response)
      }

      return parseResponseBody(response)
    } catch (error) {
      lastError = error

      if (attempt < retry && shouldRetry(error)) {
        await sleep(retryDelayMs * (attempt + 1))
        continue
      }

      if (error?.name === 'AbortError') {
        throw new ApiClientError('Request timed out.', {
          code: 'TIMEOUT',
          retryable: true,
        })
      }

      if (error instanceof ApiClientError) {
        throw error
      }

      throw new ApiClientError(error?.message || 'Unexpected request failure.', {
        code: 'NETWORK_ERROR',
        retryable: true,
        details: { cause: String(error?.message || error) },
      })
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }

  throw lastError
}