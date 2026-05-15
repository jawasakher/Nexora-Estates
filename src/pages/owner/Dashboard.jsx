import React, { useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/data.js'
const Dashboard = () => {
  const [dashboardData] = useState(dummyDashboardData)

  return (
    <div className="">
      <div>
        <div>
          <img src={assets.house} alt="" className='hidden sm:flex w-8'/>
          <div>
            <h4 className='h4'>{dashboardData.totalBookings.toString().padStart(2, "0")}</h4>
            <h5 className='h5 text-secondary'>Total Sales</h5>
          </div>
        </div>
        <div>
          <img src={assets.dollar} alt=""
          className='hidden sm:flex w-8'/>
          <div>
            <h4 className='h4'>{dashboardData.totalRevenue}</h4>
            <h5 className='h5 text-secondary'>Total Revenue</h5>
          </div>
        </div>
      </div>
      {/** latest Booking/sates */}
      <div>
        <div>
          <h5 className="h5">Index</h5>
           <h5 className="h5">Property</h5>
            <h5 className="h5">Booking dates</h5>
             <h5 className="h5">Amount</h5>
              <h5 className="h5">Status</h5>
          </div>
          <div>
            {dashboardData.bookings?.map((booking, index) => (
              <div key={index} className='flex items-center gap-4'>
                <div>{index + 1}</div>
                <div>
                  <div>
                    <img
                      src={booking?.property?.images?.[0]}
                      alt={booking?.property?.title || 'Property'}
                      className="w-16 rounded-lg"
                    />
                  </div>
                  <div className='line-clamp-2'>{booking?.property?.title}</div>
                  <div>
                    {new Date(booking.checkInDate).toDateString()} to {new Date(booking.checkOutDate).toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
};

export default Dashboard;
