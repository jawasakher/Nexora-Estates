import React, { useMemo, useState } from 'react'
import { useAppContext } from "../context/AppContext.jsx";
import { useParams } from 'react-router-dom';
import PropertyImages from '../components/PropertyImages';
import { assets, cities } from '../assets/data';

const PropertyDetails = () => {
    const { properties, navigate } = useAppContext()
    const { id } = useParams()

    const [formData, setFormData] = useState({
      destination: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
    });

    const property = useMemo(() => {
      return properties?.find((p) => p._id === id) ?? null;
    }, [properties, id]);

    const handleFormChange = (e) => {
      const { id: fieldId, value } = e.target;
      const key = fieldId === 'destinationInput' ? 'destination' : fieldId;
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      navigate('/listing');
    };

    const handleCancel = () => {
      setFormData({ destination: '', checkIn: '', checkOut: '', guests: 1 });
    };
    
  if (!property) return null;

  return (
    <div className="bg-linear-to-r from-[#fffbee] to-white py-16 pt-28">
      <div className="max-padd-container">
        {/** Image */}
        <PropertyImages property={property} />

        {/** Content */}
        <div className="flex flex-col xl:flex-row gap-8 mt-6">
          {/** Left side */}
          <div className="p-4 flex-2 rounded-xl border border-slate-900/10">
            <p className="flexStart gap-x-2">
              <img src={assets.pin} alt="" width={19} />
              <span>{property.address}</span>
            </p>

            <div className="flex justify-between flex-col sm:flex-row sm:items-end mt-3 gap-2">
              <h3 className="h3">{property.title}</h3>
              <div className="bold-18">
                ${property.price?.sale} | ${property.price?.rent}.00/night
              </div>
            </div>

            <div className="flex justify-between items-start my-1 gap-3">
              <h4 className="h4 text-secondary">{property.propertyType}</h4>
              <div className="flex items-center gap-2">
                <h4 className="bold-18 relative bottom-0.5 text-black">5.0</h4>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <img key={idx} src={assets.star} alt="star icon" width={18} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-x-4 gap-y-2 mt-3 flex-wrap">
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
                <img src={assets.bed} alt="" width={19} />
                {property.facilities?.bedrooms}
              </p>
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
                <img src={assets.bath} alt="" width={19} />
                {property.facilities?.bathrooms}
              </p>
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
                <img src={assets.car} alt="" width={19} />
                {property.facilities?.garages}
              </p>

              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
                <img src={assets.ruler} alt="" width={19} />
                {property.area ?? 400}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="h4 mt-4 mb-1">Property Details</h4>
              <p>{property.description}</p>
            </div>

            <h4 className="h4 mt-6 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-3">
              {property.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="p-3 py-1 rounded-lg bg-secondary/10 ring-1 ring-slate-900/10 text-sm"
                >
                  {amenity}
                </div>
              ))}
            </div>

            {/** from check availability */}
           <form onSubmit={handleSearchSubmit} className='space-y-5'>
                        {/* Destination */}
                        <div>
                          <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                            <img src={assets.pin} alt='pin' width={16} />
                            Destination
                          </label>
                          <input
                            list='destinations'
                            id='destinationInput'
                            type='text'
                            value={formData.destination}
                            onChange={handleFormChange}
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                            placeholder='Enter city name...'
                            required
                          />
                          <datalist id='destinations'>
                            {cities.map((city, index) => (
                              <option value={city} key={index} />
                            ))}
                          </datalist>
                        </div>
           
                        {/* Check-in Date */}
                        <div>
                          <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                            <img src={assets.calendar} alt='calendar' width={16} />
                            Check-in Date
                          </label>
                          <input
                            type='date'
                            id='checkInDate'
                            value={formData.checkIn}
                            onChange={handleFormChange}
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                            required
                          />
                        </div>
           
                        {/* Check-out Date */}
                        <div>
                          <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                            <img src={assets.calendar} alt='calendar' width={16} />
                            Check-out Date
                          </label>
                          <input
                            type='date'
                            id='checkOutDate'
                            value={formData.checkOut}
                            onChange={handleFormChange}
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                            required
                          />
                        </div>
           
                        {/* Number of Guests */}
                        <div>
                          <label className='text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2'>
                            <img src={assets.user} alt='user' width={16} />
                            Number of Guests
                          </label>
                          <input
                            type='number'
                            id='guests'
                            value={formData.guests}
                            onChange={handleFormChange}
                            min={1}
                            max={5}
                            className='w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/70 focus:ring-2 focus:ring-secondary/30 transition-all'
                            placeholder='0'
                            required
                          />
                        </div>
           
                        {/* Action Buttons */}
                        <div className='flex gap-3 pt-4'>
                          <button
                            type='button'
                            onClick={handleCancel}
                            className='flex-1 rounded-lg border border-slate-200 py-3 px-6 font-semibold text-slate-700 transition-all hover:bg-slate-100'
                          >
                            Cancel
                          </button>
                          <button
                            type='submit'
                            className='flex-1 rounded-lg bg-linear-to-r from-secondary to-tertiary py-3 px-6 font-semibold text-white transition-all hover:shadow-lg shadow-secondary/30'
                          >
                            Search Properties
                          </button>
                        </div>
                      </form>
          </div>
          {/** Right side */}
          <div className='flex-1 max-w-sm'>
            <div className='p-6 rounded-xl border border-slate-900/10'>
              <h4 className="h4 mb-3">Contact Information</h4>
              <from className="flex flex-col gap-4">
                <input type="text" placeholder="Your Name" className="p-2 py-1 border border-gray-300 rounded-md text-sm" required />
                <input type="email" placeholder="Your Email" className="p-2 py-1 border border-gray-300 rounded-md text-sm" required />
                <textarea rows={4} placeholder="Your Message" className="p-2 py-1 border border-gray-300 rounded-md text-sm" required />
                <button type="submit" className="bg-secondary text-white py-2 rounded-md font-semibold hover:bg-secondary/90 transition-all">Send Message</button>
              </from>
              <h4 className='h4 mb-3 mt-8'>For Buying Contact</h4>
                <div className='flex-sm w-80 divide-y divide-gray-500/30 border border-gray-500/30 rounded'>
                  <div className='flex items-start justify-between p-3 '>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <h5 className='h5'>{property.agency.name}</h5>
                        <p className='bg-green-500/20 px-2 rounded-full text-x5 text-green-600 border border-green-500/30'>Agency</p>
                      </div>
                      <p>Agency Office</p>
                    </div>
                    <img src={property.agency.owner.image} alt="" className='h-10 w-10 rounded-full'/>
                  </div>
                  <div className="flexStart gap-2 p-1.5">
                    <div className='bg-green-500/20 p-1 rounded-full border border-green-500/30'>
                      <img src={assets.phone} alt="" width={14}/>
                    </div>
                    <p>{property.agency.contact}</p>
                </div>
                
                <div className="flexStart gap-2 p-1.5">
                  <div className="bg-green-500/20 p-1 rounded-full border-green-500/30">
                    <img src={assets.phone} alt="" width={14}/>
                  </div>
                  <p>{property.agency.email}</p>
                </div>
                <div className='flex items-center divide-x divide-gray-500/30'>
                 <button className='flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer'>
                  <img src={assets.mail} alt="" width={19}/>
                  Send Email
                 </button>
                 <button className='flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer'>
                  <img src={assets.phone} alt="" width={19}/>
                  Call Now
                 </button>
                </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
