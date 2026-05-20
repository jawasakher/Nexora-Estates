import React,{ createContext, useState, useEffect, useContext, useMemo} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from "@clerk/clerk-react"
import { getProperties as fetchProperties } from '../services/properties.js'
import { envConfig } from '../config/env.js'

const AppContext = createContext();


export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY ?? '$'
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const { isLoaded: authLoaded, isSignedIn, getToken } = useAuth()
    const { isLoaded: userLoaded, user } = useUser() ?? {};
    const [showAgencyReg, setShowAgencyReg] = useState(false);
    const [loadingProperties, setLoadingProperties] = useState(false)
    const authReady = authLoaded && userLoaded

    const normalizedEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || ''
    const metadataRole = [
      user?.publicMetadata?.role,
      user?.unsafeMetadata?.role,
      user?.organizationMemberships?.[0]?.role,
    ]
      .map((value) => String(value || '').toLowerCase())
      .find((value) => value === 'owner')

    const ownerAllowlistMatch = envConfig.ownerEmails.includes(normalizedEmail)
    const isOwner = Boolean(isSignedIn && (metadataRole === 'owner' || ownerAllowlistMatch))
    const authStatus = !authReady ? 'loading' : !isSignedIn ? 'guest' : isOwner ? 'owner' : 'user'
    const isAuthenticated = authStatus === 'owner' || authStatus === 'user'
    
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

    const value = useMemo(() => ({
        navigate,
        properties,
      loadingProperties,
      currency,
        user,
      getToken,
      authReady,
      authStatus,
      isAuthenticated,
      isOwner,
        showAgencyReg,
        setShowAgencyReg,
    }), [navigate, properties, loadingProperties, currency, user, getToken, authReady, authStatus, isAuthenticated, isOwner, showAgencyReg]);

  return (
 
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);
