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
                <p>
                  <img src={assets.pin} alt="" width={13}/>
                  {booking.property.address}
                </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyBookings

