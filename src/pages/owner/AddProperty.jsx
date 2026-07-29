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
import { useI18n } from '../../i18n/I18nContext.jsx'

const AddProperty = () => {
  const { t } = useI18n()
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
  const propertyTypeOptions = useMemo(
    () => [
      { value: 'House', label: t('owner.form.typeOptions.house') },
      { value: 'Apartment', label: t('owner.form.typeOptions.apartment') },
      { value: 'Villa', label: t('owner.form.typeOptions.villa') },
      { value: 'Condo', label: t('owner.form.typeOptions.condo') },
      { value: 'Townhouse', label: t('owner.form.typeOptions.townhouse') },
      { value: 'Commercial', label: t('owner.form.typeOptions.commercial') },
      { value: 'Land Plot', label: t('owner.form.typeOptions.landPlot') },
    ],
    [t],
  )

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

      setFormSuccess(editingProperty ? t('owner.form.updateSuccess') : t('owner.form.createSuccess'))
      if (result?.data?._id) {
        navigate('/owner/list-property')
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : editingProperty ? t('owner.form.updateFailed') : t('owner.form.createFailed'))
    }
  }

  const loading = createPropertyMutation.isPending || updatePropertyMutation.isPending
 

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12'>
      <Card className='p-4 sm:p-6'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3.5 px-2 text-sm xl:max-w-3xl">
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>{t('owner.form.tag')}</p>
          <h2 className='h2 mt-1'>{editingProperty ? t('owner.form.editTitle') : t('owner.form.addTitle')}</h2>
          <p className='text-slate-600'>{editingProperty ? t('owner.form.editDescription') : t('owner.form.addDescription')}</p>
        </div>
        <Input
          label={t('owner.form.propertyName')}
          value={inputs.title}
          onChange={(e)=>setInputs({...inputs, title:e.target.value})}
          placeholder={t('common.typeHere')}
        />

        <Textarea
          label={t('owner.form.propertyDescription')}
          value={inputs.description}
          onChange={(e)=>setInputs({...inputs, description:e.target.value})}
          rows={5}
          placeholder={t('common.typeHere')}
        />

        <div className='flex gap-4 flex-wrap'>
          <Input
            label={t('owner.form.city')}
            value={inputs.city}
            onChange={(e)=>setInputs({...inputs, city:e.target.value})}
            placeholder={t('common.typeHere')}
            className='min-w-55 flex-1'
          />

          <Input
            label={t('owner.form.country')}
            value={inputs.country}
            onChange={(e)=>setInputs({...inputs, country:e.target.value})}
            placeholder={t('common.typeHere')}
            className='min-w-55 flex-1'
          />

          <div className='w-full sm:w-44'>
          <h5 className='h5'>{t('owner.form.propertyType')}</h5>
          <select
          onChange={(e)=>setInputs({...inputs, propertyType:e.target.value})}
          value={inputs.propertyType}
           className='w-full px-3 py-2 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
           >
            <option value="">{t('owner.form.selectPropertyType')}</option>
            {propertyTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        </div>

        <div className='flex gap-4 flex-wrap w-full'>
          <Textarea
            label={t('owner.form.address')}
            value={inputs.address}
            onChange={(e)=>setInputs({...inputs, address:e.target.value})}
            placeholder={t('common.typeHere')}
            className='min-w-65 flex-1'
          />
          <Input
            label={t('owner.form.area')}
            type='number'
            value={inputs.area}
            onChange={(e)=>setInputs({...inputs, area:e.target.value})}
            placeholder={t('owner.form.areaPlaceholder')}
            className='w-40'
          />
        </div>

        <div className='flex gap-4 flex-wrap'>
          <Input
            label={t('owner.form.rentPrice')}
            type='number'
            value={inputs.priceRent}
            onChange={(e)=>setInputs({...inputs, priceRent:e.target.value})}
            placeholder='99'
            min={99}
            className='w-40'
          />
           
          <Input
            label={t('owner.form.salePrice')}
            type='number'
            value={inputs.priceSale}
            onChange={(e)=>setInputs({...inputs, priceSale:e.target.value})}
            placeholder='9999'
            min={9999}
            className='w-40'
          />

          <Input
            label={t('owner.form.bedrooms')}
            type='number'
            value={inputs.bedrooms}
            onChange={(e)=>setInputs({...inputs, bedrooms:e.target.value})}
            placeholder='1'
            min={1}
            className='w-32'
          />

          <Input
            label={t('owner.form.bathrooms')}
            type='number'
            value={inputs.bathrooms}
            onChange={(e)=>setInputs({...inputs, bathrooms:e.target.value})}
            placeholder='1'
            min={1}
            className='w-32'
          />

          <Input
            label={t('owner.form.garages')}
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
          <h5 className='h5'>{t('owner.form.amenities')}</h5>
          <div className='flex gap-3 flex-wrap mt-1'>
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex gap-1">
                <input
                id={`amenities${index + 1}`}
                 onChange={() =>
                  setInputs({...inputs, amenities:{...inputs.amenities,[amenity]:
                    !inputs.amenities[amenity] }})
                }
                 checked={Boolean(inputs.amenities[amenity])}
                type="checkbox"
                />
                <label htmlFor={`amenities${index + 1}`} >{t(`owner.form.amenitiesLabels.${amenity.toLowerCase()}`)}</label>
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
                     alt={t('owner.form.uploadAreaAlt')}
                      className='overflow-hidden object-contain'/>
              </div>
            </label>
            ))}
        </div>
        <div className='flex flex-wrap items-center gap-3 text-xs text-slate-500'>
          <span>{t('owner.form.amenitiesSelected', { count: amenityCount })}</span>
          <span>{t('owner.form.pricingReady', { currency })}</span>
        </div>
        {formError ? <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{formError}</p> : null}
        {formSuccess ? <p className='rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>{formSuccess}</p> : null}
        <Button type="submit" disabled={loading} loading={loading} size='lg' className="mt-3 max-w-56 sm:w-full rounded-xl">
          {editingProperty ? t('common.updateProperty') : t('common.submitProperty')}
        </Button>
        </form>
      </Card>
    </div>
  )
}

export default AddProperty
