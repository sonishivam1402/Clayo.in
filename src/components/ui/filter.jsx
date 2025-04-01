import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

export const Filter = (props) => {

  const [filterData, setFilterData] = useState();

  const handleChange = (e) => {
    setFilterData(e.target.value)
    {props.handleFilter(e.target.value)}
  }
  

  return (
    <div className='p-6 sm:w-200 w-80 h-fit bg-white border-2 border-amber-900 rounded-2xl text-amber-700'>
      <div className='flex justify-between items-center text-2xl  font-medium'>
        <span>Filters</span>
        <RxCross2 className='hover:cursor-pointer' onClick={props.close} />
      </div>
      <hr className='py-1' />

      <div className="py-2 ">
        <span className='text-xl font-medium'>Categories</span>
        <div className='flex gap-2'>
          <input type="checkbox" id="category" name="men" value="category/men's clothing" onChange={handleChange}/>
          <label htmlFor="men">Men</label><br />
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id="category" name="women" value="category/women's clothing" onChange={handleChange}/>
          <label htmlFor="men">Women</label><br />
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id="category" name="kids" value="Kid" />
          <label htmlFor="men">Kids</label><br />
        </div>
      </div>

    </div>
  )
}
