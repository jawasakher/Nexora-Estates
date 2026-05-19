import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { assets, dummyBookingsData } from '../assets/data'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import BookingSkeleton from '../components/skeletons/BookingSkeleton'

const MyBookings = () => {
  const { currency } = useAppContext()

  const bookings = dummyBookingsData
  const loadingBookings = !bookings
  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <div className='max-padd-container'>
        <div className='mb-8 flex items-center justify-between gap-4 flex-wrap'>
          <div>
            <h2 className='h2'>My Bookings</h2>
            <p className='text-gray-500'>View your saved reservations and payment status.</p>
          </div>
          <Link to='/listing' className='btn-secondary'>Browse listings</Link>
        </div>

        {loadingBookings ? (
          <BookingSkeleton count={3} />
        ) : bookings.length === 0 ? (
          <EmptyState
            title='No bookings yet'
            description='Your reservations will appear here once you complete a booking.'
            action={
              <Link to='/listing'>
                <Button variant='primary'>Browse listings</Button>
              </Link>
            }
          />
        ) : null}

        {bookings?.map((booking) => (
        <Card key={booking._id} className='p-4 mb-4'>
          {/** property list */}
          <div className="flexStart gap-3 mb-3">
            <img src={booking?.property?.images?.[0] || ''} alt={booking?.property?.title || 'property img'} loading='lazy' className='h-14 w-26 object-cover rounded-lg'/>
            <div>
              <h5 className="h5 capitalize line-clamp-1">
                {booking?.property?.title}
                </h5>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Guests:</h5>
                    <p>{booking?.guests}</p>
                    </div>
                     
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Total:</h5>
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
             <h5 className='medium-14'>Booking ID:</h5>
             <p className="text-gray-400 text-xs break-all ">
               {booking._id}</p>
          </div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>Check-In:</h5>
             <p className="text-gray-400 text-xs ">
               {new Date(booking?.checkInDate).toDateString()}</p>
          </div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>Check-Out:</h5>
             <p className="text-gray-400 text-xs ">
               {new Date(booking?.checkOutDate).toDateString()}</p>
          </div>
          </div>
          <div className="flex gap-2 gap-x-3">
            <div className="flex items-center gap-x-2">
            <h5 className="medium-14">Payment:</h5>
            <div className='flex items-center gap-x-1'>
            <Badge variant={booking?.isPaid ? 'success' : 'warning'} className='px-2.5 py-1'>
              {booking?.isPaid ? 'Paid' : 'Unpaid'}
            </Badge>
            </div>
            </div>
            {!booking.isPaid && (
              <Button variant='secondary' size='sm' className="rounded-full">
                Pay Now
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

