import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/data'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import BookingSkeleton from '../components/skeletons/BookingSkeleton'
import Seo from '../components/Seo'
import { getBookings } from '../services/bookings.js'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext.jsx'

const MyBookings = () => {
  const { t, language } = useI18n()
  const { currency, getToken, authStatus } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)

  useEffect(() => {
    let isMounted = true

    if (authStatus === 'loading') {
      return () => {
        isMounted = false
      }
    }

    getBookings({ getToken })
      .then((result) => {
        if (!isMounted) return
        setBookings(Array.isArray(result?.data) ? result.data : [])
      })
      .catch((error) => {
        console.error('Failed to load bookings', error)
        if (!isMounted) return
        setBookings([])
      })
      .finally(() => {
        if (!isMounted) return
        setLoadingBookings(false)
      })

    return () => {
      isMounted = false
    }
  }, [authStatus, getToken])
  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <Seo
        title={t('bookings.seoTitle')}
        description={t('bookings.seoDescription')}
        canonicalPath='/my-bookings'
        noindex
      />
      <div className='max-padd-container'>
        <div className='mb-8 flex items-center justify-between gap-4 flex-wrap'>
          <div>
            <h2 className='h2'>{t('bookings.heading')}</h2>
            <p className='text-gray-500'>{t('bookings.subtitle')}</p>
          </div>
          <Link to='/listing' className='btn-secondary'>{t('bookings.browseListings')}</Link>
        </div>

        {loadingBookings ? (
          <BookingSkeleton count={3} />
        ) : bookings.length === 0 ? (
          <EmptyState
            title={t('bookings.noBookings')}
            description={t('bookings.noBookingsDescription')}
            action={
              <Link to='/listing'>
                <Button variant='primary'>{t('bookings.browseListings')}</Button>
              </Link>
            }
          />
        ) : null}

        {bookings?.map((booking) => (
        <Card key={booking._id} className='p-4 mb-4'>
          {/** property list */}
          <div className="flexStart gap-3 mb-3">
            <img src={booking?.property?.images?.[0] || ''} alt={booking?.property?.title || t('bookings.propertyImageAlt')} loading='lazy' className='h-14 w-26 object-cover rounded-lg'/>
            <div>
              <h5 className="h5 capitalize line-clamp-1">
                {booking?.property?.title}
                </h5>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">{t('bookings.guestsLabel')}</h5>
                    <p>{booking?.guests}</p>
                    </div>
                     
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">{t('bookings.totalLabel')}</h5>
                    <p className='text-gray-400 text-sm'>
                      {currency} {booking?.totalPrice?.toFixed?.(2) ?? booking?.totalPrice ?? '-'}</p>
                    </div>
                </div>
                <p className="flex place-items-baseline gap-1 mt-0.5">
                  <img src={assets.pin} alt="" width={13}/>
                  {booking?.property?.address}
                </p>
            </div>
          </div>
          {/** Booking Summary */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-2 gap-x-4 flex-wrap">
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>{t('bookings.bookingId')}</h5>
             <p className="text-gray-400 text-xs break-all ">
               {booking._id}</p>
          </div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>{t('bookings.checkIn')}</h5>
             <p className="text-gray-400 text-xs ">
               {new Date(booking?.checkInDate).toLocaleDateString(language)}</p>
          </div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>{t('bookings.checkOut')}</h5>
             <p className="text-gray-400 text-xs ">
               {new Date(booking?.checkOutDate).toLocaleDateString(language)}</p>
          </div>
          </div>
          <div className="flex gap-2 gap-x-3">
            <div className="flex items-center gap-x-2">
            <h5 className="medium-14">{t('bookings.payment')}</h5>
            <div className='flex items-center gap-x-1'>
            <Badge variant={booking?.isPaid ? 'success' : 'warning'} className='px-2.5 py-1'>
              {booking?.isPaid ? t('bookings.paid') : t('bookings.unpaid')}
            </Badge>
            </div>
            </div>
            {!booking.isPaid && (
              <Button variant='secondary' size='sm' className="rounded-full">
                {t('bookings.payNow')}
              </Button>
            )}
            </div>
        </div>
        </Card>
      ))}
      </div>
    </div>
    
  );
};

export default MyBookings;

