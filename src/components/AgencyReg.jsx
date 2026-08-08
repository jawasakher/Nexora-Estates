import React ,{ useState }from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { assets,cities } from '../assets/data.js';
import { useI18n } from '../i18n/I18nContext.jsx'

const AgencyReg = () => {
    const { setShowAgencyReg } = useAppContext();
    const { t } = useI18n()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress ] = useState('');
    const [city, setCity] = useState('');

  return (
        <div onClick={() => setShowAgencyReg(false)} className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/80'>
      
            <form onClick={(e) => e.stopPropagation()} className='flexCenter bg-white rounded-xl max-w-4xl max-md:mx-2 relative'>
       <img  src={assets.createPrp} alt={t('agency.imageAlt')} className='w-1/2 rounded-1-xl hidden md:block ' />
       <div className='flex flex-col md:w-1/2 p-8 md:p-10'>
                <img onClick={() => setShowAgencyReg(false)} src={assets.close} alt="" className='absolute top-4 right-4 h-6 w-6 p-1 cursor-pointer bg-secondary/50 rounded-full shadow-md' />
        <h3 className="h3 mb-6">{t('agency.title')}</h3>
        <div className='flex gap-2 xl:gap-3'>
            <div>
                <label htmlFor="name" className="medium-14"> {t('agency.agencyName')}</label>
                <input onChange={(e) => setName(e.target.value)}  value={name} id="name" type="text" placeholder={t('common.typeHere')}
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none" required/>
            </div>
            <div>
                <label htmlFor="contact" className="medium-14"> {t('agency.contact')}</label>
                <input onChange={(e) => setContact(e.target.value)}  value={contact} id="contact" type="text" placeholder={t('common.typeHere')}
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none" required/>
            </div>
        </div>
        <div className='w-full mt-4'>
                <label htmlFor="email" className="medium-14"> {t('agency.email')}</label>
                <input onChange={(e) => setEmail(e.target.value)}  value={email} id="email" type="email" placeholder={t('common.typeHere')}
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none" required/>
            </div>
            <div className='w-full mt-4'>
                <label htmlFor="address" className="medium-14"> {t('agency.address')}</label>
                <input onChange={(e) => setAddress(e.target.value)}  value={address} id="address" type="text" placeholder={t('common.typeHere')}
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none" required/>
            </div>
            <div className='w-full mt-4 max-w-60 mr-auto'>
                <label htmlFor="city" className="medium-14"> {t('agency.city')}</label>
                <select onChange={(e) => setCity(e.target.value)}  value={city} id="city" 
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none" required>
                    <option value="" >{t('agency.selectCity')}</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
       </div>
            </form>
    </div>
  )
}

export default AgencyReg

