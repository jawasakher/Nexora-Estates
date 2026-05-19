import React from 'react'

const feedbackMap = {
  loading: {
    title: 'Sending inquiry',
    tone: 'border-secondary/20 bg-secondary/10 text-slate-900',
    message: 'Please wait while we prepare your lead payload.',
  },
  success: {
    title: 'Inquiry sent',
    tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
    message: 'Your message has been captured successfully.',
  },
  error: {
    title: 'Submission failed',
    tone: 'border-red-500/20 bg-red-500/10 text-red-700',
    message: 'Something went wrong while sending the inquiry.',
  },
}

const SubmissionFeedback = ({ status = 'idle', message }) => {
  if (status === 'idle') return null

  const feedback = feedbackMap[status] || feedbackMap.error

  return (
    <div
      role={status === 'error' ? 'alert' : 'status'}
      aria-live={status === 'error' ? 'assertive' : 'polite'}
      aria-atomic='true'
      className={`rounded-xl border px-4 py-3 text-sm ${feedback.tone}`}
    >
      <p className='font-semibold'>{feedback.title}</p>
      <p className='mt-1'>{message || feedback.message}</p>
    </div>
  )
}

export default SubmissionFeedback