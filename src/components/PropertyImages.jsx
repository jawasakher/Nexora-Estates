import React, { useMemo, useState } from 'react'



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
    if (images.length === 0) return null;

    return(

    <div className="flex max-sm:gap-1 max-md:gap-3 gap-5 h-100 w-full">

        {images.map((pImg, index) => {
            const caption = imageCaptions[index] ?? null;
            const isHovered =  hoveredIndex === index

            return (
                <div key={index} className={`relative group transition-all duration-500 h-100  overflow-hidden rounded-2xl ${
                    isHovered ? "grow w-full " : "max-sm:w-10 max-md:w-20 w-56"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)} // Reset to first image when mouse leaves
                onClick={() => setHoveredIndex(index)}
                >
                    <img src={pImg} alt="property" className="h-full w-full object-cover object-center rounded-2xl"/>
                    <div
                        className={`absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/40 transition-all duration-300 rounded-2xl ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {caption?.heading && <h3 className="h3">{caption.heading}</h3>}
                        {caption?.desc && <p className="text-white/90">{caption.desc}</p>}
                    </div>
                </div>
            );
        })} 

    </div>
    );
};

export default PropertyImages;
