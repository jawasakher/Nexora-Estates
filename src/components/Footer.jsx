import React, { useState } from 'react'
import { assets } from '../assets/data'
import { subscribeNewsletter } from '../services/newsletter'

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Listings', href: '/listing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '#' }
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' }
  ],
  resources: [
    { label: 'Buyer Guide', href: '#' },
    { label: 'Seller Guide', href: '#' },
    { label: 'Market Insights', href: '#' },
    { label: 'Pricing', href: '#' }
  ]
}

const socialLinks = [
  { icon: assets.facebook, label: 'Facebook', href: '#' },
  { icon: assets.instagram, label: 'Instagram', href: '#' },
  { icon: assets.twitter, label: 'Twitter', href: '#' },
  { icon: assets.linkedin, label: 'LinkedIn', href: '#' }
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const result = await subscribeNewsletter(email)

    if (result.success) {
      setMessage({ type: 'success', text: result.message })
      setEmail('')
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    } else {
      setMessage({ type: 'error', text: result.message })
    }

    setLoading(false)
  }

  return (
    <footer className='bg-[#fff4b8] text-slate-950'>
      <div className='border-b border-slate-900/10 bg-linear-to-r from-secondary/25 via-white/20 to-secondary/10'>
        <div className='max-padd-container py-12 xl:py-16'>
          <div className='flex flex-col gap-8 rounded-[28px] border border-slate-900/10 bg-white/70 p-6 backdrop-blur md:flex-row md:items-center md:justify-between md:p-8'>
            <div className='max-w-xl'>
              <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-white'>
                <img src={assets.rocket} alt='' width={16} className='invert' />
                Stay Updated
              </div>
              <h3 className='h3 mb-2'>Get the latest properties and market updates.</h3>
              <p className='max-w-lg text-slate-600'>
                Subscribe to receive exclusive listings, market insights, and expert real estate tips straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className='w-full md:max-w-xl'>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className='w-full rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-60'
                  required
                />
                <button
                  type='submit'
                  disabled={loading}
                  className='btn-dark rounded-full px-6 py-3 text-sm whitespace-nowrap disabled:opacity-70'
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message.text && (
                <div className={`mt-3 rounded-2xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700' : 'border-red-500/30 bg-red-500/10 text-red-700'}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className='max-padd-container py-16 xl:py-20'>
        <div className='grid gap-10 lg:grid-cols-5'>
          <div className='lg:col-span-2'>
            <div className='mb-5 flex items-center gap-3'>
              <img src={assets.logoImg} alt='Nexora Estates' width={36} height={36} />
              <span className='h4'>Nexora Estates</span>
            </div>
            <p className='max-w-md text-slate-700'>
              A premium real estate experience built for buyers, sellers, and investors who expect clarity, speed, and results.
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
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>Phone</p>
                  <a href='tel:+971234567890' className='text-sm font-semibold hover:text-slate-700'>+971 2 345 6789</a>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
                  <img src={assets.mail} alt='' width={18} height={18} className='invert' />
                </div>
                <div>
                  <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>Email</p>
                  <a href='mailto:info@nexora.com' className='text-sm font-semibold hover:text-slate-700'>info@nexora.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className='h5 mb-6'>Company</h5>
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
            <h5 className='h5 mb-6'>Support</h5>
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
            <h5 className='h5 mb-6'>Resources</h5>
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
          <div className='rounded-3xl bg-white/70 p-5 shadow-sm'>
            <p className='text-2xl font-bold text-slate-950'>5K+</p>
            <p className='text-sm text-slate-600'>Properties Available</p>
          </div>
          <div className='rounded-3xl bg-white/70 p-5 shadow-sm'>
            <p className='text-2xl font-bold text-slate-950'>50K+</p>
            <p className='text-sm text-slate-600'>Happy Clients</p>
          </div>
          <div className='rounded-3xl bg-white/70 p-5 shadow-sm'>
            <p className='text-2xl font-bold text-slate-950'>200+</p>
            <p className='text-sm text-slate-600'>Trusted Agents</p>
          </div>
          <div className='rounded-3xl bg-white/70 p-5 shadow-sm'>
            <p className='text-2xl font-bold text-slate-950'>20+</p>
            <p className='text-sm text-slate-600'>Years of Experience</p>
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-900/10 pt-8 text-center md:flex-row md:text-left'>
          <p className='text-sm text-slate-600'>© {new Date().getFullYear()} Nexora Estates. All rights reserved.</p>
          <div className='flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600'>
            <a href='#' className='transition-colors hover:text-slate-950'>Privacy Policy</a>
            <a href='#' className='transition-colors hover:text-slate-950'>Terms & Conditions</a>
            <a href='#' className='transition-colors hover:text-slate-950'>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
