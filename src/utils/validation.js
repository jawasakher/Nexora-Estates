export const validateLeadForm = (values = {}) => {
  const errors = {}
  const name = values.name?.trim() || ''
  const email = values.email?.trim() || ''
  const phone = values.phone?.trim() || ''
  const message = values.message?.trim() || ''

  if (!name) {
    errors.name = 'Name is required.'
  } else if (name.length < 2) {
    errors.name = 'Name should be at least 2 characters.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!phone) {
    errors.phone = 'Phone is required.'
  } else if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!message) {
    errors.message = 'Message is required.'
  } else if (message.length < 20) {
    errors.message = 'Message should be at least 20 characters.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}