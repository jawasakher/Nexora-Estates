import React from 'react'
import {Link} from 'react-router-dom'
import {assets} from '../assets/data'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import {useAppContext} from "../context/AppContext.jsx";
import ListingCard from "./property/ListingCard";
import ListingSkeleton from './skeletons/ListingSkeleton';
import { useI18n } from '../i18n/I18nContext.jsx'

const FeaturedProperties = () => {

  const {properties, currency, loadingProperties} = useAppContext ()
  const { t } = useI18n()
  return (
    <section className="max-padd-container py-14 sm:py-16 xl:py-22">
     
       <span className='medium-18 block text-secondary'>{t('featured.badge')}</span>
       <h2 className="h2">{t('featured.heading')}</h2>
       <div className="mt-7 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h5 className='text-sm sm:text-base'>
          <span className="font-bold">{t('featured.countText')}</span>
          </h5>
        <Link to={'/listing'} onClick={() => scrollTo(0,0)} className="bg-secondary/10 ring-1 ring-slate-900/15 text-white text-2xl rounded-md p-2 flexCenter self-start sm:self-auto ">
        <img src={assets.sliders} alt={t('featured.filterAlt')} />
        </Link>
       </div>
       {/** container */}
      {loadingProperties ? (
        <ListingSkeleton count={4} />
      ) : (
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

          <ListingCard property={property} currency={currency} />
         </SwiperSlide>
        ))}
        </Swiper>
      )}
      
    </section>
  );
};

export default FeaturedProperties;

