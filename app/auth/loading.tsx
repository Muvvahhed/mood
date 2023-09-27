// import './styles.css'import React from 'react'

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white/80 dark:bg-[#09090b]">
      <div className="w-20 h-20 lg:h-12 lg:w-12 border-t-2 border-l-2 border-primary-green rounded-full animate-spin"></div>
    </div>
  )
}

export default loading
