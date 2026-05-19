import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import SectionTitle from '../components/ui/SectionTitle'
import LeadForm from '../components/lead/LeadForm'
import { LEAD_SOURCES } from '../constants/leadSources.js'

const Contact = () => {
  const location = useLocation()

  const leadMeta = useMemo(() => {
    const params = new URLSearchParams(location.search)

    return {
      source: params.get('source') || LEAD_SOURCES.CONTACT_PAGE,
      title: params.get('title') || 'Contact page inquiry',
      propertyId: params.get('propertyId') || undefined,
    }
  }, [location.search])

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
              <LeadForm
                source={leadMeta.source}
                propertyId={leadMeta.propertyId}
                listingTitle={leadMeta.title}
                onSuccess={() => undefined}
              />
              <p className='mt-4 text-xs text-slate-500'>We’ll never share your details. Reply time depends on volume.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
