import React from 'react'

export const Hero = () => {
  return (
    <div id='home' className='w-screen h-screen bg-[url(/bg.png)] bg-cover bg-center flex flex-col justify-center items-center gap-6'>
        <span className=' text-white font-extrabold text-8xl font-serif'>Luxury in Every Stitch.</span>
        <p className='text-white text-xl font-serif'>Step into a world of high-end fashion where every piece tells a story of elegance and exclusivity.</p>
        <button>Shop Now</button>
    </div>
  )
}
