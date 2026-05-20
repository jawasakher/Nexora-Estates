import React,{ createContext, useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {useUser } from "@clerk/clerk-react"
import { getProperties as fetchProperties } from '../services/properties.js'

const AppContext = createContext();


export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY ?? '$'
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const {user} = useUser() ?? {};
    const [showAgencyReg, setShowAgencyReg] = useState(false);
     const [isOwner, setIsOwner] = useState(true)
    const [loadingProperties, setLoadingProperties] = useState(false)
    
    const loadProperties = () => {
      setLoadingProperties(true)
      fetchProperties()
        .then((result) => {
          setProperties(Array.isArray(result?.data) ? result.data : [])
        })
        .catch((err) => {
          console.error('Error loading properties', err)
          setProperties([])
        })
        .finally(() => {
          setLoadingProperties(false)
        })
    };

    useEffect (() => {
      loadProperties();
    }, []);

    const value ={
        navigate,
        properties,
      loadingProperties,
      currency,
        user,
        showAgencyReg,
        setShowAgencyReg,
        isOwner,
        setIsOwner,
    };

  return (
 
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);
