import React,{useEffect, useMemo, useState} from 'react'
import { assets } from '../../assets/data'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Card from '../../components/ui/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { useOwnerPropertyMutations } from '../../hooks/useOwnerPropertyMutations.js'
import { useAppContext } from '../../context/AppContext.jsx'
import { useOwnerProperties } from '../../hooks/useOwnerProperties.js'

const AddProperty = () => {
  const navigate = useNavigate()
  const { propertyId } = useParams()
  const { data: ownerProperties = [] } = useOwnerProperties()
  const { createPropertyMutation, updatePropertyMutation } = useOwnerPropertyMutations()
  const { currency } = useAppContext()
  const editingProperty = useMemo(
    () => ownerProperties.find((property) => property._id === propertyId) || null,
    [ownerProperties, propertyId],
  )
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
 
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const amenityCount = useMemo(() => Object.values(inputs.amenities).filter(Boolean).length, [inputs.amenities])

  useEffect(() => {
    if (!editingProperty) return

    setInputs({
      title: editingProperty.title || '',
      description: editingProperty.description || '',
      city: editingProperty.city || '',
      country: editingProperty.country || '',
      address: editingProperty.address || '',
      area: editingProperty.area ?? '',
      propertyType: editingProperty.propertyType || '',
      priceRent: editingProperty.price?.rent ?? '',
      priceSale: editingProperty.price?.sale ?? '',
      bedrooms: editingProperty.facilities?.bedrooms ?? '',
      bathrooms: editingProperty.facilities?.bathrooms ?? '',
      garages: editingProperty.facilities?.garages ?? '',
      amenities: Object.keys(inputs.amenities).reduce(
        (accumulator, amenity) => ({
          ...accumulator,
          [amenity]: Array.isArray(editingProperty.amenities) ? editingProperty.amenities.includes(amenity) : false,
        }),
        {},
      ),
    })

    setImages({
      1: editingProperty.images?.[0] || null,
      2: editingProperty.images?.[1] || null,
      3: editingProperty.images?.[2] || null,
      4: editingProperty.images?.[3] || null,
    })
  }, [editingProperty])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setFormSuccess('')

    try {
      const payload = {
        ...inputs,
        images: Object.values(images).filter(Boolean),
      }

      const result = editingProperty
        ? await updatePropertyMutation.mutateAsync({
            propertyId: editingProperty._id,
            input: payload,
          })
        : await createPropertyMutation.mutateAsync(payload)

      setFormSuccess(editingProperty ? 'Property updated successfully.' : 'Property created successfully.')
      if (result?.data?._id) {
        navigate('/owner/list-property')
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : editingProperty ? 'Failed to update property.' : 'Failed to create property.')
    }
  }

  const loading = createPropertyMutation.isPending || updatePropertyMutation.isPending
 

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12'>
      <Card className='p-4 sm:p-6'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3.5 px-2 text-sm xl:max-w-3xl">
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Owner property form</p>
          <h2 className='h2 mt-1'>{editingProperty ? 'Edit property' : 'Add property'}</h2>
          <p className='text-slate-600'>{editingProperty ? 'Update the listing details below.' : 'Create a new listing for your owner dashboard.'}</p>
        </div>
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
            className='min-w-55 flex-1'
          />

          <Input
            label='Country'
            value={inputs.country}
            onChange={(e)=>setInputs({...inputs, country:e.target.value})}
            placeholder='Type here...'
            className='min-w-55 flex-1'
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
        </div>

        <div className='flex gap-4 flex-wrap w-full'>
          <Textarea
            label='Address'
            value={inputs.address}
            onChange={(e)=>setInputs({...inputs, address:e.target.value})}
            placeholder='Type here...'
            className='min-w-65 flex-1'
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
              onChange={(e) =>
                setImages({...images,[key]:e.target.files?.[0] || null})
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
        <div className='flex flex-wrap items-center gap-3 text-xs text-slate-500'>
          <span>{amenityCount} amenities selected</span>
          <span>{currency} pricing ready for contract submit</span>
        </div>
        {formError ? <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{formError}</p> : null}
        {formSuccess ? <p className='rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>{formSuccess}</p> : null}
        <Button type="submit" disabled={loading} loading={loading} size='lg' className="mt-3 max-w-56 sm:w-full rounded-xl">
          {editingProperty ? 'Update Property' : 'Submit Property'}
        </Button>
        </form>
      </Card>
    </div>
  )
}

export default AddProperty
