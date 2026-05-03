import React from 'react'
import {useAppContext} from "../context/AppContext";
import { useParams } from 'react-router-dom';
import PropertyImages from '../components/PropertyImages';
import { assets } from '../assets/data';

const PropertyDetails = () => {
    const {properties} = useAppContext()
    const { id } = useParams()

    const property = properties.find((property) => property._id === id)
  return (
    property ? (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-28">
      <div className="max-padd-container">
        {/** Image */}
        <PropertyImages property={property}/>
        {/** Content */}
        <div>
            {/** Left side */}
            <div>
           <p>

            <img src={assets.pin} alt="" width={19}/>
            <span>{property.address}</span>

           </p>
            
          </div>
        </div>
      </div>
    </div>
    ) : (
    <div className="py-28 max-padd-container text-center">
      <div className="text-lg font-medium">Loading property details...</div>
      <div className="text-sm text-slate-500 mt-2">Ensure you're visiting a valid listing URL and properties are loaded.</div>
      <div className="mt-4 text-xs text-gray-400">If this stays visible please check the console for diagnostics.</div>
    </div>
    )
  );
}

export default PropertyDetails
