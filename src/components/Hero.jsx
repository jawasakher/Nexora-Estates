import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets ,cities} from '../assets/data'

const Hero = () => {
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });
  const navigate = useNavigate();

  const handleExploreClick = () => {
    setShowExploreModal(true);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'destinationInput' ? 'destination' : id]: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (formData.destination) query.set('q', formData.destination);
    if (formData.destination) query.set('city', formData.destination);
    if (formData.checkIn) query.set('checkIn', formData.checkIn);
    if (formData.checkOut) query.set('checkOut', formData.checkOut);
    if (formData.guests) query.set('guests', String(formData.guests));
    navigate(`/listing?${query.toString()}`);
    setShowExploreModal(false);
  };

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className='max-padd-container relative min-h-svh w-full'>
        {/** overlay */}
        <div className="absolute inset-0 bg-black/10 z-0"/>
        {/** container  */}
        <div className='relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-end gap-5 pb-10 pt-24 sm:pt-18 lg:pb-14'>
          {/** content  */}
          <div className='flex max-w-3xl flex-col items-start text-left text-white'>
            <button 
              onClick={handleExploreClick}
              className='flex max-w-full items-center gap-3 rounded-full border border-white px-4 py-1 text-[12px] font-medium transition-all duration-300 hover:bg-white/10 sm:max-w-88 sm:text-[13px]'>
              <span>Simplify the way you stay Transform the way you live</span>

                <span className='flexCenter size-6 p-1 rounded-full bg-white'>
                  <img  src={assets.right} alt="rightIcon" width={20}/>
                </span>

               </button>
              <h2 className='h2 max-w-4xl capitalize leading-[1.1] mt-3 my-2 text-white sm:leading-tight'>Transform <span className='bg-linear-to-r from-secondary to-white bg-clip-text text-transparent'> exceptional properties </span>
               Located in stunning surroundings.</h2>
          </div>
          {/**search/booking form */}
            <form className='relative grid w-full max-w-5xl gap-4 rounded-3xl bg-white/95 px-4 py-4 text-gray-600 ring-1 ring-white/60 shadow-2xl shadow-black/15 backdrop-blur-md sm:px-6 md:grid-cols-2 xl:grid-cols-5'>
          <span className='absolute left-0 top-0 h-1.5 w-full bg-linear-to-r from-secondary via-tertiary to-secondary/70'/>
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
            value={formData.destination}
            onChange={handleFormChange}
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
            value={formData.checkIn}
            onChange={handleFormChange}
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            />
           </div>
            <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
            <img src={assets.calendar} alt="calendarIcon" width={20}/>
            <label htmlFor="checkOut" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>Check out</label>
            </div>
            <input type="date" id='checkOut'
            value={formData.checkOut}
            onChange={handleFormChange}
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            />
            </div>
             <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
            <img src={assets.user} alt="userIcon" width={20}/>
            <label htmlFor="guests" className='text-[12px] font-semibold uppercase tracking-[0.08em] text-gray-500'>Guests</label>
            </div>
            <input id='guests' type='number' min={1} max={5} 
            value={formData.guests}
            onChange={handleFormChange}
            className='rounded-xl border border-slate-200/90 bg-white px-3 py-2 mt-1.5 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
            placeholder='0'
            />
            </div>
            <button type='submit' className='group flex h-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-secondary to-tertiary px-6 py-3.5 text-black cursor-pointer max-md:w-full ring-1 ring-slate-900/10 shadow-lg shadow-secondary/35 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/45 transition-all xl:self-end'>
              <img src={assets.search} alt="searchIcon" width={18} className='transition-transform group-hover:rotate-6'/>
              <span className='font-semibold tracking-wide'>Search Deals</span>
              </button>
          </form>
      </div>
     </div>

     {/* Explore Modal */}
     {showExploreModal && (
       <div 
         className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
         onClick={() => setShowExploreModal(false)}
       >
         <div 
           className='bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8'
           onClick={(e) => e.stopPropagation()}
         >
           {/* Close Button */}
           <div className='flex items-center justify-between mb-6'>
             <h2 className='text-3xl font-bold text-slate-950'>Explore Properties</h2>
             <button
               onClick={() => setShowExploreModal(false)}
               className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-slate-100 transition-all'
             >
               <img src={assets.close} alt='close' className='h-5 w-5' />
             </button>
           </div>

           <p className='text-slate-600 mb-6'>
             Find your perfect property by specifying your preferences below.
           </p>

           {/* Explore Form */}
           <form onSubmit={handleSearchSubmit} className='space-y-5'>
             {/* Destination */}
             <div>
               <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                 <img src={assets.pin} alt='pin' width={16} />
                 Destination
               </label>
               <input
                 list='destinations'
                 id='destinationInput'
                 type='text'
                 value={formData.destination}
                 onChange={handleFormChange}
                 className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                 placeholder='Enter city name...'
                 required
               />
               <datalist id='destinations'>
                 {cities.map((city, index) => (
                   <option value={city} key={index} />
                 ))}
               </datalist>
             </div>

             {/* Check-in Date */}
             <div>
               <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                 <img src={assets.calendar} alt='calendar' width={16} />
                 Check-in Date
               </label>
               <input
                 type='date'
                 id='checkIn'
                 value={formData.checkIn}
                 onChange={handleFormChange}
                 className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                 required
               />
             </div>

             {/* Check-out Date */}
             <div>
               <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                 <img src={assets.calendar} alt='calendar' width={16} />
                 Check-out Date
               </label>
               <input
                 type='date'
                 id='checkOut'
                 value={formData.checkOut}
                 onChange={handleFormChange}
                 className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                 required
               />
             </div>

             {/* Number of Guests */}
             <div>
               <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                 <img src={assets.user} alt='user' width={16} />
                 Number of Guests
               </label>
               <input
                 type='number'
                 id='guests'
                 value={formData.guests}
                 onChange={handleFormChange}
                 min={1}
                 max={5}
                 className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                 placeholder='0'
                 required
               />
             </div>

             {/* Action Buttons */}
             <div className='flex gap-3 pt-4'>
               <button
                 type='button'
                 onClick={() => setShowExploreModal(false)}
                 className='flex-1 rounded-lg border border-slate-200 py-3 px-6 font-semibold text-slate-700 transition-all hover:bg-slate-100'
               >
                 Cancel
               </button>
               <button
                 type='submit'
                 className='flex-1 rounded-lg bg-linear-to-r from-secondary to-tertiary py-3 px-6 font-semibold text-white transition-all hover:shadow-lg shadow-secondary/30'
               >
                 Search Properties
               </button>
             </div>
           </form>
         </div>
       </div>
     )}
    </section>

  )
}

export default Hero
