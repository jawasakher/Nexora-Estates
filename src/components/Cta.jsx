import React, { useState } from 'react'
import {assets} from '../assets/data'
import Button from './ui/Button'
import Card from './ui/Card'
import { useAppContext } from '../context/AppContext.jsx'
import { LEAD_SOURCES } from '../constants/leadSources.js'
import { trackEvent } from '../services/analytics.js'

const Cta = () => {
  const { navigate } = useAppContext()

  return (
    <>
      <section className='bg-linear-to-b from-white to-slate-50 pt-16 xl:pt-22'>
        <div className='max-padd-container mx-2 md:mx-auto p-px'>
          <Card className='flex flex-col items-center justify-center bg-linear-to-r from-secondary/10 via-white/50 to-tertiary/10 border-secondary/20 py-12 text-center md:py-16'>  
            <div className='flex center gap-1 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary border border-secondary/20'>
              <img src={assets.rocket} alt='' width={17} />
              <span>Trusted by Experts</span>
            </div>
            <h2 className='h2 mt-4 max-w-3xl'>
              Sell or Rent Faster With <span className='bg-linear-to-r from-secondary to-tertiary bg-clip-text text-transparent'>Expert Guidance</span><br /> and Proven Results!
            </h2>
            <p className='mt-6 max-w-lg text-slate-600 max-md:text-sm'>
              Achieve your goals faster with personalized strategies, hands-on support, and results that speak for themselves.
            </p>
            <Button 
              onClick={() => {
                trackEvent('cta_clicked', {
                  source: LEAD_SOURCES.HOME_CTA,
                  label: 'Get Started',
                  placement: 'home_cta',
                })
                navigate(`/contact?source=${LEAD_SOURCES.HOME_CTA}&title=Home%20CTA%20inquiry`)
              }}
              className='mt-6 rounded-full'
              variant='primary'
              size='lg'
            > 
              Get Started
            </Button>
          </Card>
        </div>
      </section>
    </>
  )
}

export default Cta
