import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/data'

const About = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28 pt-36">
      {/** container */}
      <div className="flex items-center flex-col lg:flex-row gap-12">
      {/** Info -Lefts Side*/}
        <div className="flex-1">
          <Title 
          title1={"Your Trusted Real Estate Partner"}
           title2={"Helping You Find Your Dream Home"}
           para={"Trust, clarity, and expertise are the pillars of our real estate services. We are dedicated to providing you with a seamless and transparent experience, ensuring that you have all the information you need to make informed decisions. Our team of experienced professionals is committed to guiding you through every step of the real estate journey, from finding the perfect property to closing the deal. With us, you can expect honesty, integrity, and a personalized approach that puts your needs first."}
           titleStyle={"mb-10"}
          />
          <div className='flex flex-col gap-6 mt-5'>
            <div className='flex  gap-3'>
              <img src={assets.calendarSecondary} alt="" width={20}/>
              <p>In-app scheduling for property viewings</p>
              </div>
             
            <div className='flex  gap-3'>
              <img src={assets.graph} alt="" width={20}/>
              <p>Comprehensive market analysis and insights</p>
              </div>
              
            <div className='flex  gap-3'>
              <img src={assets.map} alt="" width={20}/>
              <p>User-friendly interface for easy navigation</p>
              </div>
             
            <div className='flex  gap-3'>
              <img src={assets.pound} alt="" width={20}/>
              <p>Access to exclusive property listings</p>
              </div>
          </div>

          <div className='mt-10 inline-flex max-w-full flex-col items-start gap-3 rounded-2xl border border-secondary/30 bg-primary px-4 py-4 shadow-md shadow-secondary/10 sm:flex-row sm:items-center sm:gap-4 sm:px-5'>
            <div className='flex -space-x-3'>
              <img src={assets.user1} alt="Happy client" className='size-10 rounded-full object-cover ring-2 ring-white'/>
              <img src={assets.user2} alt="Happy client" className='size-10 rounded-full object-cover ring-2 ring-white'/>
              <img src={assets.user3} alt="Happy client" className='size-10 rounded-full object-cover ring-2 ring-white'/>
              <img src={assets.user4} alt="Happy client" className='size-10 rounded-full object-cover ring-2 ring-white'/>
            </div>

            <div className='hidden h-10 w-px bg-slate-200 sm:block'/>

            <div className='space-y-1'>
              
              <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
                <img src={assets.star} alt="starIcon" width={17}/>
                 <img src={assets.star} alt="starIcon" width={17}/>
                  <img src={assets.star} alt="starIcon" width={17}/>
                   <img src={assets.star} alt="starIcon" width={17}/>
                    <img src={assets.star} alt="starIcon" width={17}/>
                    <p className="ml-1 whitespace-nowrap text-sm font-medium text-gray-600 sm:ml-2 sm:text-base">5.0</p>
              </div>
                <p className='flex flex-wrap items-center gap-x-1 text-[12px] text-slate-600'>
                 Trusted by
                 <span className="font-medium text-gray-800">100,000+</span>
                 users
                 </p>
              </div>
            </div>
          </div>
          {/** Image -right Side */}
          <div className="flex-1">
            <div className="relative flex justify-end">
              <img  src={assets.about} alt="aboutImg" className="rounded-3xl" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
