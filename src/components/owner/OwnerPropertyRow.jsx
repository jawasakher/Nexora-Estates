import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/data'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useI18n } from '../../i18n/I18nContext.jsx'

const OwnerPropertyRow = ({ property, index, currency, onToggleAvailability, onDelete, isMutating = false }) => {
  const { t } = useI18n()
  const statusVariant = property?.isAvailable ? 'success' : 'warning'

  return (
    <div className='grid gap-4 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm lg:grid-cols-[0.45fr_1.8fr_1.1fr_0.8fr_1fr] lg:items-center'>
      <div className='hidden items-center justify-center text-sm font-semibold text-slate-500 lg:flex'>
        {index + 1}
      </div>

      <div className='flex items-center gap-3'>
        <img
          src={property?.images?.[0] || ''}
          alt={property?.title || t('owner.row.fallbackProperty')}
          loading='lazy'
          className='h-16 w-16 rounded-xl object-cover'
        />
        <div className='min-w-0'>
          <h4 className='h5 line-clamp-1'>{property?.title}</h4>
          <p className='mt-1 flex items-center gap-2 text-sm text-slate-500'>
            <img src={assets.pin} alt='' width={14} />
            <span className='line-clamp-1'>{property?.address}</span>
          </p>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='info'>{property?.propertyType || t('owner.row.fallbackProperty')}</Badge>
        <Badge variant='neutral'>{property?.city || t('owner.row.unknownCity')}</Badge>
      </div>

      <div>
        <p className='bold-18 text-secondary'>{currency}{property?.price?.sale ?? '-'}</p>
        <p className='text-xs text-slate-500'>{t('owner.row.rentPrefix')} {currency}{property?.price?.rent ?? '-'}{t('owner.row.perNight')}</p>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2'>
          <div>
            <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>{t('owner.row.availability')}</p>
            <Badge variant={statusVariant} className='mt-1'>
              {property?.isAvailable ? t('common.available') : t('common.hidden')}
            </Badge>
          </div>

          <label className='relative inline-flex cursor-pointer items-center'>
            <input
              type='checkbox'
              checked={Boolean(property?.isAvailable)}
              onChange={() => onToggleAvailability(property?._id)}
              disabled={isMutating}
              className='sr-only peer'
            />
            <div className='h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-secondary' />
            <span className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5' />
          </label>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Link to={`/listing/${property?._id}`}>
            <Button variant='secondary' size='sm' className='rounded-full'>
              {t('common.view')}
            </Button>
          </Link>
          <Link to={`/owner/add-property/${property?._id}`}>
            <Button variant='ghost' size='sm' className='rounded-full'>
              {t('common.edit')}
            </Button>
          </Link>
          <Button variant='ghost' size='sm' className='rounded-full text-rose-700 hover:bg-rose-50' onClick={() => onDelete(property?._id)} disabled={isMutating}>
            {t('common.delete')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OwnerPropertyRow
