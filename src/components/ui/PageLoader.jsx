import React from 'react'

const PageLoader = ({ title }) => {
  return (
    <div className="  bg-white-10 backdrop-blur-md">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Title */}
      <p className="mt-4 text-amber-800 text-xl">{title}</p>
      </div>
    </div>
  )
}

export default PageLoader
