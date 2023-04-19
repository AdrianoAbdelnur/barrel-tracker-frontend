import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div className='layout_container'>
        <Header/>
            {children}
        <Footer/>
    </div>
  )
}

export default Layout