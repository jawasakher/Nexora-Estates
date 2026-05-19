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
