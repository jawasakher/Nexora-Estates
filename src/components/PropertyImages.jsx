import React, { useMemo, useState } from 'react'
import EmptyState from './ui/EmptyState'

const PropertyImages = ({ property }) => {
    const images = useMemo(() => (Array.isArray(property?.images) ? property.images : []), [property]);
    const [hoveredIndex, setHoveredIndex] = useState(0);  // Initially first image is expanded
     
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

    return(

    <div className="flex max-sm:gap-1 max-md:gap-3 gap-5 h-100 w-full">

        {images.map((pImg, index) => {
            const caption = imageCaptions[index] ?? null;
            const isHovered =  hoveredIndex === index

            return (
                <button
                    key={index}
                    type='button'
                    aria-pressed={isHovered}
                    aria-label={caption?.heading || `Property image ${index + 1}`}
                    className={`relative group h-100 overflow-hidden rounded-2xl text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 ${
                        isHovered ? 'grow w-full' : 'max-sm:w-10 max-md:w-20 w-56'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(0)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(0)}
                    onClick={() => setHoveredIndex(index)}
                >
                    <img
                        src={pImg || ''}
                        loading='lazy'
                        decoding='async'
                        alt={caption?.heading || 'property'}
                        className='h-full w-full rounded-2xl object-cover object-center'
                    />
                    <div
                        className={`absolute inset-0 flex flex-col justify-end rounded-2xl bg-black/40 p-10 text-white transition-all duration-300 ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {caption?.heading && <h3 className='h3'>{caption.heading}</h3>}
                        {caption?.desc && <p className='text-white/90'>{caption.desc}</p>}
                    </div>
                </button>
            );
        })} 

    </div>
    );
};

export default PropertyImages;
