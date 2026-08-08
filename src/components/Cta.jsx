import React, { useState } from 'react'
import {assets} from '../assets/data'
import Button from './ui/Button'
import Card from './ui/Card'
import { useAppContext } from '../context/AppContext.jsx'
import { LEAD_SOURCES } from '../constants/leadSources.js'
import { trackEvent } from '../services/analytics.js'
import { useI18n } from '../i18n/I18nContext.jsx'

const Cta = () => {
  const { navigate } = useAppContext()
  const { t } = useI18n()

  return (
    <>
      <section className='bg-linear-to-b from-white to-slate-50 pt-16 xl:pt-22'>
        <div className='max-padd-container mx-2 md:mx-auto p-px'>
          <Card className='flex flex-col items-center justify-center bg-linear-to-r from-secondary/10 via-white/50 to-tertiary/10 border-secondary/20 py-12 text-center md:py-16'>  
            <div className='flex center gap-1 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary border border-secondary/20'>
              <img src={assets.rocket} alt='' width={17} />
              <span>{t('cta.badge')}</span>
            </div>
            <h2 className='h2 mt-4 max-w-3xl'>
              {t('cta.titlePrefix')} <span className='bg-linear-to-r from-secondary to-tertiary bg-clip-text text-transparent'>{t('cta.titleHighlight')}</span>{t('cta.titleSuffix')}
            </h2>
            <p className='mt-6 max-w-lg text-slate-600 max-md:text-sm'>
              {t('cta.description')}
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
              {t('cta.button')}
            </Button>
          </Card>
        </div>
      </section>
    </>
  )
}

export default Cta
