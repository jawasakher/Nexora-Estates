import React from 'react'
import Skeleton from '../ui/Skeleton'

const BookingSkeleton = ({ count = 3 }) => {
  return (
    <div className='space-y-4'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm'>
          <div className='flex gap-3'>
            <Skeleton className='h-14 w-26 rounded-lg' />
            <div className='flex-1 space-y-3'>
              <Skeleton className='h-5 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-4 w-2/3' />
            </div>
          </div>
          <div className='mt-4 flex flex-wrap gap-3'>
            <Skeleton className='h-8 w-32 rounded-full' />
            <Skeleton className='h-8 w-24 rounded-full' />
            <Skeleton className='h-8 w-20 rounded-full' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingSkeleton
