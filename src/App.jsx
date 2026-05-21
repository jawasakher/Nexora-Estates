import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AgencyReg from './components/AgencyReg'
import { useAppContext } from './context/AppContext.jsx'
import Loader from './components/ui/Loader.jsx'
import AccessGate from './components/auth/AccessGate.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const Home = lazy(() => import('./pages/Home'))
const Listing = lazy(() => import('./pages/Listing'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const Sidebar = lazy(() => import('./components/owner/Sidebar.jsx'))
const Dashboard = lazy(() => import('./pages/owner/Dashboard.jsx'))
const AddProperty = lazy(() => import('./pages/owner/AddProperty.jsx'))
const Listproperty = lazy(() => import('./pages/owner/Listproperty.jsx'))


const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');
  const {showAgencyReg} = useAppContext()
  
  return (
    <main>
      <ScrollToTop />
      { !isOwnerPath && <Header/>}
      { !isOwnerPath && showAgencyReg && <AgencyReg/> }
      <Suspense fallback={<div className='flex min-h-[60vh] items-center justify-center py-20'><Loader /></div>}>
      <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/listing' element={<Listing/>}/>
          <Route path='/listing/:id' element={<PropertyDetails/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route element={<AccessGate requireRole='authenticated' />}>
            <Route path='/my-bookings' element={<MyBookings/>}/>
          </Route>
          <Route element={<AccessGate requireRole='owner' />}>
            <Route path='/owner' element={<Sidebar/>} >
              <Route index element={<Dashboard/>}/>
              <Route path='add-property' element={<AddProperty/>}/>
              <Route path='list-property' element={<Listproperty/>}/>
            </Route>
          </Route>
      </Routes>
      </Suspense>
      { !isOwnerPath && <Footer/> }
    </main>
  )
}

export default App
