import React from 'react'

const loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 lg:h-12 lg:w-12 border-t-2 border-l-2 border-primary-green rounded-full animate-spin"></div>
    </div>
  )
}

export default loading
