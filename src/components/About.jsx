import { React, useEffect } from 'react'
import { GridBanner } from './GridBanner'

export const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  })

  return (
    <>
      <div className="p-6 w-screen h-fit text-left">
        <h1 className="py-5 text-amber-800 font-medium">Our Story – <span className="italic"> The Art of Elegance</span></h1>
        <div className="text-amber-700">
          <p>In a world where fashion is fleeting, Clayo was born to create something timeless. More than just clothing, we craft experiences—woven with precision, passion, and purpose.</p>

          <p>What started as a vision to redefine luxury soon became a movement. We believe that true elegance lies in the details, and that’s why every stitch, fabric, and design at Clayo is a masterpiece in itself.</p>

          <p>With <span className="italic">"Luxury in Every Stitch,"</span> we bring you not just apparel but a reflection of confidence, grace, and individuality. Our creations tell stories—of sophistication, exclusivity, and the art of fine craftsmanship.</p>

          <p>Join us in stepping into a world where fashion meets legacy, where every piece is designed to make you feel exceptional. Because at Clayo, luxury isn’t just worn—it’s lived.</p>
        </div>
      </div>
      <GridBanner />
    </>
  )
}
