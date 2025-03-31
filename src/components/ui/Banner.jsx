import React from 'react'
import { Link } from 'react-router-dom'

export const Banner = (props) => {
  return (
    <div className='w-screen pt-3' id="newArrival">
        <Link to={props.href}> <img src={props.src} /></Link>
    </div>
  )
}
