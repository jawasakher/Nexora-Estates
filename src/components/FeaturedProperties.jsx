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
         slidesPerView={3}
         spaceBetween={30}
         loop={true}
         autoplay={{
           delay: 2500,
           disableOnInteraction: false,
         }}
         pagination={{
           clickable: true,
         }}
         navigation={true}
         modules={[Autoplay, Pagination, Navigation]}
         className="mySwiper"
       >
         <SwiperSlide>
           <img src={assets.property1} alt="" />
         </SwiperSlide>
         <SwiperSlide>
           <img src={assets.property2} alt="" />
         </SwiperSlide>
         <SwiperSlide>
           <img src={assets.property3} alt="" />
         </SwiperSlide>
       </Swiper>
      </div>
    </section>
  )
}

export default FeaturedProperties

