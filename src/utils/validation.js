export const validateLeadForm = (values = {}, t = null) => {
  const translate = (key, fallback) => (typeof t === 'function' ? t(key) : fallback)
  const errors = {}
  const name = values.name?.trim() || ''
  const email = values.email?.trim() || ''
  const phone = values.phone?.trim() || ''
  const message = values.message?.trim() || ''

  if (!name) {
    errors.name = translate('lead.validation.nameRequired', 'Name is required.')
  } else if (name.length < 2) {
    errors.name = translate('lead.validation.nameMin', 'Name should be at least 2 characters.')
  }

  if (!email) {
    errors.email = translate('lead.validation.emailRequired', 'Email is required.')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = translate('lead.validation.emailInvalid', 'Enter a valid email address.')
  }

  if (!phone) {
    errors.phone = translate('lead.validation.phoneRequired', 'Phone is required.')
  } else if (!/^[+\d][\d\s()-]{6,}$/.test(phone)) {
    errors.phone = translate('lead.validation.phoneInvalid', 'Enter a valid phone number.')
  }

  if (!message) {
    errors.message = translate('lead.validation.messageRequired', 'Message is required.')
  } else if (message.length < 20) {
    errors.message = translate('lead.validation.messageMin', 'Message should be at least 20 characters.')
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}