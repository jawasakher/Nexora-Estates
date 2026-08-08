import React from 'react'
import { radius, shadow, surface } from '../../styles/theme'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`${radius.card} ${surface.card} ${shadow.soft} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
