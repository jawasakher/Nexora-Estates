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
      return { success: false, message: 'الرجاء إدخال الاسم بشكل صحيح', error: 'INVALID_NAME' };
    }

    if (!email || !isValidEmail(email)) {
      return { success: false, message: 'يرجى إدخال بريد إلكتروني صحيح', error: 'INVALID_EMAIL' };
    }

    if (!message || message.length < 10) {
      return { success: false, message: 'الرجاء كتابة رسالة أوضح (على الأقل 10 أحرف)', error: 'INVALID_MESSAGE' };
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
      message: 'مشي لحال — تم إرسال رسالتك بنجاح',
      data,
    };
  } catch (error) {
    console.error('Contact form error:', error);

    return {
      success: false,
      message: error.message?.includes('fetch')
        ? 'الرسالة ما انبعتت — في مشكلة اتصال/إعداد API'
        : 'الرسالة ما انبعتت — جرّب مرة ثانية لاحقاً',
      error: String(error?.message || error),
    };
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
