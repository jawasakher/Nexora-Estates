import React from 'react'

const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-3xl border border-slate-900/10 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default Card
import React from 'react'

const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-3xl border border-slate-900/10 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default Card
