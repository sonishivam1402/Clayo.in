import React from 'react'

export const Banner = (props) => {
  return (
    <div className='w-screen' id="newArrival">
        <a href={props.href}> <img src={props.src} /></a>
    </div>
  )
}
