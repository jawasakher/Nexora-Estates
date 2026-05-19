import React from 'react'
import { radius, shadow, surface } from '../../styles/theme'

const Card = ({ children, className = '' }) => {
  return (
    <div className={`${radius.card} ${surface.card} ${shadow.soft} ${className}`}>
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
