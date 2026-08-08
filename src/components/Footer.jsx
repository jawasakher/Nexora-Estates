import React, { useState } from 'react'
import { assets } from '../assets/data'
import Button from './ui/Button'
import Input from './ui/Input'
import { useAppContext } from '../context/AppContext.jsx'
import { LEAD_SOURCES } from '../constants/leadSources.js'
import { trackEvent } from '../services/analytics.js'
import { subscribeNewsletter } from '../services/newsletter.js'
import { useI18n } from '../i18n/I18nContext.jsx'

// social labels are localized inside the component

const Footer = () => {
  const { t } = useI18n()
  const { navigate } = useAppContext()
  const socialLinks = [
    { icon: assets.facebook, label: t('footer.social.facebook'), href: '#' },
    { icon: assets.instagram, label: t('footer.social.instagram'), href: '#' },
    { icon: assets.twitter, label: t('footer.social.twitter'), href: '#' },
    { icon: assets.linkedin, label: t('footer.social.linkedin'), href: '#' }
  ]
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const footerLinks = {
    company: [
      { label: t('footer.companyLinks.aboutUs'), href: '#' },
      { label: t('footer.companyLinks.listings'), href: '/listing' },
      { label: t('footer.companyLinks.blog'), href: '/blog' },
      { label: t('footer.companyLinks.careers'), href: '#' }
    ],
    support: [
      { label: t('footer.supportLinks.helpCenter'), href: '#' },
      { label: t('footer.supportLinks.contactUs'), href: '/contact' },
      { label: t('footer.supportLinks.terms'), href: '#' },
      { label: t('footer.supportLinks.privacy'), href: '#' }
    ],
    resources: [
      { label: t('footer.resourceLinks.buyerGuide'), href: '#' },
      { label: t('footer.resourceLinks.sellerGuide'), href: '#' },
      { label: t('footer.resourceLinks.marketInsights'), href: '#' },
      { label: t('footer.resourceLinks.pricing'), href: '#' }
    ]
  }

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault()
    setNewsletterLoading(true)
    setNewsletterStatus('idle')
    setNewsletterMessage('')

    try {
      const result = await subscribeNewsletter(newsletterEmail.trim())
      setNewsletterStatus(result.success ? 'success' : 'error')
      setNewsletterMessage(result.message)

      if (result.success) {
        setNewsletterEmail('')
      }
    } catch (error) {
      setNewsletterStatus('error')
      setNewsletterMessage(error instanceof Error ? error.message : t('footer.newsletterError'))
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <footer className='bg-linear-to-r from-secondary/20 via-tertiary/10 to-secondary/15 text-slate-950'>
      <div className='border-b border-slate-900/10 bg-linear-to-r from-secondary/30 via-white/25 to-tertiary/20'>
        <div className='max-padd-container py-12 xl:py-16'>
          <div className='flex flex-col gap-8 rounded-[28px] border border-slate-900/10 bg-white/70 p-6 backdrop-blur md:flex-row md:items-start md:justify-between md:p-8'>
            <div className='max-w-xl'>
              <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-white'>
                <img src={assets.rocket} alt='' width={16} className='invert' />
                {t('footer.stayUpdated')}
              </div>
              <h3 className='h3 mb-2'>{t('footer.latestTitle')}</h3>
              <p className='max-w-lg text-slate-600'>
                {t('footer.latestDescription')}
              </p>
            </div>

            <div className='w-full md:max-w-xl'>
              <div className='space-y-4'>
                <form onSubmit={handleNewsletterSubmit} className='rounded-3xl border border-slate-900/10 bg-white p-4 shadow-sm sm:p-5'>
                  <div className='flex flex-col gap-3 sm:flex-row'>
                    <Input
                      type='email'
                      label={t('footer.newsletterLabel')}
                      value={newsletterEmail}
                      onChange={(event) => setNewsletterEmail(event.target.value)}
                      placeholder={t('footer.newsletterPlaceholder')}
                      className='rounded-full'
                      required
                    />
                    <Button
                      type='submit'
                      loading={newsletterLoading}
                      variant='primary'
                      size='lg'
                      className='rounded-full whitespace-nowrap sm:self-end'
                    >
                      {t('common.subscribe')}
                    </Button>
                  </div>

                  {newsletterStatus !== 'idle' ? (
                    <p className={`mt-3 text-sm ${newsletterStatus === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {newsletterMessage}
                    </p>
                  ) : null}
                </form>

                <div className='flex flex-col gap-3 sm:flex-row'>
                  <Button
                    onClick={() => {
                      trackEvent('cta_clicked', {
                        source: LEAD_SOURCES.FOOTER_CTA,
                        label: t('common.contactUs'),
                        placement: 'footer_primary',
                      })
                      navigate(`/contact?source=${LEAD_SOURCES.FOOTER_CTA}&title=Footer%20CTA%20inquiry`)
                    }}
                    variant='dark'
                    size='lg'
                    className='rounded-full whitespace-nowrap'
                  >
                    {t('common.contactUs')}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-padd-container py-16 xl:py-20'>
        <div className='grid gap-10 lg:grid-cols-5'>
          <div className='lg:col-span-2'>
            <div className='mb-8 flex items-center gap-4'>
              <img src={assets.logoImg} alt='Nexora Estates' width={56} height={56} className='drop-shadow-md' />
              <span className='text-2xl font-bold bg-linear-to-r from-secondary to-tertiary bg-clip-text text-transparent'>Nexora Estates</span>
            </div>
            <p className='max-w-md text-slate-700'>
              {t('footer.brandDescription')}
            </p>

            <div className='mt-6 flex items-center gap-3'>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/80 transition-transform duration-300 hover:-translate-y-1 hover:bg-secondary'
                >
                  <img src={link.icon} alt='' width={18} height={18} />
                </a>
              ))}
            </div>

            <div className='mt-8 space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
                  <img src={assets.phone} alt='' width={18} height={18} className='invert' />
                </div>
                <div>
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>{t('footer.phone')}</p>
                  <a href='tel:+971234567890' className='text-sm font-semibold hover:text-slate-700'>+971 2 345 6789</a>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
                  <img src={assets.mail} alt='' width={18} height={18} className='invert' />
                </div>
                <div>
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>{t('footer.email')}</p>
                  <a href='mailto:info@nexora.com' className='text-sm font-semibold hover:text-slate-700'>info@nexora.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className='h5 mb-6'>{t('footer.company')}</h5>
            <ul className='space-y-3'>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className='text-sm text-slate-700 transition-colors duration-300 hover:text-slate-950'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className='h5 mb-6'>{t('footer.support')}</h5>
            <ul className='space-y-3'>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className='text-sm text-slate-700 transition-colors duration-300 hover:text-slate-950'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className='h5 mb-6'>{t('footer.resources')}</h5>
            <ul className='space-y-3'>
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className='text-sm text-slate-700 transition-colors duration-300 hover:text-slate-950'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-14 grid gap-4 border-t border-slate-900/10 pt-8 sm:grid-cols-2 xl:grid-cols-4'>
          <div className='rounded-3xl bg-linear-to-br from-secondary/20 to-white/50 p-5 shadow-sm border border-secondary/20'>
            <p className='text-2xl font-bold text-slate-950'>5K+</p>
            <p className='text-sm text-slate-600'>{t('footer.stats.properties')}</p>
          </div>
          <div className='rounded-3xl bg-linear-to-br from-tertiary/20 to-white/50 p-5 shadow-sm border border-tertiary/20'>
            <p className='text-2xl font-bold text-slate-950'>50K+</p>
            <p className='text-sm text-slate-600'>{t('footer.stats.clients')}</p>
          </div>
          <div className='rounded-3xl bg-linear-to-br from-secondary/20 to-white/50 p-5 shadow-sm border border-secondary/20'>
            <p className='text-2xl font-bold text-slate-950'>200+</p>
            <p className='text-sm text-slate-600'>{t('footer.stats.agents')}</p>
          </div>
          <div className='rounded-3xl bg-linear-to-br from-tertiary/20 to-white/50 p-5 shadow-sm border border-tertiary/20'>
            <p className='text-2xl font-bold text-slate-950'>20+</p>
            <p className='text-sm text-slate-600'>{t('footer.stats.experience')}</p>
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-900/10 pt-8 text-center md:flex-row md:text-left'>
          <p className='text-sm text-slate-600'>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className='flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600'>
            <a href='#' className='transition-colors hover:text-slate-950'>{t('footer.supportLinks.privacy')}</a>
            <a href='#' className='transition-colors hover:text-slate-950'>{t('footer.supportLinks.terms')}</a>
            <a href='#' className='transition-colors hover:text-slate-950'>{t('footer.sitemap')}</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
