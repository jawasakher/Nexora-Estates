import React from 'react'
import {assets} from '../assets/data'
const Faq = () => {
  return (
    <section className='max-padd-container py-16 xl:py-22'>
      {/** Contatner */}
      <div className='flex flex-col gap-y-12 xl:flex-row'>
        {/** Image - Left Side */}
        <div className="flex-1">
          <div className="relative rounded-3xl overflow-hidden inline-block">
            <img src={assets.faq}alt="faqImg" className=' block w-full '/>
            <div className='absolute top-5 left-5 right-5 bg-white p-3 rounded-2xl flex items-center gap-4 z-10'>
              <img src={assets.signature} alt="signImg" width={55}/>
              <div>
                <h5>Trusted Real Estate Experts</h5>
                <p>With over 20 years of experience, our team of professionals is dedicated to helping you find your dream property.</p>
              </div>
              </div>
            </div>
        </div>
        {/** FAQs - Right Side  */}
        <div className="flex-1">
          
        </div>
      </div>
    </section>
      
    
  )
}

export default Faq
