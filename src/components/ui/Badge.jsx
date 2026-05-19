import React from 'react'

const variantClasses = {
  success: 'bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/20',
  warning: 'bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/20',
  danger: 'bg-rose-500/12 text-rose-700 ring-1 ring-rose-500/20',
  neutral: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  info: 'bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/20',
}

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant] || variantClasses.neutral} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
