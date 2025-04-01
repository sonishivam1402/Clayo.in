import React from 'react'

export const Filter = () => {
  return (
    <div className='w-1/5 h-screen bg-white'>
        <span>Categories</span>
        <input type="checkbox" id="category" name="men" value="Men"/>
        <label for="men">Men</label><br/>        
        <input type="checkbox" id="category" name="women" value="Women"/>
        <label for="men">Women</label><br/>
        <input type="checkbox" id="category" name="kids" value="Kid"/>
        <label for="men">Kids</label><br/>
    </div>
  )
}
