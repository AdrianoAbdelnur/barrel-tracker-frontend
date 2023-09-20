import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'

import './burgerButton.css'

const BurgerButton = ({onClick}) => {
  return (
    <button className='burgerButton' onClick={onClick}>
        <GiHamburgerMenu size={30} />
    </button>
  )
}

export default BurgerButton