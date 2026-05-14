import React,{useEffect, useState} from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import { assets, dummyAgencyData } from '../../assets/data.js';
const Dashboard = () => {
  const {user,currency} = useAppContext();
  const [dashboarDate, setDashboarData] = useState({
    booking:[],
    totalBookings:0,
    totalRevenue:0,
  })
  const getDashboardData =  async() => {
    setDashboarData(dummyAgencyData)
  }
  useEffect(() => {
    getDashboardData();
  },[user])

  return (
    <div className="">
      <div>
        <div>
          <img src={assets.house} alt="" className='hidden sm:flex w-8'/>
          <div>
            <h4 className='h4'>{dashboarDate.totalBookings.toString().padStart(2,"0")}</h4>
            <h5 className='h5 text-secondary'>Total Sales</h5>
          </div>
        </div>
        <div>
          <img src={assets.dollar} alt=""
          className='hidden sm:flex w-8'/>
          <div>
            <h4 className='h4'>{dashboarDate.totalRevenue}</h4>
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
            {dashboarDate.bookings.map((booking,index) => (
              <div key={index} className='flex items-center gap-4'>
                <div>{index + 1}</div>
                <div>
                  <div>
                    <img src={booking.property.images[0]} alt={booking.property.title} className="w-16 rounded-lg"/>
                   </div>
                   <div className='line-clamp-2'>{booking.property.title}</div>
                   </div>
                  </div>
                  ))}
          </div>
        </div>

    </div>
  );
};

export default Dashboard;
