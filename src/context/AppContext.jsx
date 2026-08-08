import React,{ createContext, useContext, useEffect, useMemo, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from "@clerk/clerk-react"
import { useQuery } from '@tanstack/react-query'
import { getProperties as fetchProperties } from '../services/properties.js'
import { envConfig } from '../config/env.js'

const AppContext = createContext();


export const AppContextProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY ?? '$'
    const navigate = useNavigate();
    const { isLoaded: authLoaded, isSignedIn, getToken } = useAuth()
    const { isLoaded: userLoaded, user } = useUser() ?? {};
    const [showAgencyReg, setShowAgencyReg] = useState(false);
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
    
    const propertiesQuery = useQuery({
      queryKey: ['properties', 'public'],
      queryFn: async () => {
        const result = await fetchProperties({ getToken })
        return Array.isArray(result?.data) ? result.data : []
      },
      staleTime: 60 * 1000,
    })

    const properties = propertiesQuery.data ?? []
    const loadingProperties = propertiesQuery.isLoading || propertiesQuery.isFetching

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
