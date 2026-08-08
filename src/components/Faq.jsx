import React, { useState } from 'react'
import {assets} from '../assets/data'
import Title from '../components/Title'
import { useI18n } from '../i18n/I18nContext.jsx'

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const { t } = useI18n()

  const faqsData = [
    {
      question: t('faq.questions.booking'),
      answer: t('faq.answers.booking')
    },
    {
      question: t('faq.questions.homes'),
      answer: t('faq.answers.homes')
    },
    {
      question: t('faq.questions.location'),
      answer: t('faq.answers.location')
    },
    {
      question: t('faq.questions.data'),
      answer: t('faq.answers.data')
    },
    {
      question: t('faq.questions.support'),
      answer: t('faq.answers.support')
    },
  ];

  

  return (
    <section className='max-padd-container py-16 xl:py-22'>
      {/** container */}
      <div className='flex flex-col gap-y-12 xl:flex-row'>
        {/** Image -Left Side  */}
        <div className='flex-1'>
          <div className='relative rounded-3xl overflow-hidden inline-block'>
            <img src={assets.faq} alt={t('faq.imageAlt')} className='block w-full'/>
            <div className='absolute top-5 left-5 right-5 bg-white p-3 rounded-2xl flex items-center gap-4 z-10'>
              <img src={assets.signature} alt={t('faq.signatureAlt')} width={55}/>
              <div>
                <h5 className='bold-16'>{t('faq.introTitle')}</h5>
                <p>{t('faq.introDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      {/**FAQs - Right Side */}
        <div className='flex-1 flex flex-col justify-center'>
          <Title
            title1={t('faq.title1')}
            title2={t('faq.title2')}
            para={t('faq.description')}
            titleStyles={'mb-10'}
          />


            <div className='max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
              {faqsData.map((faq, index) => (
                
                  <div key={index} className='flex w-full flex-col items-start'>
                    <div className='flex min-h-14 w-full items-center justify-between cursor-pointer rounded-lg border border-slate-900/10 bg-secondary/10 px-4 py-2'
                      
                      onClick={() => setOpenIndex( openIndex === index ? null:index)} >
                      
                    
                        <h2 className='text-sm leading-5'>{faq.question}</h2>
                         <img src={assets.down} alt="" className='h-4 w-4 shrink-0'/>   
                   </div>
                    <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`}>
                      {faq.answer}
                    </p>
                  </div>
               
              ) )}
            </div>
          </div>
        </div>
     
    </section>
  )
}

export default Faq
