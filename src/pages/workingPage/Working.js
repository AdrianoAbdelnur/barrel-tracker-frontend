import React from 'react'
import './workingPage.css'
import sleeping from './../../assets/img/sleeping.jpg'
import { Image } from 'react-bootstrap'

const Working = () => {
  return (
    <div className='workingPage_container'>
        <div className='information_container'>
            <h1>Page under construction</h1>
            <h3>We are working in this page</h3>
            <Image src={sleeping} className='workingImage' rounded />
        </div>
    </div>
  )
}

export default Working