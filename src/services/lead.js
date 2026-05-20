import { envConfig } from '../config/env.js'
import { requestJson } from './request.js'

const mockSubmitLead = (payload) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (payload?.customer?.email?.toLowerCase().includes('fail')) {
        reject(new Error('Mock submission rejected.'))
        return
      }

      resolve({ success: true, data: payload })
    }, 900)
  })
}

export const submitLead = async (payload, options = {}) => {
  if (!envConfig.leadsApiUrl) {
    return mockSubmitLead(payload)
  }

  const data = await requestJson(envConfig.leadsApiUrl, {
    method: 'POST',
    getToken: options.getToken,
    body: JSON.stringify(payload),
  })

  return {
    success: true,
    data,
  }
}
