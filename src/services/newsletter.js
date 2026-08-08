import { envConfig } from '../config/env.js'
import { requestJson } from './request.js'

/**
 * Subscribe email to newsletter
 * @param {string} email - Email address to subscribe
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const subscribeNewsletter = async (email) => {
  try {
    // Validate email format
    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        message: 'يرجى إدخال بريد إلكتروني صحيح',
        error: 'INVALID_EMAIL'
      };
    }

    if (!envConfig.newsletterApiUrl) {
      return {
        success: false,
        message: 'Newsletter API is not configured.',
        error: 'API_NOT_CONFIGURED',
      }
    }

    const data = await requestJson(envConfig.newsletterApiUrl, {
      method: 'POST',
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: 'website-footer'
      })
    });

    return {
      success: true,
      message: 'تم الاشتراك بنجاح! شكراً لك',
      data
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return {
      success: false,
      message: error.message?.includes('fetch') 
        ? 'خطأ في الاتصال. تحقق من إعداد API'
        : 'حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقاً',
      error: error.message
    };
  }
};

/**
 * Simple email validation
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
