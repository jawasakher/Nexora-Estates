// Contact API Service
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || 'https://api.example.com/contact';

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

    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        source: 'website-contact',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));

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
