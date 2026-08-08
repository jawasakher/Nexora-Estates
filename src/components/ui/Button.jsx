import React from 'react'

const variantClasses = {
  primary: 'bg-linear-to-r from-secondary to-tertiary text-slate-950 shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/25',
  secondary: 'bg-white text-slate-950 ring-1 ring-slate-900/10 hover:bg-slate-50',
  dark: 'bg-slate-950 text-white hover:bg-slate-800',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  type = 'button',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

export default Button
