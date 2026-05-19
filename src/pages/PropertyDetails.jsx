import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import PropertyImages from '../components/PropertyImages'
import ListingCard from '../components/property/ListingCard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { assets, cities } from '../assets/data'

const PropertyDetails = () => {
  const { properties, navigate, currency } = useAppContext()
  const { id } = useParams()

  const [bookingForm, setBookingForm] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  })

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [contactStatus, setContactStatus] = useState({ type: '', text: '' })

  const property = useMemo(() => {
    return properties?.find((item) => item._id === id) ?? null
  }, [properties, id])

  const similarProperties = useMemo(() => {
    if (!property) return []

    return (properties ?? [])
      .filter((item) => item._id !== property._id)
      .filter((item) => item.city === property.city || item.propertyType === property.propertyType)
      .slice(0, 3)
  }, [properties, property])

  const handleBookingChange = (e) => {
    const { id: fieldId, value } = e.target
    const key = fieldId === 'destinationInput' ? 'destination' : fieldId
    setBookingForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()

    if (bookingForm.destination) query.set('q', bookingForm.destination)
    if (bookingForm.destination) query.set('city', bookingForm.destination)
    if (bookingForm.checkIn) query.set('checkIn', bookingForm.checkIn)
    if (bookingForm.checkOut) query.set('checkOut', bookingForm.checkOut)
    if (bookingForm.guests) query.set('guests', String(bookingForm.guests))

    navigate(`/listing?${query.toString()}`)
  }

  const handleBookingCancel = () => {
    setBookingForm({ destination: '', checkIn: '', checkOut: '', guests: 1 })
  }

  const handleContactChange = (e) => {
    const { id: fieldId, value } = e.target
    setContactForm((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactStatus({
      type: 'success',
      text: 'Lead form is ready. Connect it to your backend/contact service in the next step.',
    })
  }

  if (!property) {
    return (
      <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
        <div className='max-padd-container'>
          <EmptyState
            title='Property not found'
            description='The property you are looking for may have been removed or the link is incorrect.'
            action={
              <Button onClick={() => navigate('/listing')} variant='primary'>
                Back to listings
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-linear-to-r from-[#fffbee] to-white py-16 pt-28'>
      <div className='max-padd-container'>
        <div className='mb-6 flex flex-wrap items-center gap-2'>
          <Badge variant='info'>{property.propertyType}</Badge>
          <Badge variant={property.isAvailable ? 'success' : 'warning'}>
            {property.isAvailable ? 'Available' : 'Unavailable'}
          </Badge>
          <Badge variant='neutral'>
            {property.city}, {property.country}
          </Badge>
        </div>

        <Card className='p-3 sm:p-4'>
          <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Media</p>
              <h2 className='h2'>{property.title}</h2>
            </div>
            <div className='text-right'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Sale</p>
              <p className='bold-18 text-secondary'>
                {currency}{property.price?.sale}
              </p>
            </div>
          </div>
          <PropertyImages property={property} />
        </Card>

        <div className='mt-6 grid gap-8 xl:grid-cols-[1.7fr_0.9fr]'>
          <div className='space-y-6'>
            <Card className='p-5 sm:p-6'>
              <p className='flexStart gap-x-2 text-slate-600'>
                <img src={assets.pin} alt='' width={19} />
                <span>{property.address}</span>
              </p>

              <div className='mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                  <h3 className='h3'>{property.title}</h3>
                  <p className='mt-1 text-sm text-slate-600'>{property.country}</p>
                </div>
                <div className='bold-18'>
                  {currency}{property.price?.sale} | {currency}{property.price?.rent}.00/night
                </div>
              </div>

              <div className='mt-4 flex flex-wrap items-start justify-between gap-3'>
                <div className='flex items-center gap-2'>
                  <h4 className='h4 text-secondary'>{property.propertyType}</h4>
                  <Badge variant='neutral'>#{property._id.slice(-5)}</Badge>
                </div>
                <div className='flex items-center gap-2'>
                  <h4 className='bold-18 relative bottom-0.5 text-black'>5.0</h4>
                  <div className='flex items-center gap-0.5'>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <img key={idx} src={assets.star} alt='star icon' width={18} />
                    ))}
                  </div>
                </div>
              </div>

              <div className='mt-4 flex flex-wrap gap-x-4 gap-y-2'>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium'>
                  <img src={assets.bed} alt='' width={19} />
                  {property.facilities?.bedrooms}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium'>
                  <img src={assets.bath} alt='' width={19} />
                  {property.facilities?.bathrooms}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium'>
                  <img src={assets.car} alt='' width={19} />
                  {property.facilities?.garages}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium'>
                  <img src={assets.ruler} alt='' width={19} />
                  {property.area ?? 400}
                </p>
              </div>

              <div className='mt-6'>
                <h4 className='h4 mb-2'>Property Details</h4>
                <p className='leading-7 text-slate-700'>{property.description}</p>
              </div>

              <div className='mt-6'>
                <h4 className='h4 mb-3'>Amenities</h4>
                <div className='flex flex-wrap gap-3'>
                  {property.amenities?.map((amenity, index) => (
                    <Badge key={index} variant='neutral'>
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className='p-5 sm:p-6'>
              <div className='mb-4 flex items-center justify-between gap-3 flex-wrap'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Booking</p>
                  <h4 className='h4'>Check availability</h4>
                </div>
                <Badge variant='info'>Quick inquiry</Badge>
              </div>

              <form onSubmit={handleBookingSubmit} className='space-y-5'>
                <div>
                  <label className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
                    <img src={assets.pin} alt='pin' width={16} />
                    Destination
                  </label>
                  <input
                    list='destinations'
                    id='destinationInput'
                    type='text'
                    value={bookingForm.destination}
                    onChange={handleBookingChange}
                    className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30'
                    placeholder='Enter city name...'
                    required
                  />
                  <datalist id='destinations'>
                    {cities.map((city, index) => (
                      <option value={city} key={index} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
                    <img src={assets.calendar} alt='calendar' width={16} />
                    Check-in Date
                  </label>
                  <input
                    type='date'
                    id='checkIn'
                    value={bookingForm.checkIn}
                    onChange={handleBookingChange}
                    className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30'
                    required
                  />
                </div>

                <div>
                  <label className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
                    <img src={assets.calendar} alt='calendar' width={16} />
                    Check-out Date
                  </label>
                  <input
                    type='date'
                    id='checkOut'
                    value={bookingForm.checkOut}
                    onChange={handleBookingChange}
                    className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30'
                    required
                  />
                </div>

                <div>
                  <label className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700'>
                    <img src={assets.user} alt='user' width={16} />
                    Number of Guests
                  </label>
                  <input
                    type='number'
                    id='guests'
                    value={bookingForm.guests}
                    onChange={handleBookingChange}
                    min={1}
                    max={5}
                    className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30'
                    required
                  />
                </div>

                <div className='flex gap-3 pt-2'>
                  <Button type='button' onClick={handleBookingCancel} variant='secondary' className='flex-1 rounded-lg'>
                    Cancel
                  </Button>
                  <Button type='submit' className='flex-1 rounded-lg'>
                    Search Properties
                  </Button>
                </div>
              </form>
            </Card>

            <Card className='p-5 sm:p-6'>
              <div className='mb-4 flex items-center justify-between gap-3 flex-wrap'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Media notes</p>
                  <h4 className='h4'>What you are seeing</h4>
                </div>
                <Badge variant='neutral'>{property.images?.length ?? 0} photos</Badge>
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>
                <div className='rounded-2xl bg-secondary/10 p-4'>
                  <p className='text-sm font-semibold text-slate-900'>High-resolution gallery</p>
                  <p className='text-sm text-slate-600'>Large visuals with hover emphasis and responsive cropping.</p>
                </div>
                <div className='rounded-2xl bg-secondary/10 p-4'>
                  <p className='text-sm font-semibold text-slate-900'>Media-ready layout</p>
                  <p className='text-sm text-slate-600'>Structured for future 360 tours, videos, and floor plans.</p>
                </div>
              </div>
            </Card>

            {similarProperties.length > 0 && (
              <Card className='p-5 sm:p-6'>
                <div className='mb-4 flex items-center justify-between gap-3 flex-wrap'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>More to explore</p>
                    <h4 className='h4'>Similar properties</h4>
                  </div>
                  <Link to='/listing' className='text-sm font-semibold text-secondary'>View all</Link>
                </div>
                <div className='space-y-4'>
                  {similarProperties.map((item) => (
                    <ListingCard key={item._id} property={item} currency={currency} showDescription={false} />
                  ))}
                </div>
              </Card>
            )}
          </div>

          <Card className='p-6 sticky top-28 h-fit'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Contact</p>
                <h4 className='h4 mb-1'>Agency information</h4>
              </div>
              <Badge variant='success'>Verified</Badge>
            </div>

            <div className='flex items-center justify-between gap-4 rounded-2xl bg-secondary/10 p-3'>
              <div>
                <div className='flex items-center gap-2'>
                  <h5 className='h5'>{property.agency.name}</h5>
                  <Badge variant='neutral'>Agency</Badge>
                </div>
                <p className='text-sm text-slate-600'>Agency Office</p>
              </div>
              <img src={property.agency.owner.image} alt='Agency owner' className='h-12 w-12 rounded-full object-cover' />
            </div>

            <div className='mt-4 space-y-3'>
              <div className='flexStart gap-2 rounded-xl border border-slate-900/10 p-3'>
                <div className='rounded-full border border-green-500/30 bg-green-500/20 p-1'>
                  <img src={assets.phone} alt='' width={14} />
                </div>
                <p>{property.agency.contact}</p>
              </div>

              <div className='flexStart gap-2 rounded-xl border border-slate-900/10 p-3'>
                <div className='rounded-full border border-green-500/30 bg-green-500/20 p-1'>
                  <img src={assets.mail} alt='' width={14} />
                </div>
                <p>{property.agency.email}</p>
              </div>
            </div>

            <div className='mt-4 flex items-center gap-3'>
              <Button variant='secondary' className='flex-1 rounded-xl'>
                <img src={assets.mail} alt='' width={16} />
                Send Email
              </Button>
              <Button className='flex-1 rounded-xl'>
                <img src={assets.phone} alt='' width={16} />
                Call Now
              </Button>
            </div>

            <div className='mt-5 border-t border-slate-900/10 pt-5'>
              <div className='mb-4 flex items-center justify-between gap-3 flex-wrap'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Message</p>
                  <h4 className='h4'>Send an inquiry</h4>
                </div>
                <Badge variant='info'>Lead capture ready</Badge>
              </div>

              <form onSubmit={handleContactSubmit} className='space-y-3'>
                <input
                  id='name'
                  value={contactForm.name}
                  onChange={handleContactChange}
                  type='text'
                  placeholder='Your Name'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/20'
                  required
                />
                <input
                  id='email'
                  value={contactForm.email}
                  onChange={handleContactChange}
                  type='email'
                  placeholder='Your Email'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/20'
                  required
                />
                <textarea
                  id='message'
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={4}
                  placeholder='Your Message'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-secondary/70 focus:ring-2 focus:ring-secondary/20'
                  required
                />
                {contactStatus.text && (
                  <div className={`rounded-xl border px-4 py-3 text-sm ${contactStatus.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700' : 'border-red-500/20 bg-red-500/10 text-red-700'}`}>
                    {contactStatus.text}
                  </div>
                )}
                <Button type='submit' className='w-full rounded-xl'>
                  Send Message
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
