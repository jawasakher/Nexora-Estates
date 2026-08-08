import React from 'react'

const Loader = ({ size = 36, className = '' }) => {
  return (
    <div className={`flexCenter p-4 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle cx="25" cy="25" r="20" stroke="#cbd5e1" strokeWidth="5" fill="none" />
        <path d="M45 25a20 20 0 00-20-20" stroke="#0ea5a4" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export default Loader
