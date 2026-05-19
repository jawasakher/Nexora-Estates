import React, { useState } from 'react'
import { sendContactMessage } from '../services/contact'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import SectionTitle from '../components/ui/SectionTitle'

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
    <section className='relative overflow-hidden bg-linear-to-b from-primary via-white to-white py-16 pt-28'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-0'>
        <div className='absolute -top-24 -left-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl' />
        <div className='absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-tertiary/25 blur-3xl' />
        <div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl' />
      </div>
      <div className='max-padd-container'>
        <div className='mx-auto max-w-3xl'>
          <div className='rounded-[28px] bg-linear-to-r from-secondary/35 via-white/40 to-tertiary/35 p-px'>
            <Card className='relative bg-white/80 p-6 backdrop-blur md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/10'>
              <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-slate-950'>
                <span className='h-2 w-2 rounded-full bg-linear-to-r from-secondary to-tertiary' />
                Priority support
              </div>

              <SectionTitle
                title='Send us a message'
                description='Tell us what you’re looking for and we’ll get back to you with clear, tailored options.'
                className='mb-7'
              />

              <form onSubmit={handleSubmit} className='space-y-4'>
                <Input
                  id='name'
                  label='Full name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  required
                />

                <Input
                  id='email'
                  type='email'
                  label='Email address'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='name@email.com'
                  required
                />

                <Textarea
                  id='message'
                  label='Message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='Tell us what you need (buy/rent, city, budget, timeline...)'
                  rows={5}
                  required
                />

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

                <Button
                  type='submit'
                  disabled={loading}
                  loading={loading}
                  variant='primary'
                  size='lg'
                  className='w-full rounded-2xl'
                >
                  Send message
                </Button>
              </form>
              <p className='mt-4 text-xs text-slate-500'>We’ll never share your details. Reply time depends on volume.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
