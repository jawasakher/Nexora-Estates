import React from 'react'

const EmptyState = ({ title = 'Nothing here', description = '', className = '' }) => {
  return (
    <div className={`rounded-xl border border-slate-200/60 bg-white/60 p-6 text-center text-slate-700 ${className}`}>
      <h3 className='h4 mb-2'>{title}</h3>
      {description && <p className='text-sm text-slate-500'>{description}</p>}
    </div>
  )
}

export default EmptyState
