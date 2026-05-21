import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import Loader from '../ui/Loader.jsx'
import Button from '../ui/Button.jsx'

const OwnerAccessDenied = () => (
  <div className='flex min-h-[70vh] items-center justify-center px-4 py-20'>
    <div className='max-w-xl rounded-3xl border border-slate-900/10 bg-white p-8 text-center shadow-sm'>
      <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Owner area</p>
      <h1 className='h2 mb-3'>Owner access required</h1>
      <p className='mb-6 text-slate-600'>This section is reserved for owner accounts. If this should be your dashboard, sign in with the owner account or contact support to update access.</p>
      <div className='flex flex-wrap justify-center gap-3'>
        <Button variant='secondary' onClick={() => window.location.assign('/contact')}>
          Contact Us
        </Button>
      </div>
    </div>
  </div>
)

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
    return <OwnerAccessDenied />
  }

  return <Outlet />
}

export default AccessGate