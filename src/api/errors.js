export class ApiClientError extends Error {
  constructor(message, { status = 0, code = 'REQUEST_ERROR', details = null, retryable = false } = {}) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
    this.retryable = retryable
  }
}

export const isApiClientError = (error) => error instanceof ApiClientError

export const isRetryableStatus = (status) => status === 408 || status === 425 || status === 429 || status >= 500