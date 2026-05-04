import React, { useState } from 'react'
import { sendContactMessage } from '../services/contact'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', text: '' })

    const result = await sendContactMessage(form)
    if (result.success) {
      setStatus({ type: 'success', text: result.message })
      setForm({ name: '', email: '', message: '' })
    } else {
      setStatus({ type: 'error', text: result.message })
    }

    setLoading(false)
  }

  return (
    <section className='relative overflow-hidden bg-linear-to-b from-primary via-white to-white py-28'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        <div className='absolute -top-24 -left-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl' />
        <div className='absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-tertiary/25 blur-3xl' />
        <div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl' />
      </div>
      <div className='max-padd-container'>
        <div className='mx-auto max-w-3xl'>
          <div className='rounded-[28px] bg-linear-to-r from-secondary/35 via-white/40 to-tertiary/35 p-px'>
            <div className='relative rounded-[27px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/10'>
              <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-slate-950'>
                <span className='h-2 w-2 rounded-full bg-linear-to-r from-secondary to-tertiary' />
                Priority support
              </div>

              <h2 className='h2 mb-2'>Send us a message</h2>
              <p className='text-slate-600 mb-7'>
                Tell us what you’re looking for and we’ll get back to you with clear, tailored options.
              </p>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='group rounded-2xl bg-linear-to-r from-slate-900/10 via-secondary/10 to-slate-900/10 p-px transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/10 focus-within:-translate-y-0.5 focus-within:from-secondary/35 focus-within:via-tertiary/20 focus-within:to-secondary/35 focus-within:shadow-lg focus-within:shadow-secondary/15'>
                  <div className='rounded-2xl bg-white/90 px-4 py-3'>
                    <label className='mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 group-focus-within:text-slate-950'>
                      <span>Full name</span>
                      <span className='text-[11px] text-slate-400 transition-colors duration-300 group-hover:text-slate-500 group-focus-within:text-slate-600'>Required</span>
                    </label>
                    <input
                      id='name'
                      type='text'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='Your name'
                      className='w-full bg-transparent text-sm text-slate-950 placeholder:text-slate-400 outline-none'
                      required
                    />
                    <div className='mt-3 h-px w-full bg-slate-900/10 transition-colors duration-300 group-hover:bg-secondary/30 group-focus-within:bg-secondary/45' />
                  </div>
                </div>

                <div className='group rounded-2xl bg-linear-to-r from-slate-900/10 via-secondary/10 to-slate-900/10 p-px transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/10 focus-within:-translate-y-0.5 focus-within:from-secondary/35 focus-within:via-tertiary/20 focus-within:to-secondary/35 focus-within:shadow-lg focus-within:shadow-secondary/15'>
                  <div className='rounded-2xl bg-white/90 px-4 py-3'>
                    <label className='mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 group-focus-within:text-slate-950'>
                      <span>Email address</span>
                      <span className='text-[11px] text-slate-400 transition-colors duration-300 group-hover:text-slate-500 group-focus-within:text-slate-600'>Required</span>
                    </label>
                    <input
                      id='email'
                      type='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='name@email.com'
                      className='w-full bg-transparent text-sm text-slate-950 placeholder:text-slate-400 outline-none'
                      required
                    />
                    <div className='mt-3 h-px w-full bg-slate-900/10 transition-colors duration-300 group-hover:bg-secondary/30 group-focus-within:bg-secondary/45' />
                  </div>
                </div>

                <div className='group rounded-2xl bg-linear-to-r from-slate-900/10 via-secondary/10 to-slate-900/10 p-px transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/10 focus-within:-translate-y-0.5 focus-within:from-secondary/35 focus-within:via-tertiary/20 focus-within:to-secondary/35 focus-within:shadow-lg focus-within:shadow-secondary/15'>
                  <div className='rounded-2xl bg-white/90 px-4 py-3'>
                    <label className='mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 group-focus-within:text-slate-950'>
                      <span>Message</span>
                      <span className='text-[11px] text-slate-400 transition-colors duration-300 group-hover:text-slate-500 group-focus-within:text-slate-600'>Required</span>
                    </label>
                    <textarea
                      id='message'
                      value={form.message}
                      onChange={handleChange}
                      placeholder='Tell us what you need (buy/rent, city, budget, timeline...)'
                      rows={5}
                      className='w-full resize-none bg-transparent text-sm text-slate-950 placeholder:text-slate-400 outline-none'
                      required
                    />
                    <div className='mt-3 h-px w-full bg-slate-900/10 transition-colors duration-300 group-hover:bg-secondary/30 group-focus-within:bg-secondary/45' />
                  </div>
                </div>

                {status.text && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm transition-all duration-300 ${
                      status.type === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                        : 'border-red-500/30 bg-red-500/10 text-red-700'
                    }`}
                  >
                    {status.text}
                  </div>
                )}

                <button
                  type='submit'
                  disabled={loading}
                  className='group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-secondary to-tertiary py-3.5 px-6 font-semibold text-slate-950 transition-all duration-300 shadow-md shadow-secondary/20 disabled:opacity-70 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/25 active:translate-y-0'
                >
                  <span className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <span className='absolute -left-1/3 top-0 h-full w-2/3 -skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-[140%]' />
                  </span>
                  <span className='relative'>{loading ? 'Sending…' : 'Send message'}</span>
                </button>
              </form>
              <p className='mt-4 text-xs text-slate-500'>We’ll never share your details. Reply time depends on volume.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
