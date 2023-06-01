import React from 'react'
import './main.css'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";


const Main = () => {
    let navigate = useNavigate();

    const moveTo = (place) => {
        navigate(place)
    }
    return (
    <div className='main_container'>
        <div className='info_container clientColor'>
            <h3>Customers</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/clientInfo")}>Information</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/barrelsPerCustomer")}>barrels per client</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/addclient")}>Add a new client</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/pay")}>New Pay</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container barrelColor'>
            <h3>Barrels</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/statusInformation")}>Information status</Button>
                    <Button variant='secondary' as={Link} to="/login">barrel per client</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container productsColor'>
            <h3>Products</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/styles")}>Styles</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/prices")}>Prices</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/addStyle")}>Add new style</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container resultsColor'>
            <h3>Results</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/sales")}>Sales</Button>                  
                    <Button variant='secondary' onClick={()=>moveTo("/statusInformation")}>Information</Button>                  
                    <Button variant='secondary' as={Link} to="/login">other</Button>                  
                </ButtonGroup>
            </div>
        </div>

    </div>
  )
}

export default Main