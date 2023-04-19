import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
import "./header.css"
import logo from "./../../assets/img/barrel.png"

const Header = () => {
  return (
    <div className='header_container'>
      <Navbar className='nav' bg="dark" expand="lg" variant='dark'>
      <Container className='container'>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <img className="logo" src={logo} alt="" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>


        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header