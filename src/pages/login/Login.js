import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import "./login.css"
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /.{6,16}$/;


export const Login = () => {
  const [email, setEmail] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [validEmail, setValidEmail] = useState("")
  
  const [pwd, setPwd] = useState("")
  
  



  return (
    <div className='login_container'>
        <Form className="form_container" >
          <h1>Login</h1>
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>  
  )
}

export default Login