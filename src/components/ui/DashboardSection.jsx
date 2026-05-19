import React from 'react'
import { radius, shadow, surface, spacing } from '../../styles/theme'

const DashboardSection = ({ title, description, actions, children, className = '' }) => {
  return (
    <section className={`${radius.section} ${surface.card} ${shadow.soft} ${className}`}>
      {(title || description || actions) && (
        <div className={`flex flex-wrap items-start justify-between gap-3 border-b border-slate-900/10 ${spacing.card}`}>
          <div>
            {title && <h3 className='h3'>{title}</h3>}
            {description && <p className='mt-1 text-sm text-slate-600'>{description}</p>}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>
      )}
      <div>{children}</div>
    </section>
  )
}

export default DashboardSection
