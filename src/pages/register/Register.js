import React, { useEffect, useState } from 'react'
import "./register.css"
import { Button, Form } from 'react-bootstrap'
import Checked from '../../assets/icons/Checked';
import X from '../../assets/icons/X';
import Alerticon from '../../assets/icons/Alerticon'

  const USER_REGEX = /^[A-z][A-z0-9-_]{4,16}$/;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,16}$/;

const Register = () => {

  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [letterInitValidated, setLetterInitValidated]=useState(false);
  const [specialUserValidated, setSpecialUserValidated]=useState(false);
  const [lengthUserValidated, setLengthUserValidated]=useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false); 
  
  
  useEffect(() => {
    setValidName(USER_REGEX.test(userName))
  }, [userName])
  
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])
  

  const handleUserNameChange=(value)=>{
    setUserName(value);
    const letterInit = new RegExp('(^[a-zA-Z])');
    const specialUser = new RegExp('(?=.*[A-z0-9-_])');
    const lengthUser = new RegExp('(?=.{4,16})');

    letterInit.test(value)? 
        setLetterInitValidated(true)
      : setLetterInitValidated(false);
      console.log(letterInitValidated)
        
    specialUser.test(value)
      ? setSpecialUserValidated(true)
      : setSpecialUserValidated(false);

    lengthUser.test(value)
      ? setLengthUserValidated(true)
      : setLengthUserValidated(false);
  
    if (letterInitValidated && specialUserValidated && lengthUserValidated) {
        setValidName(true)
    } else {
        setValidName(false)
    }
  
  };

  return (
    <div className='register_container'>
      <Form className='form_container'>
        <h1>Register</h1>
        <Form.Group className="mb-2" controlId="formBasicName">
            <Form.Label>
              <div>
                <div>
                  User Name:
                </div>
              </div>
            </Form.Label>
            <div className='input_container'>
              <Form.Control 
                type="text" 
                placeholder="User Name"
                value={userName} 
                minLength="5"
                maxLength="16"
                required
                aria-invalid= {validName? "false" : "true"}
                id='userName'
                autoComplete="off"
                onChange={(e) => handleUserNameChange(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <div className={validName ? "validation" : "hide"}>
                  <Checked/>
              </div>
              <div className={validName || !userName ?  "hide" : "validation"}>
                  <X/>
              </div>
            </div>
            <div className={userFocus? "advert_container" : "hide"}>
              <div className='advert_content'>
                <div className={letterInitValidated? "icono" : "hide"}>
                  <Checked/>
                </div>
                <div className={letterInitValidated? "hide" : "icono"}>
                  <Alerticon/>
                </div>
                  Must begin with a letter 
              </div>
              <div className='advert_content'>
                <div className={lengthUserValidated? "icono" : "hide"}>
                  <Checked/>
                </div>
                <div className={lengthUserValidated? "hide" : "icono"}>
                  <Alerticon/>
                </div>
                  At least 5 characters
              </div>
              <div className='advert_content'>
                <div className={specialUserValidated? "icono" : "hide"}>
                  <Checked/>
                </div>
                <div className={specialUserValidated? "hide" : "icono"}>
                  <Alerticon/>
                </div>
                  Letters, numbers, underscores, hyphens allowed.Must begin with a letter 
              </div>
          </div>
            
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <div className='input_container'>
            <Form.Control 
              type="email" 
              placeholder="email"
              aria-invalid= {validEmail? "false" : "true"}
              required
              id='email'
              onChange={(e) => {setEmail(e.target.value)}}
              onFocus={()=>setEmailFocus(true)}
              onBlur={()=>{setEmailFocus(false)}}
              />
            <div className={validEmail ? "validation" : "hide"}>
                  <Checked/>
                </div>
                <div className={validEmail || !email ?  "hide" : "validation"}>
                  <X/>
            </div>
          </div>
          <div className={emailFocus? "advert_container" : "hide"}>
          <div className='advert_content'>
            <div className={validEmail? "icono" : "hide"}>
              <Checked/>
            </div>
            <div className={validEmail? "hide" : "icono"}>
              <Alerticon/>
            </div>
              Please enter a valid email 
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}

export default Register