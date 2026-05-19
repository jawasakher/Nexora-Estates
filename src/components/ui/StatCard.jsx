import React from 'react'
import { radius, shadow, surface, spacing } from '../../styles/theme'

const StatCard = ({ icon, value, label, className = '' }) => {
  return (
    <div className={`flexStart gap-5 ${radius.section} ${surface.card} ${shadow.soft} ${spacing.card} ${className}`}>
      {icon ? <img src={icon} alt="" className='hidden sm:flex w-8' /> : null}
      <div>
        <h4 className='h4'>{value}</h4>
        <h5 className='h5 text-secondary'>{label}</h5>
      </div>
    </div>
  )
}

export default StatCard
