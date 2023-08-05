import { Alert, Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import "./../register/register.css"
import axios from './../../api/axios';
import Checked from '../../assets/icons/Checked';
import Alerticon from '../../assets/icons/Alerticon';
import { useEffect } from 'react';
import EyeOff from '../../assets/icons/EyeOff';
import EyeCheck from '../../assets/icons/EyeCheck';
import { useLocation, useNavigate } from 'react-router-dom';
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /.{6,16}$/;



export const Login = () => {

  const [email, setEmail] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [validEmail, setValidEmail] = useState("")
  
  const [password, setPassword] = useState("")
  const [pwdFocus, setPwdFocus] = useState(false)
  const [validPwd, setValidPwd] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const [error, setError] = useState("")

  const Navigate= useNavigate();
  const location= useLocation();
  const from = location.state?.from?.pathname+location.state?.from?.hash || '/';

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password))
  }, [password])
  
  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 3000);
  }, [error])
  
  
  const handleLogin = async(e) => {    
    try {
      e.preventDefault();
      const {data} = await axios.post("/user/login", {email, password});
      localStorage.setItem('jwtoken', data?.token);
      setEmail("");
      setPassword("");
      Navigate(from, {replace: true});
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className='register_container'>
        <Form className="form_container" onSubmit={handleLogin} >
          <h1>Login</h1>
          {
            error && <Alert variant='danger'>{error}</Alert>
          }
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="user@mail.com"
              autoComplete='off'
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              maxLength="24"
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <div className={emailFocus? "advert_container" : "hide"}>
            <div className='advert_content'>
                <div className={validEmail? "icono" : "hide"}>
                  <Checked/>
                </div>
                <div className={validEmail? "hide" : "icono"}>
                  <Alerticon/>
                </div>
                  Must to be a valid email
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className='input_container_register'>
              <Form.Control 
                type={showPwd? "text" : "password"} 
                placeholder="Password"
                autoComplete='off'
                onChange={(e)=>setPassword(e.target.value)}
                maxLength="24"
                onFocus={()=>setPwdFocus(true)}
                onBlur={()=>setPwdFocus(false)} 
                />
              <div className={showPwd? "hide" : "eye"} onClick={()=>setShowPwd(true)}>
                  <EyeOff/>
                </div>
                <div className={showPwd? "eye" : "hide"} onClick={()=>setShowPwd(false)}>
                  <EyeCheck/>
              </div>
            </div>
            <div className={pwdFocus && !validPwd? "advert_container" : "hide"}>
            <div className='advert_content'>
                <div className={validPwd? "hide" : "icono"}>
                  <Alerticon/>
                </div>
                  Must to have at least 6 characters
              </div>
            </div>
          </Form.Group>
          <Button className='buttonSubmit' type="submit" disabled={validEmail&&validPwd? false : true}>
            Submit
          </Button>
        </Form>
      </div>  
  )
}

export default Login