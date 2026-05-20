import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import Loader from '../ui/Loader.jsx'

const GateFallback = ({ label }) => (
  <div className='flex min-h-[60vh] items-center justify-center py-20'>
    <div className='rounded-3xl border border-slate-900/10 bg-white px-6 py-5 shadow-sm'>
      <Loader />
      <p className='mt-3 text-sm font-medium text-slate-600'>{label}</p>
    </div>
  </div>
)

const AccessGate = ({ requireRole = 'authenticated' }) => {
  const { authStatus, isAuthenticated, isOwner } = useAppContext()
  const location = useLocation()

  if (authStatus === 'loading') {
    return <GateFallback label='Checking session...' />
  }

  if (requireRole === 'authenticated' && !isAuthenticated) {
    return <Navigate to='/' replace state={{ from: location.pathname }} />
  }

  if (requireRole === 'owner' && !isOwner) {
    return <Navigate to='/' replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default AccessGate