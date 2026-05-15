import React,{useState} from 'react'

const AddProperty = () => {
  const [images, setImages ] = useState ({
    1:null,
    2:null,
    3:null,
    4:null,
  })
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    city: '',
    country: '',
    address: '',
    area:'',
    propertyType:'',
    priceRent:'',
    priceSale:'',
    bedrooms:'',
    garages:'',
    amenities:{
      parking:false,
      Wifi:false,
      Backyard:false,
      Terrace:false,
      
    },
  })
 
  const [loading, setLoading] = useState(false)
 

  return (
    <div className=''>
      <form className="">
        <div className='w-full'>
          <h5 className='h5'>Property Name</h5>
          <input onChange={(e)=>setInputs({...inputs, title:e.target.value})}
          value={inputs.title}
           type="text"
           placeholder='Type here...'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
               
                
        <div className='w-full'>
          <h5 className='h5'>Property Description</h5>
          <textarea
          onChange={(e)=>setInputs({...inputs, description:e.target.value})}
          value={inputs.description}
          rows={5}
           type="text"
           placeholder='Type here...'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
        <div className='flex gap-4'>
          <div className='w-full'>
          <h5 className='h5'>City</h5>
          <textarea
          onChange={(e)=>setInputs({...inputs, city:e.target.value})}
          value={inputs.city}
           type="text"
           placeholder='Type here...'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
          <div className='w-full'>
          <h5 className='h5'>Country</h5>
          <textarea
          onChange={(e)=>setInputs({...inputs, country:e.target.value})}
          value={inputs.country}
           type="text"
           placeholder='Type here...'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
          <div className='w-full'>
          <h5 className='h5'>Property Type</h5>
          <select
          onChange={(e)=>setInputs({...inputs, propertyType:e.target.value})}
          value={inputs.propertyType}
           className='w-36 px-3 py-2 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
           >
            <option value="">Select Property Type</option>
             <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Commercial">Commercial</option>
            <option value="Land Plot">Land Plot</option>
          </select>
        </div>
        </div>
          <div className='flex gap-4 flex-wrap w-full'>
          <div className='flex-1'>
          <h5 className='h5'>Address</h5>
          <textarea
          onChange={(e)=>setInputs({...inputs, address:e.target.value})}
          value={inputs.address}
           type="text"
           placeholder='Type here...'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
        <div className='w-32'>
          <h5 className='h5'>Area</h5>
          <textarea
          onChange={(e)=>setInputs({...inputs,Area:e.target.value})}
          value={inputs.Area}
          rows={5}
           type="number"
           placeholder='Area (sq ft)'
           className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full'
           />
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddProperty
