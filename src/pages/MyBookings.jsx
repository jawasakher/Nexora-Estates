import React,{useState,useEffect} from 'react'
import { useAppContext } from '../context/AppContext'
import {assets} from '../assets/data'

const MyBookings = () => {
  const {bookings, setBookings} = useState([])
  const {currency, user} = useAppContext();

  const getUserBookings = () => {
   setBookings(dummyBookingsData) 
  }
  useEffect (() =>{
    if(user){
      getUserBookings()
    }
  }, [user])
  return (
    <div className='bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28'>
      {bookings?.map((booking) =>(
        <div key={booking._id} className=''>
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
        <div>
          <div className="flex items-center gap-x-2">
             <h5 className='medium-14'>Booking ID:</h5>
             <p className="text-gray-400 text-xs ">
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
              <button className="btn-secondary !py-1 !text-xs rounded-sm">Pay Now</button>
            )}
            </div>
        </div>
        </div>
      ))}
    </div>
    
  );
};

export default MyBookings;

