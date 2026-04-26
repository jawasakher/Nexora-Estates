import React from 'react'
import { assets ,cities} from '../assets/data'

const Hero = () => {
  return (
    <section className="h-screen w-screen bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat ">
      <div className='max-padd-container h-screen w-screen'>
        {/** overlay */}
        <div className="absolute inset-0 bg-black/10 z-0"/>
        {/** container  */}
        <div className='relative flex justify-end mx-auto
        flex-col gap-4 h-full py-6 sm:pt-18 z-10'>
          {/** content  */}
          <div className='flex flex-col mt-12 text-white'>
            <button className='max-w-80 flex items-center space-x-3 border border-white medium-13 rounded-full px-4 pr-0.5 py-1 cursor-pointer '>
              <span>Simplify the way you stay Transform the way you live</span>

                <span className='flexCenter size-6 p-1 rounded-full bg-white'>
                  <img  src={assets.right} alt="rightIcon" width={20}/>
                </span>

               </button>
               <h2 className='h2 capitalize leading-tight mt-3 my-2 text-white'>Transform <span className='bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent'> exceptional properties </span>
               Located in stunning surroundings.</h2>
          </div>
          {/**search/booking form */}
          <form className='bg-white/95 backdrop-blur-md text-gray-600 rounded-2xl px-5 py-5 sm:px-6 flex flex-col lg:flex-row gap-4 lg:gap-x-6 max-w-md lg:max-w-full ring-1 ring-white/60 shadow-2xl shadow-black/15 relative overflow-hidden'>
          <span className='absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-secondary via-tertiary to-secondary/70'/>
          <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
             <img src={assets.pin} alt="pinIcon" width={20}/>
             <label htmlFor="destinationInput" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>
               Destination
             </label>
            </div>
            <input
            list='destinations'
            id='destinationInput'
            type="text"
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            placeholder='Type here...'
            required

            />
            <datalist id='destinations'>
              {cities.map((city, index) => (
                <option  value={city} key={index}/>
              ))}

            </datalist>
          </div>
           <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
            <img src={assets.calendar} alt="calendarIcon" width={20}/>
            <label htmlFor="checkIn" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>Check in</label>
            </div>
            <input type="date" id='checkIn'
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            />
           </div>
            <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
            <img src={assets.calendar} alt="calendarIcon" width={20}/>
            <label htmlFor="checkOut" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>Check out</label>
            </div>
            <input type="date" id='checkOut'
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            />
            </div>
             <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
            <img src={assets.user} alt="userIcon" width={20}/>
            <label htmlFor="guests" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>Guests</label>
            </div>
            <input id='guests' type='number' min={1} max={5} 
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            placeholder='0'
            />
            </div>
            <button type='submit' className='group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary to-tertiary py-3.5 px-7 text-black my-auto cursor-pointer max-md:w-full ring-1 ring-slate-900/10 shadow-lg shadow-secondary/35 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/45 transition-all'>
              <img src={assets.search} alt="searchIcon" width={18} className='transition-transform group-hover:rotate-6'/>
              <span className='font-semibold tracking-wide'>Search Deals</span>
              </button>
          </form>
      </div>
     </div>
    </section>

  )
}

export default Hero
