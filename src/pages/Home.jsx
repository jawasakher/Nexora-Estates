import React, { Suspense, lazy } from 'react'
import Hero from '../components/Hero'
import Seo from '../components/Seo'
import Loader from '../components/ui/Loader'
import { assets } from '../assets/data'

const About = lazy(() => import('../components/About'))
const FeaturedProperties = lazy(() => import('../components/FeaturedProperties'))
const Faq = lazy(() => import('../components/Faq'))
const Team = lazy(() => import('../components/Team'))

const Home = () => {
  return (
    <div className="bg-linear-to-r from-[#fffbee] to-white">
      <Seo
        title='Premium Real Estate Listings'
        description='Discover premium homes, villas, and apartments with a refined real estate browsing experience.'
        canonicalPath='/'
        image={assets.about}
      />
      <Hero/>
      <Suspense fallback={<div className='flex min-h-[40vh] items-center justify-center py-20'><Loader /></div>}>
        <About />
        <FeaturedProperties/>
        <Faq />
        <Team />
      </Suspense>
     </div>
  )
}

export default Home 

