import React from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const SubmissionFeedback = ({ status = 'idle', message }) => {
  const { t } = useI18n()

  const feedbackMap = {
    loading: {
      title: t('lead.feedback.sendingTitle'),
      tone: 'border-secondary/20 bg-secondary/10 text-slate-900',
      message: t('lead.feedback.sendingMessage'),
    },
    success: {
      title: t('lead.feedback.sentTitle'),
      tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
      message: t('lead.feedback.sentMessage'),
    },
    error: {
      title: t('lead.feedback.failedTitle'),
      tone: 'border-red-500/20 bg-red-500/10 text-red-700',
      message: t('lead.feedback.failedMessage'),
    },
  }

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