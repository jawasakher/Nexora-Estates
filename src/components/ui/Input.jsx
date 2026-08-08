import React from 'react'

const Input = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || props.name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <label htmlFor={inputId} className='block w-full'>
      {label && <span className='mb-2 block text-sm font-semibold text-slate-700'>{label}</span>}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20 disabled:opacity-60 ${className}`}
        {...props}
      />
      {error && <p className='mt-2 text-xs font-medium text-red-600'>{error}</p>}
    </label>
  )
}

export default Input
