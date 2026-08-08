import React from 'react'

const SectionTitle = ({ eyebrow, title, description, className = '' }) => {
  return (
    <div className={className}>
      {eyebrow && <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>{eyebrow}</p>}
      {title && <h2 className='h2 mb-3'>{title}</h2>}
      {description && <p className='max-w-2xl text-slate-600'>{description}</p>}
    </div>
  )
}

export default SectionTitle
