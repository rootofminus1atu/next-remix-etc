import React from 'react'
import styles from './AddToCart.module.css'

export const AddToCart = () => {
  return (
  <div className={styles.buttonContainer}>
      <button 
        onClick={() => console.log("added to cart")}
        className='btn btn-primary'
      >
        Click me
      </button>
    </div>
  )
}
