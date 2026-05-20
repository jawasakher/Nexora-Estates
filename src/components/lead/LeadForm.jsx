import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import { validateLeadForm } from '../../utils/validation.js'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import SubmissionFeedback from './SubmissionFeedback'
import { LEAD_SOURCES } from '../../constants/leadSources.js'
import { submitLead } from '../../services/lead.js'
import { trackEvent } from '../../services/analytics.js'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const LeadForm = ({ source = LEAD_SOURCES.LISTING_DETAIL, propertyId, listingTitle, onSubmit, onSuccess }) => {
  const { user } = useAppContext()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validation = validateLeadForm(values)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setStatus('error')
      setFeedbackMessage('Please fix the highlighted fields and try again.')
      return
    }

    const leadPayload = {
      source,
      propertyId,
      listingTitle,
      customer: {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      },
      message: values.message.trim(),
      userId: user?.id ?? null,
      submittedAt: new Date().toISOString(),
    }

    setStatus('loading')
    setFeedbackMessage('')

    try {
      if (onSubmit) {
        await onSubmit(leadPayload)
      } else {
        await submitLead(leadPayload)
      }

      setStatus('success')
      setFeedbackMessage('Your inquiry was captured. We will contact you shortly.')
      setValues(initialValues)
      setErrors({})

      if (onSuccess) {
        onSuccess(leadPayload)
      }

      trackEvent('lead_submitted', {
        source,
        propertyId: propertyId ?? null,
        listingTitle: listingTitle ?? '',
      })
    } catch (error) {
      setStatus('error')
      setFeedbackMessage(error instanceof Error ? error.message : 'Failed to send the inquiry.')
    }
  }

  return (
    <Card className='p-5 sm:p-6'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Lead capture</p>
          <h4 className='h4'>Send an inquiry</h4>
        </div>
        <Badge variant='info'>{source}</Badge>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          label='Name'
          name='name'
          value={values.name}
          onChange={handleChange}
          placeholder='Your full name'
          error={errors.name}
          required
        />

        <Input
          label='Email'
          name='email'
          type='email'
          value={values.email}
          onChange={handleChange}
          placeholder='you@example.com'
          error={errors.email}
          required
        />

        <Input
          label='Phone'
          name='phone'
          type='tel'
          value={values.phone}
          onChange={handleChange}
          placeholder='+1 555 123 4567'
          error={errors.phone}
          required
        />

        <Textarea
          label='Message'
          name='message'
          value={values.message}
          onChange={handleChange}
          rows={5}
          placeholder='Tell us what you are looking for...'
          error={errors.message}
          required
        />

        <SubmissionFeedback status={status} message={feedbackMessage} />

        <Button type='submit' loading={status === 'loading'} className='w-full rounded-xl'>
          Send Inquiry
        </Button>
      </form>
    </Card>
  )
}

export default LeadForm