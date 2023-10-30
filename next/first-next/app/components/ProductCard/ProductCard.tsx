'use client'
import React from 'react'
import { AddToCart } from '../AddToCard/AddToCart'



const ProductCard = () => {
  return (
    <div className='p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500'>
      <h3 className='text-red-900 font-sans font-bold'>product 1</h3>
      <AddToCart />
    </div>
  )
}

export default ProductCard