import { useI18n } from '../../i18n/I18nContext.jsx'

const LanguageSwitcher = ({ className = '' }) => {
  const { language, setLanguage } = useI18n()

  return (
    <div className={`inline-flex items-center rounded-full border border-slate-900/10 bg-white/90 p-1 shadow-sm ${className}`}>
      <button
        type='button'
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === 'en' ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        EN
      </button>
      <button
        type='button'
        onClick={() => setLanguage('ar')}
        aria-pressed={language === 'ar'}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
          language === 'ar' ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        AR
      </button>
    </div>
  )
}

export default LanguageSwitcher