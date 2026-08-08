import React from 'react'
import Skeleton from '../ui/Skeleton'

const ListingSkeleton = ({ count = 6 }) => {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-sm'>
          <Skeleton className='h-52 w-full rounded-none' />
          <div className='p-4 space-y-4'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
              </div>
              <Skeleton className='h-10 w-20 rounded-full' />
            </div>
            <div className='flex flex-wrap gap-2'>
              <Skeleton className='h-8 w-20 rounded-full' />
              <Skeleton className='h-8 w-20 rounded-full' />
              <Skeleton className='h-8 w-20 rounded-full' />
            </div>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListingSkeleton
