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
                    <Button variant='secondary' onClick={()=>moveTo("/clientInfo")}>Customers information</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/barrelsPerCustomer")}>barrels per customer</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/addclient")}>Add a new customer</Button>
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
                    <Button variant='secondary' onClick={()=>moveTo("/recipes")}>Recipes</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container costsColor'>
            <h3>Sales and Costs</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/sales")}>Sales details</Button>
                    <Button variant='secondary' onClick={()=>moveTo("/costDetails")}>Costs details</Button>                  
                    <Button variant='secondary' onClick={()=>moveTo("/addCost")}>Add a new Cost</Button>                  
                    <Button variant='secondary' as={Link} to="/login">other</Button>                  
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container othersColor'>
            <h3>Others</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/suppliers")}>Add Suppliers</Button>                  
                    <Button variant='secondary' as={Link} to="/login">other</Button>                  
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container resultsColor'>
            <h3>Results</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' onClick={()=>moveTo("/")}>Information</Button>                  
                    <Button variant='secondary' as={Link} to="/login">other</Button>                  
                </ButtonGroup>
            </div>
        </div>
    </div>
  )
}

export default Main