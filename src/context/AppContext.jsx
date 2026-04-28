import React,{ createContext, useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
 

const AppContext = createContext();
export const AppContextProvider = ({children}) => {
       
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    const getProperties = () => {
        setProperties(dummyProperties);
    }

    useEffect (() => {
        getProperties();
    }, []);

    const value ={
        navigate,
        properties,
        
    }

  return (
 
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);

const dummyProperties = [];
