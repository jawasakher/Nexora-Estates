import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supportedLanguages, translations } from './translations.js'

const I18nContext = createContext(null)

const DEFAULT_LANGUAGE = 'en'

const getByPath = (source, path) => {
  return path.split('.').reduce((value, key) => (value && key in value ? value[key] : undefined), source)
}

const interpolate = (template, values = {}) => {
  if (typeof template !== 'string') return template
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => (key in values ? String(values[key]) : ''))
}

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem('site-language')
    if (saved && supportedLanguages.includes(saved)) {
      return saved
    }
  } catch {
    // localStorage can be unavailable in restrictive environments.
  }

  const browserLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : DEFAULT_LANGUAGE
  return browserLang.startsWith('ar') ? 'ar' : DEFAULT_LANGUAGE
}

export const I18nProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = (nextLanguage) => {
    if (!supportedLanguages.includes(nextLanguage)) return
    setLanguageState(nextLanguage)
  }

  const t = (key, values = {}) => {
    const current = getByPath(translations[language], key)
    const fallback = getByPath(translations[DEFAULT_LANGUAGE], key)
    const value = current ?? fallback ?? key
    return interpolate(value, values)
  }

  useEffect(() => {
    try {
      localStorage.setItem('site-language', language)
    } catch {
      // Ignore persistence errors and continue runtime behavior.
    }

    const direction = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    document.documentElement.dir = direction
    document.body.setAttribute('dir', direction)
  }, [language])

  const value = useMemo(
    () => ({ language, setLanguage, supportedLanguages, isRTL: language === 'ar', t }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}