import React from 'react'
import { assets } from '../assets/data'

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat ">
      <div className='max-padd-container h-screen w-screen'>
        {/** overlay */}
        <div className="absolute inset-0 bg-black/10 z-0"/>
        {/** container  */}
        <div className='relative flex justify-end mx-auto
        flex-col gap-4h-full py-6 sm:pt-18 z-10'>
          {/** content  */}
          <div className='flex flex-col mt-12 text-white'>
            <button className='max-w-80 flex items-center space-x-3 border border-white medium-13 rounded-full px-4 pr-0.5 py-1 cursor-pointer '>
              <span>Simplify the way you stay Transform the way you live</span>

                <span className='flexCenter size-6 p-1 rounded-full bg-white'>
                  <img  src={assets.right} alt="rightIcon" width={20}/>
                </span>

               </button>
               <h2 className='h2 capitalize'>Transform <span className='bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent'> exceptional properties </span>
               Located in stunning surroundings.</h2>
          </div>
          {/**search/booking form */}
          <from className='bg-white text-gray-500 rounded-lg px-6 py-4 flex-col lg:flex-row gap-4 lg:gap-x-8 max-w-md lg:max-w-full ring-1 ring-slate-900/5 relative'>
          <div className='flex flex-col w-full'>
            <div className='flx items-center gap-2'>
             <img src={assets.pin} alt="pinIcon" width={20}/>
             <label htmlFor="destinationInput">
               Destination
             </label>
            </div>
            <input
            list='destinations'
            id='destinationInput'
            type="text"
            className='rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none'
            placeholder='Type here...'
            reguired

            />
            <datalist id='destinations'>
              {cities.map((city, index) => (
                <option  value={city} key={index}/>
              ))}

            </datalist>
          </div>
           <div>
            <div>
            <img src={assets.calendar} alt="calendarIcon" width={20}/>
            </div>
           </div>
        
          </from>
      </div>
     </div>
    </section>

  )
}

export default Hero
