import React from 'react'
import {Link} from 'react-router-dom'
import {assets} from '../assets/data'
import Title from './Title'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay } from 'swiper/modules';
const FeaturedProperties = () => {
  return (
    <section>
      <div>
       <span className='meidum-18'>Your New Home Awaits!</span>
       <h2>Discover Your Dream Property</h2>
       <div>
        <h5><span> Displaying 1-9</span>from 3k listings</h5>
        <Link to={'/listing'} onClick={() => scrollTo(0,0)}>
        <img src={assets.sliders} alt="" />
        </Link>
       </div>
       {/** container */}
          <Swiper
        
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
       breakpoints={{
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1124: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1300: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }} 
        modules={[Autoplay]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-s"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
       
      </Swiper>
      </div>
    </section>
  )
}

export default FeaturedProperties

