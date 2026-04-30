import React from 'react'
import {assets} from '../assets/data'
const Cta = () => {
  return (
   <section class="bg-[#fffbee] pt-16 xl:pt-22">
    <div class="max-padd-container mx-2 md:mx-auto p-px ">
    <div class="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px]">  
        <div class="flex center bg-black/80 text-white px-3 py-1.5 ring-1 ring-slate-900/10  gap-1 rounded-full text-xs">
            <img src={assets.rocket} alt="" width={17} className="invert" />
            <span class="">Trusted by Experts</span>
        </div>
        <h2 class="h2 mt-2">
            Sell or Rent Faster With<span className='text-seconder'> Expert Guidance</span><br /> and Proven Results! <br />
        </h2>
        <p class="text-slate-500 mt-2 max-w-lg max-md:text-sm">
          Achieve your goals faster with personalized strategies, hands-on support, and results that speak for themselves.</p>
        <button type="button" 
        className="btn-secondary mt-4"> 
            Get Started
        </button>
    </div>
    </div>
</section>
      
  
  )
}

export default Cta
