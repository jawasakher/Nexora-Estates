import React, { useMemo } from 'react'
import { assets } from '../../assets/data.js'
import StatCard from '../../components/ui/StatCard.jsx'
import DashboardSection from '../../components/ui/DashboardSection.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import DashboardSkeleton from '../../components/skeletons/DashboardSkeleton.jsx'
import { useOwnerProperties } from '../../hooks/useOwnerProperties.js'

const Dashboard = () => {
  const { data: ownerProperties = [], isLoading: loadingDashboard } = useOwnerProperties()

  const currency = import.meta.env.VITE_CURRENCY ?? '$'

  const dashboardData = useMemo(() => {
    const totalListings = ownerProperties.length
    const totalRevenue = ownerProperties.reduce((sum, property) => sum + (Number(property?.price?.sale) || 0), 0)
    const bookings = ownerProperties.slice(0, 3).map((property, index) => ({
      _id: property._id,
      property,
      checkInDate: property.createdAt || new Date().toISOString(),
      checkOutDate: property.updatedAt || new Date().toISOString(),
      totalPrice: Number(property?.price?.sale) || 0,
      status: property.isAvailable ? 'available' : 'hidden',
      isPaid: property.isAvailable,
      paymentMethod: 'Owner inventory',
      guests: index + 1,
    }))

    return {
      totalBookings: totalListings,
      totalRevenue,
      bookings,
    }
  }, [ownerProperties])

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12">
      {loadingDashboard ? (
        <DashboardSkeleton />
      ) : (
      <>

      {/* Top Cards */}
      <div className='grid grid-cols-2 gap-4'>
        <StatCard
          icon={assets.house}
          value={dashboardData.totalBookings.toString().padStart(2, '0')}
          label='Total Sales'
          className='bg-[#fff4d2]'
        />

        <StatCard
          icon={assets.dollar}
          value={`${currency}${dashboardData.totalRevenue}`}
          label='Total Revenue'
          className='bg-[#d1e8ff]'
        />

      </div>

      {/* Latest Bookings */}
      <div className="mt-4">
        <DashboardSection title='Latest Bookings' description='Recent reservation activity and payment status.'>
          {dashboardData.bookings?.length ? (
            <div>
              <div className="flex justify-between flex-wrap gap-2 sm:grid sm:grid-cols-[2fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-secondary border-b border-slate-900/15 rounded-t-xl">
                <h5 className="h5 hidden lg:block">Index</h5>
                <h5 className="h5">Property</h5>
                <h5 className="h5">Booking Dates</h5>
                <h5 className="h5">Amount</h5>
                <h5 className="h5">Status</h5>
              </div>

              {dashboardData.bookings?.map((booking, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center flex-wrap gap-2 sm:grid sm:grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-secondary/5 text-gray-700 medium-14 border-b border-slate-900/15'
                >
                  <div className="hidden lg:block">
                    {index + 1}
                  </div>
                  <div className='flexStart gap-x-2 max-w-64'>
                    <div className='overflow-hidden rounded-lg'>
                      <img
                        src={booking?.property?.images?.[0] || ''}
                        alt={booking?.property?.title || 'Property'}
                        loading='lazy'
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className='line-clamp-2'>
                        {booking?.property?.title}
                      </div>
                    </div>
                  </div>

                  <div>
                    {new Date(booking.checkInDate).toDateString()} 
                    to 
                    {new Date(booking.checkOutDate).toDateString()}
                  </div>

                  <div>
                    {currency}{booking.totalPrice}
                  </div>

                  <button className={`${booking.isPaid ? 'bg-green-400/80 text-white' : 'bg-secondary/10 text-red-500'} w-22 py-0.5 rounded-full text-xs border-green-500/30`}>
                    {booking.status}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-6'>
              <EmptyState title='No owner activity yet' description='Latest inventory-linked activity will show up here once properties are added.' />
            </div>
          )}
        </DashboardSection>
      </div>

      </>
      )}

    </div>
  )
}

export default Dashboard