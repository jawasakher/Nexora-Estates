import React, { useEffect, useMemo, useState } from 'react'
import EmptyState from './ui/EmptyState'
import { assets } from '../assets/data'
import OptimizedImage from './ui/OptimizedImage'

const PropertyImages = ({ property }) => {
    const images = useMemo(() => (Array.isArray(property?.images) ? property.images : []), [property]);
    const [selectedIndex, setSelectedIndex] = useState(0)
     
    const imageCaptions = [
        {
            heading:"Front View",
            desc:"Experience the inviting front facade of this property, showcasing its charming curb appeal and welcoming entrance.",

        },
        {
            heading:"Living Area",
            desc:"Spacious interiors designed for comfort and style.",
        },
        {
            heading:"Master Bedroom",
            desc:"A serene retreat with ample space and natural light.",
        },
        {
            heading:"Modern Kitchen",
            desc:"Fully equipped kitchen with sleek appliances and ample storage.",
        },
    ];
    if (images.length === 0) return <EmptyState title="No images" description="No property images available." />;

    const selectedImage = images[selectedIndex] || images[0]
    const selectedCaption = imageCaptions[selectedIndex] ?? imageCaptions[0] ?? null

    useEffect(() => {
        setSelectedIndex(0)
    }, [images])

    return (

    <div className='w-full space-y-3'>
        <div className='relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm'>
            <div className='aspect-[16/10] min-h-64 w-full sm:min-h-[28rem]'>
                <OptimizedImage
                    src={selectedImage || ''}
                    alt={selectedCaption?.heading || 'property'}
                    priority={true}
                    useSkeleton={true}
                    placeholder={property?.imagesLqip?.[selectedIndex] || assets.about}
                    lqip={property?.imagesLqip?.[selectedIndex]}
                    className='h-full w-full'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px'
                />
            </div>

            {(selectedCaption?.heading || selectedCaption?.desc) && (
                <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/35 to-transparent p-4 text-white sm:p-6'>
                    {selectedCaption?.heading && <h3 className='h3'>{selectedCaption.heading}</h3>}
                    {selectedCaption?.desc && <p className='mt-1 max-w-2xl text-sm text-white/90'>{selectedCaption.desc}</p>}
                </div>
            )}
        </div>

        <div className='flex gap-3 overflow-x-auto pb-1'>
            {images.map((pImg, index) => {
                const caption = imageCaptions[index] ?? null
                const isSelected = selectedIndex === index

                return (
                    <button
                        key={index}
                        type='button'
                        aria-pressed={isSelected}
                        aria-label={caption?.heading || `Property image ${index + 1}`}
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 sm:h-24 sm:w-36 ${
                            isSelected ? 'border-secondary ring-2 ring-secondary/40' : 'border-slate-200'
                        }`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <OptimizedImage
                            src={pImg || ''}
                            alt={caption?.heading || 'property'}
                            placeholder={property?.imagesLqip?.[index] || assets.about}
                            className='h-full w-full'
                            sizes='80px'
                        />
                        {caption?.heading ? (
                            <div className='absolute inset-x-0 bottom-0 bg-black/45 px-2 py-1 text-[11px] font-semibold text-white'>
                                {caption.heading}
                            </div>
                        ) : null}
                    </button>
                )
            })}
        </div>
    </div>
    )
};

export default PropertyImages;
