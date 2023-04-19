import React, { useState } from 'react'
import "./register.css"
import { Button, Form } from 'react-bootstrap'
import Checked from '../../assets/icons/Checked';
import X from '../../assets/icons/X';

const Register = () => {

  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [letterInitValidated, setLetterInitValidated]=useState(false);
  const [specialUserValidated, setSpecialUserValidated]=useState(false);
  const [lengthUserValidated, setLengthUserValidated]=useState(false);

  const handleUserNameChange=(value)=>{
    setUserName(value);
    const letterInit = new RegExp('(^[a-zA-Z])');
    const specialUser = new RegExp('(?=.*[A-z0-9-_])');
    const lengthUser = new RegExp('(?=.{5,16})');

    letterInit.test(value)
      ? setLetterInitValidated(true)
      : setLetterInitValidated(false);
        
    specialUser.test(value)
      ? setSpecialUserValidated(true)
      : setSpecialUserValidated(false);

    lengthUser.test(value)
      ? setLengthUserValidated(true)
      : setLengthUserValidated(false);
  };

  return (
    <div className='register_container'>
      <Form className='form_container'>
        <h1>Register</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              <div className="validInput">
                <div>
                  User Name:
                </div>
                <div className={validName ? "validName" : "hide"}>
                  <Checked/>
                </div>
                <div className={validName || !userName ?  "hide" : "validName"}>
                  <X/>
                </div>
              </div>
            </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="User Name" 
              minLength="5"
              maxLength="16"
              required
              id='userName'
              autoComplete="off"
              onChange={(e) => handleUserNameChange(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}

export default Register