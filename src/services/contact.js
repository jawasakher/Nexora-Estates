import { envConfig } from '../config/env.js'
import { requestJson } from './request.js'

/**
 * Send contact message
 * @param {{name: string, email: string, message: string}} payload
 * @returns {Promise<{success: boolean, message: string, data?: any, error?: string}>}
 */
export const sendContactMessage = async (payload) => {
  try {
    const name = payload?.name?.trim() ?? '';
    const email = payload?.email?.trim() ?? '';
    const message = payload?.message?.trim() ?? '';

    if (!name || name.length < 2) {
      return { success: false, message: 'Please enter a valid name.', error: 'INVALID_NAME' };
    }

    if (!email || !isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.', error: 'INVALID_EMAIL' };
    }

    if (!message || message.length < 10) {
      return { success: false, message: 'Please write a clearer message (at least 10 characters).', error: 'INVALID_MESSAGE' };
    }

    if (!envConfig.leadsApiUrl) {
      return {
        success: false,
        message: 'Contact API is not configured.',
        error: 'API_NOT_CONFIGURED',
      }
    }

    const data = await requestJson(envConfig.leadsApiUrl, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        source: 'website-contact',
      }),
    });

    return {
      success: true,
      message: 'All set — your message has been sent.',
      data,
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      success: false,
      message: error.message?.includes('fetch')
        ? "Message not sent — check your API connection/configuration."
        : 'Message not sent — please try again later.',
      error: String(error?.message || error),
    };
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
