import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import FeaturedProperties from '../components/FeaturedProperties'
import Faq from '../components/Faq'
import Cta from '../components/Cta'
import Testimonial from '../components/Testimonial'
import Team from '../components/Team'
const Home = () => {
  return (
    <div className="bg-linear-to-r from-[#fffbee] to-white">
      <Hero/>
      <About />
      <FeaturedProperties/>
      <Faq />
      <Team />
      <Cta />
      <Testimonial />
     </div>
  )
}

export default Home 

