import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { assets, dummyBookingsData } from '../assets/data'

const MyBookings = () => {
  const { currency } = useAppContext()

  const bookings = dummyBookingsData
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

        {bookings.length === 0 ? (
          <div className='rounded-xl bg-secondary/10 ring-1 ring-slate-900/5 p-6 text-gray-600'>
            No bookings yet.
          </div>
        ) : null}

        {bookings?.map((booking) => (
        <div key={booking._id} className='rounded-xl bg-white ring-1 ring-slate-900/5 p-4 mb-4'>
          {/** property list */}
          <div className="flexStart gap-3 mb-3">
            <img src={booking.property.images[0]} alt="property img" className='h-14 w-26 object-cover rounded-lg'/>
            <div>
              <h5 className="h5 capitalize line-clamp-1">
                {booking.property.title}
                </h5>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Guests:</h5>
                    <p>{booking.guests}</p>
                    </div>
                     
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Total:</h5>
                    <p className='text-gray-400 text-sm'>
                      {currency} {booking.totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                <p className="flex place-items-baseline gap-1 mt-0.5">
                  <img src={assets.pin} alt="" width={13}/>
                  {booking.property.address}
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
               {new Date(booking.checkInDate).toDateString()}</p>
          </div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>Check-Out:</h5>
             <p className="text-gray-400 text-xs ">
               {new Date(booking.checkOutDate).toDateString()}</p>
          </div>
          </div>
          <div className="flex gap-2 gap-x-3">
            <div className="flex items-center gap-x-2">
            <h5 className="medium-14">Payment:</h5>
            <div className='flex items-center gap-x-1'>
            <span className={`min-w-2.5 h-2.5 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-yellow-500'}`}/>

            <p>{booking.isPaid ? 'Paid' : 'unpaid'}</p>
            </div>
            </div>
            {!booking.isPaid && (
              <button className="btn-secondary py-1! text-xs! rounded-sm">Pay Now</button>
            )}
            </div>
        </div>
        </div>
      ))}
      </div>
    </div>
    
  );
};

export default MyBookings;

