import React from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import LeadForm from './LeadForm'
import { useI18n } from '../../i18n/I18nContext.jsx'

const LeadModal = ({ open, onClose, title, description, source, propertyId, listingTitle, onSuccess }) => {
  const { t } = useI18n()
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm' onClick={onClose}>
      <Card className='w-full max-w-2xl overflow-hidden p-0 shadow-2xl' onClick={(event) => event.stopPropagation()}>
        <div className='flex items-start justify-between gap-4 border-b border-slate-900/10 p-5 sm:p-6'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>{t('lead.conversionFunnel')}</p>
            <h3 className='h3 mt-1'>{title}</h3>
            <p className='mt-2 text-sm text-slate-600'>{description}</p>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose} className='rounded-full px-3 py-2'>
            {t('lead.close')}
          </Button>
        </div>

        <div className='max-h-[80vh] overflow-y-auto p-5 sm:p-6'>
          <LeadForm
            source={source}
            propertyId={propertyId}
            listingTitle={listingTitle}
            onSuccess={onSuccess}
          />
        </div>
      </Card>
    </div>
  )
}

export default LeadModal