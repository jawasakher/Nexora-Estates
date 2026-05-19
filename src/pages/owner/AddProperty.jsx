import React,{useState} from 'react'
import { assets } from '../../assets/data'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Card from '../../components/ui/Card'

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
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12'>
      <Card className='p-4 sm:p-6'>
      <form className="flex flex-col gap-y-3.5 px-2 text-sm xl:max-w-3xl">
        <Input
          label='Property Name'
          value={inputs.title}
          onChange={(e)=>setInputs({...inputs, title:e.target.value})}
          placeholder='Type here...'
        />

        <Textarea
          label='Property Description'
          value={inputs.description}
          onChange={(e)=>setInputs({...inputs, description:e.target.value})}
          rows={5}
          placeholder='Type here...'
        />

        <div className='flex gap-4 flex-wrap'>
          <Input
            label='City'
            value={inputs.city}
            onChange={(e)=>setInputs({...inputs, city:e.target.value})}
            placeholder='Type here...'
            className='min-w-[220px] flex-1'
          />

          <Input
            label='Country'
            value={inputs.country}
            onChange={(e)=>setInputs({...inputs, country:e.target.value})}
            placeholder='Type here...'
            className='min-w-[220px] flex-1'
          />

          <div className='w-full sm:w-44'>
          <h5 className='h5'>Property Type</h5>
          <select
          onChange={(e)=>setInputs({...inputs, propertyType:e.target.value})}
          value={inputs.propertyType}
           className='w-full px-3 py-2 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
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

          <div className='flex gap-4 flex-wrap w-full'>
          <Textarea
            label='Address'
            value={inputs.address}
            onChange={(e)=>setInputs({...inputs, address:e.target.value})}
            placeholder='Type here...'
            className='min-w-[260px] flex-1'
          />
          <Input
            label='Area'
            type='number'
            value={inputs.area}
            onChange={(e)=>setInputs({...inputs, area:e.target.value})}
            placeholder='Area (sq ft)'
            className='w-40'
          />
        </div>

        <div className='flex gap-4 flex-wrap'>
          <Input
            label='Rent Price / night'
            type='number'
            value={inputs.priceRent}
            onChange={(e)=>setInputs({...inputs, priceRent:e.target.value})}
            placeholder='99'
            min={99}
            className='w-40'
          />
           
          <Input
            label='Sale Price'
            type='number'
            value={inputs.priceSale}
            onChange={(e)=>setInputs({...inputs, priceSale:e.target.value})}
            placeholder='9999'
            min={9999}
            className='w-40'
          />

          <Input
            label='Bedrooms'
            type='number'
            value={inputs.bedrooms}
            onChange={(e)=>setInputs({...inputs, bedrooms:e.target.value})}
            placeholder='1'
            min={1}
            className='w-32'
          />

          <Input
            label='Bathrooms'
            type='number'
            value={inputs.bathrooms}
            onChange={(e)=>setInputs({...inputs, bathrooms:e.target.value})}
            placeholder='1'
            min={1}
            className='w-32'
          />

          <Input
            label='Garages'
            type='number'
            value={inputs.garages}
            onChange={(e)=>setInputs({...inputs, garages:e.target.value})}
            placeholder='1'
            min={1}
            className='w-32'
          />
        </div>
        {/**Amenities */}
        <div>
          <h5 className='h5'>Amenities</h5>
          <div className='flex gap-3 flex-wrap mt-1'>
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex gap-1">
                <input
                id={`amenities${index + 1}`}
                 onChange={(e)=>
                  setInputs({...inputs, amenities:{...inputs.amenities,[amenity]:
                    !inputs.amenities[amenity] }})
                }
                 value={inputs.amenities[amenity]}
                type="checkbox"
                />
                <label htmlFor={`amenities${index + 1}`} >{amenity}</label>
                </div>
               )) }
        </div>
        </div>
        {/** Images */}
        <div className='flex gap-2 mt-2'>
          {Object.keys(images).map((key) => (
            <label 
            key={key}
            htmlFor={`propertyImage${key}`} 
            className='ring-1 ring-slate-900/10 overflow-hidden rounded-lg '
            >
              <input
              onCanPlay={(e) =>
                setImages({...images,[key]:e.target.files[0]})
              }
              type="file" 
              accept="image/*"
              id={`propertyImage${key}`}
              hidden
              />
              <div className="h-2 w-24 bg-secondary/5 flexCenter">
                <img 
                src={
                  images[key]
                   ? URL.createObjectURL(images[key])
                    :assets.uploadIcon 
                    }
                     alt="upload Area"
                      className='overflow-hidden object-contain'/>
              </div>
            </label>
            ))}
        </div>
        <Button type="submit" disabled={loading} loading={loading} size='lg' className="mt-3 max-w-56 sm:w-full rounded-xl">
          Submit Property
        </Button>
        </form>
      </Card>
    </div>
  )
}

export default AddProperty
