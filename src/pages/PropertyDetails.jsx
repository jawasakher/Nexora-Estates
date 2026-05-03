import React, {useEffect} from 'react'
import {useAppContext} from "../context/AppContext";
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
    const {properties} = useAppContext()
    const [property, setProperty] = useState(null)
    const { id } = useParams()
    
    useEffect(() => {
        const property = properties.find((property) => property._id === id)
        property && setProperty(property)
    }, [ properties])
  return (
    <div>
      
    </div>
  )
}

export default PropertyDetails
