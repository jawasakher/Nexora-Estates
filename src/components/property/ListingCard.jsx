import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/data'
import { radius, shadow, surface, spacing } from '../../styles/theme'
import Button from '../ui/Button'
import { useAppContext } from '../../context/AppContext.jsx'
import OptimizedImage from '../ui/OptimizedImage'
import { LEAD_SOURCES } from '../../constants/leadSources.js'
import { trackEvent } from '../../services/analytics.js'
import { useI18n } from '../../i18n/I18nContext.jsx'

const ListingCard = ({ property, currency = '$', showDescription = true, className = '' }) => {
  const { navigate } = useAppContext()
  const { t } = useI18n()

  if (!property) return null

  const handleInquireClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    trackEvent('cta_clicked', {
      source: LEAD_SOURCES.LISTING_CTA,
      label: 'Inquire',
      propertyId: property._id,
      propertyTitle: property.title,
      placement: 'listing_card',
    })

    navigate(`/contact?source=${LEAD_SOURCES.LISTING_CTA}&propertyId=${encodeURIComponent(property._id)}&title=${encodeURIComponent(property.title)}`)
  }

  return (
    <div className={`block overflow-hidden ${radius.section} ${surface.card} ${shadow.soft} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 ${className}`}>
      <Link to={'/listing/' + property?._id} className='block'>
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={property?.images?.[0] || assets.about}
          alt={property?.title || 'Property'}
          className="h-52 w-full"
          placeholder={assets.about}
          animatedHighlight={true}
          sizes='(max-width: 640px) 100vw, 300px'
        />
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/0 via-transparent to-black/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
          {property?.propertyType || t('listing.card.propertyFallback')}
        </div>
      </div>

      <div className={spacing.card}>
        <div className="flexBetween gap-3">
          <div className="min-w-0">
            <h4 className="h4 line-clamp-1">{property?.title}</h4>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <img src={assets.pin} alt="" width={14} />
              <span className="line-clamp-1">{property?.address || property?.city || t('listing.card.locationFallback')}</span>
            </p>
          </div>

            <div className="shrink-0 text-right">
            <div className="bold-15 text-secondary">
              {currency}{property?.price?.sale ?? '-'}
            </div>
            <div className="text-xs text-slate-500">{t('listing.card.salePriceLabel')}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
          <span className="rounded-full bg-slate-100 px-3 py-1">{t('listing.card.bedsLabel')}: {property?.facilities?.bedrooms ?? 0}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{t('listing.card.bathsLabel')}: {property?.facilities?.bathrooms ?? 0}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{t('listing.card.garageLabel')}: {property?.facilities?.garages ?? 0}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">{property?.area ?? '-'} {t('listing.card.areaUnit')}</span>
        </div>

        {showDescription && (
          <p className="mt-4 line-clamp-2 text-sm text-slate-600">{property?.description}</p>
        )}
      </div>
      </Link>

      <div className='border-t border-slate-900/10 p-4 pt-3'>
        <Button variant='secondary' className='w-full rounded-full' onClick={handleInquireClick} aria-label={t('listing.card.inquire') + (property?.title ? ` ${property.title}` : '')}>
          {t('listing.card.inquire')}
        </Button>
      </div>
    </div>
  )
}

export default React.memo(ListingCard)
