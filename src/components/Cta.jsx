import React from 'react'
import {assets} from '../assets/data'

const Cta = () => {
  return (
   <section className='bg-[#fffbee] pt-16 xl:pt-22'>
    <div className='max-padd-container mx-2 md:mx-auto p-px'>
    <div className='flex flex-col items-center justify-center rounded-[15px] py-12 text-center md:py-16'>  
        <div className='flex center gap-1 rounded-full bg-black/80 px-3 py-1.5 text-xs text-white ring-1 ring-slate-900/10'>
            <img src={assets.rocket} alt='' width={17} className='invert' />
            <span>Trusted by Experts</span>
        </div>
        <h2 className='h2 mt-2 max-w-3xl'>
            Sell or Rent Faster With <span className='text-secondary'>Expert Guidance</span><br /> and Proven Results!
        </h2>
        <p className='mt-6 max-w-lg text-slate-500 max-md:text-sm'>
          Achieve your goals faster with personalized strategies, hands-on support, and results that speak for themselves.
        </p>
        <button type='button' 
        className='btn-secondary mt-4'> 
            Get Started
        </button>
    </div>
    </div>
</section>
      
  
  )
}

export default Cta
