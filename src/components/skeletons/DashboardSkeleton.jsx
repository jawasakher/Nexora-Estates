import React from 'react'
import Skeleton from '../ui/Skeleton'

const DashboardSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <Skeleton className='h-28 rounded-2xl' />
        <Skeleton className='h-28 rounded-2xl' />
      </div>

      <div className='rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm'>
        <Skeleton className='mb-4 h-6 w-40' />
        <div className='space-y-3'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='grid grid-cols-5 gap-3'>
              <Skeleton className='h-10 rounded-lg' />
              <Skeleton className='h-10 rounded-lg' />
              <Skeleton className='h-10 rounded-lg' />
              <Skeleton className='h-10 rounded-lg' />
              <Skeleton className='h-10 rounded-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton
