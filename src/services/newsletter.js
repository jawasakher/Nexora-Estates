// Newsletter API Service
const NEWSLETTER_API_URL = import.meta.env.VITE_NEWSLETTER_API_URL || 'https://api.example.com/newsletter';

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

    const response = await fetch(NEWSLETTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: 'website-footer'
      })
    });

    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 409) {
        return {
          success: false,
          message: 'هذا البريد مشترك بالفعل',
          error: 'ALREADY_SUBSCRIBED'
        };
      }

      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();

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
