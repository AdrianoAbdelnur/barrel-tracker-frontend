import React, { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap'
import "./header.css"
import logo from "./../../assets/img/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import BurgerButton from '../burger/BurgerButton'


const Header = () => {
  const {auth}=useAuth();
  const [loggedUser, setLoggedUser] = useState({})
  const [openedMenu, setOpenedMenu] = useState(false);
  let navigate = useNavigate();

    useEffect(() => {
      getUserData();
      // eslint-disable-next-line
    }, [])
    

    useEffect(() => {
      if (auth) {
        getUserData();
      }
      // eslint-disable-next-line
    }, [auth]);

    
  const getUserData = async () => {
    try {
      if (loggedUser.name) return;
      const {data} = await axios.get("/user/userData")
      setLoggedUser(data?.userFound)
    } catch (error) {
      navigate("login")
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtoken')
    setLoggedUser({});
    navigate('/login')
  }

  const toggleMenu = () => {
    setOpenedMenu(!openedMenu);
  };


  return (
    <div className='header_container'>
      <div className='responsive_container'>
        <div className='brand_container'>
          <img className="logo" src={logo} alt="logo"/>
          <div className='brand'>Beer-Tech</div>
        </div>
        <BurgerButton className='burgerButton' onClick={toggleMenu} />
      </div>
      {
        !loggedUser.name && <div className={`menu ${openedMenu? 'open' : ''}`}>
          <div className='options_container'>
            <Link to="/login" className='optionButton' onClick={()=>setOpenedMenu(false)}>Login</Link>
            <Link to="/register" className='optionButton' onClick={()=>setOpenedMenu(false)}>Register</Link>  
          </div>
        </div>
      }
      {
        loggedUser.name && <div className={`menu ${openedMenu? 'open' : ''}`}>
          <div className='options_container'>
            <div className='welcome'>Welcome {loggedUser.name}</div>
            <Button variant='danger' onClick={handleLogout} className='logOutButton'>log out</Button>  
          </div>
        </div>
      }
    </div>
  )
}

export default Header