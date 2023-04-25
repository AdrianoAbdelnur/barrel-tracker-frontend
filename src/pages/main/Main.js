import React from 'react'
import './main.css'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Main = () => {
    return (
    <div className='main_container'>
        <div className='info_container clientColor'>
            <h3>Clients</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' as={Link} to="/login">Information</Button>
                    <Button variant='secondary'as={Link} to="/login">Sales</Button>
                    <Button variant='secondary'as={Link} to="/login">barrels per client</Button>
                    <Button variant='secondary'as={Link} to="/login">Add new client</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container barrelColor'>
            <h3>Barrels</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' as={Link} to="/login">Information status</Button>
                    <Button variant='secondary' as={Link} to="/login">barrel per client</Button>
                    <Button variant='secondary' as={Link} to="/login">Change barrel status</Button>
                    <Button variant='secondary' as={Link} to="/login">Add new barrel</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container productsColor'>
            <h3>Products</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' as={Link} to="/login">Styles</Button>
                    <Button variant='secondary' as={Link} to="/login">Prices</Button>
                    <Button variant='secondary' as={Link} to="/login">Add new style</Button>
                </ButtonGroup>
            </div>
        </div>
        <div className='info_container resultsColor'>
            <h3>Results</h3>
            <div className='buttons_container'>
                <ButtonGroup vertical className='w-75'>
                    <Button variant='secondary' as={Link} to="/login">Information</Button>                  
                </ButtonGroup>
            </div>
        </div>

    </div>
  )
}

export default Main