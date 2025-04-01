import React from 'react'
import {Banner} from './ui/Banner'
import { GridBanner } from './GridBanner'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
    <div id='home' className='w-screen h-screen bg-[url(/bg.png)] bg-cover bg-center flex flex-col justify-center items-center gap-6'>
        <span className=' text-white font-extrabold text-8xl font-serif'>Luxury in Every Stitch.</span>
        <p className='text-white text-xl font-serif'>Step into a world of high-end fashion where every piece tells a story of elegance and exclusivity.</p>
        <button onClick={()=>(navigate("/new-arrivals"))}>Shop Now</button>
    </div>
    <Banner href="/new-arrivals" src="2.jpg"/>
    <GridBanner/>
    <Banner href="/" src="1.png"/>
    </>
  )
}
