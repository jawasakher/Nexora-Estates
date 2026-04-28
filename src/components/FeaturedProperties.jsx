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
    <section className="max-padd-container py-16 xl:py22 ">
     
       <span className='meidum-18'>Your New Home Awaits!</span>
       <h2 className="h2">Discover Your Dream Property</h2>
       <div className="flexBetween mt-8 mb-6 ">
        <h5>
          <span className="font-bold"> Displaying 1-9</span>from 3k listings
          </h5>
        <Link to={'/listing'} onClick={() => scrollTo(0,0)} className="bg-secondary/10 ring-1 ring-slate-900/15 text-white text-2xl rounded-md p-2 flexCenter ">
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
        {properties.slice(0,6).map((property) =>(
         
         <SwiperSlide key={property.title}>

          <Item  property={property}/>
         </SwiperSlide>
        ))}
        </Swiper>
      
    </section>
  );
};

export default FeaturedProperties;

