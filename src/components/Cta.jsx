import React, { useState } from 'react'
import {assets} from '../assets/data'

const Cta = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setMessage({ 
          type: 'success', 
          text: `✅ Thank you! We've sent a confirmation email to ${email}. Check your inbox for exclusive updates and property listings.` 
        });
        setEmail('');
        setTimeout(() => {
          setShowModal(false);
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: 'Please enter a valid email address.' 
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <section className='bg-gradient-to-b from-white to-slate-50 pt-16 xl:pt-22'>
        <div className='max-padd-container mx-2 md:mx-auto p-px'>
          <div className='flex flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-secondary/10 via-white/50 to-tertiary/10 border border-secondary/20 py-12 text-center md:py-16'>  
            <div className='flex center gap-1 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary border border-secondary/20'>
              <img src={assets.rocket} alt='' width={17} />
              <span>Trusted by Experts</span>
            </div>
            <h2 className='h2 mt-4 max-w-3xl'>
              Sell or Rent Faster With <span className='bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent'>Expert Guidance</span><br /> and Proven Results!
            </h2>
            <p className='mt-6 max-w-lg text-slate-600 max-md:text-sm'>
              Achieve your goals faster with personalized strategies, hands-on support, and results that speak for themselves.
            </p>
            <button 
              onClick={handleSubscribeClick}
              className='btn-secondary mt-6 rounded-full px-8 py-3 shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all hover:-translate-y-0.5'
            > 
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Modal */}
      {showModal && (
        <div 
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
          onClick={() => setShowModal(false)}
        >
          <div 
            className='bg-white rounded-3xl shadow-2xl max-w-md w-full p-8'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-slate-950'>Get Started</h2>
              <button
                onClick={() => setShowModal(false)}
                className='flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100 transition-all'
              >
                <img src={assets.close} alt='close' className='h-4 w-4' />
              </button>
            </div>

            {/* Subtitle */}
            <p className='text-slate-600 mb-6 text-sm'>
              Join thousands of satisfied clients who have found their dream properties with Nexora Estates. Enter your email to receive exclusive listings and expert guidance.
            </p>

            {/* Form */}
            <form onSubmit={handleSubscribe} className='space-y-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Email Address</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='your@email.com'
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                  required
                />
              </div>

              {/* Message */}
              {message.text && (
                <div className={`rounded-lg border px-4 py-3 text-sm ${
                  message.type === 'success' 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                    : 'border-red-200 bg-red-50 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Benefits */}
              <div className='space-y-2 py-4 border-y border-slate-200'>
                <div className='flex items-start gap-3'>
                  <img src={assets.star} alt='check' className='h-4 w-4 text-secondary mt-0.5' />
                  <p className='text-sm text-slate-700'>Exclusive property listings</p>
                </div>
                <div className='flex items-start gap-3'>
                  <img src={assets.star} alt='check' className='h-4 w-4 text-secondary mt-0.5' />
                  <p className='text-sm text-slate-700'>Market insights and tips</p>
                </div>
                <div className='flex items-start gap-3'>
                  <img src={assets.star} alt='check' className='h-4 w-4 text-secondary mt-0.5' />
                  <p className='text-sm text-slate-700'>Expert guidance and support</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='flex-1 rounded-lg border border-slate-200 py-3 px-6 font-semibold text-slate-700 transition-all hover:bg-slate-100'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 rounded-lg bg-gradient-to-r from-secondary to-tertiary py-3 px-6 font-semibold text-white transition-all hover:shadow-lg shadow-secondary/30 disabled:opacity-70'
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>

            {/* Footer Note */}
            <p className='text-xs text-slate-500 text-center mt-4'>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Cta
