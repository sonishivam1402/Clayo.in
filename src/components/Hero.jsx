import React from 'react'
import { Banner } from './ui/Banner'
import { GridBanner } from './GridBanner'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="home" class="relative w-screen h-screen overflow-hidden">

        <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div class="relative z-10 flex flex-col justify-center items-center gap-6 w-full h-full bg-black/50">
          <span class="text-white font-extrabold text-8xl font-serif text-center">Luxury in Every Stitch.</span>
          <p class="text-white text-xl font-serif text-center">
            Step into a world of high-end fashion where every piece tells a story of elegance and exclusivity.
          </p>
          <button class="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      <Banner href="/new-arrivals" src="2.jpg" />
      <GridBanner />
      <Banner href="/" src="1.png" />
    </>
  )
}
