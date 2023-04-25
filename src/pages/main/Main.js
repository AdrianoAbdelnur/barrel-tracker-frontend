import React from 'react'
import './main.css'

const Main = () => {
  return (
    <div className='main_container'>
        <div className='info_container clientColor'>
            <h3>Clients</h3>
        </div>
        <div className='info_container barrelColor'>
            <h3>Barrels</h3>
        </div>
        <div className='info_container productsColor'>
            <h3>Products</h3>
        </div>

    </div>
  )
}

export default Main