import React from 'react'
import {Link} from 'react-router-dom'
import {assets} from '../assets/data'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import {useAppContext} from "../context/AppContext";
import Item from "./Item";

const FeaturedProperties = () => {

  const {properties} = useAppContext ()
  return (
    <section className="max-padd-container py-14 sm:py-16 xl:py-22">
     
       <span className='medium-18 block text-secondary'>Your New Home Awaits!</span>
       <h2 className="h2">Discover Your Dream Property</h2>
       <div className="mt-7 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h5 className='text-sm sm:text-base'>
          <span className="font-bold"> Displaying 1-9</span>from 3k listings
          </h5>
        <Link to={'/listing'} onClick={() => scrollTo(0,0)} className="bg-secondary/10 ring-1 ring-slate-900/15 text-white text-2xl rounded-md p-2 flexCenter self-start sm:self-auto ">
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
        className="mt-2 h-122.5 sm:h-127.5 md:h-133.25 xl:h-105.5"
      >
        {properties.slice(0,6).map((property) =>(
         
         <SwiperSlide key={property._id}> 

          <Item  property={property}/>
         </SwiperSlide>
        ))}
        </Swiper>
      
    </section>
  );
};

export default FeaturedProperties;

