import React, { useEffect, useState } from 'react'
import "./register.css"
import { Button, Form } from 'react-bootstrap'
import Checked from '../../assets/icons/Checked';
import X from '../../assets/icons/X';
import Alerticon from '../../assets/icons/Alerticon'


  const USER_REGEX = /^[A-z][A-z0-9-_]{4,16}$/;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{6,16}$/;

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

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [letterValidated, setLetterValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);;
  const [lengthValidated, setLengthValidated]=useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("")
  const [validPwdConfirm, setValidPwdConfirm] = useState(false)
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false)
  
  
  useEffect(() => {
    setValidName(USER_REGEX.test(userName))
  }, [userName])
  
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password))
  }, [password])
  
  useEffect(() => {
    if (pwdConfirm === password) {
      setValidPwdConfirm(true)
    } else setValidPwdConfirm(false)
  }, [pwdConfirm, password])
  

  const handleUserNameChange=(value)=>{
    setUserName(value);
    const letterInit = new RegExp('(^[a-zA-Z])');
    const specialUser = new RegExp('(?=.*[A-z0-9-_])');
    const lengthUser = new RegExp('(?=.{5,16})');

    letterInit.test(value)? 
        setLetterInitValidated(true)
      : setLetterInitValidated(false);
      console.log(letterInitValidated)
        
    specialUser.test(value)? 
        setSpecialUserValidated(true)
      : setSpecialUserValidated(false);

    lengthUser.test(value)? 
        setLengthUserValidated(true)
      : setLengthUserValidated(false);
  
    if (letterInitValidated && specialUserValidated && lengthUserValidated) {
        setValidName(true)
    } else {
        setValidName(false)
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value)
    const letter = new RegExp('(?=.*[A-z])');
    const number = new RegExp('(?=.*[0-9])');
    const length = new RegExp('(?=.{6,16})');
    
    letter.test(value)?
        setLetterValidated(true)
      : setLetterValidated(false)

    number.test(value)?
        setNumberValidated(true)
      : setNumberValidated(false)

    length.test(value)?
        setLengthValidated(true)
      : setLengthValidated(false)


  
  }



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
              placeholder="email"
              type="email" 
              id='email'
              autoComplete='off'
              onChange={(e) => {setEmail(e.target.value)}}
              maxLength="24"
              required
              aria-invalid= {validEmail? "false" : "true"}
              aria-describedby="emailnote"
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
            <div className='input_container'>
              <Form.Control 
                placeholder="Password" 
                type="password" 
                id='pwd'
                onChange={(e) => handlePasswordChange(e.target.value)}
                minLength="5"
                maxLength="16"
                required
                aria-invalid= {validPwd? "false" : "true"}
                aria-describedby="pwdnote"
                autoComplete="off"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                />
              <div className={validPwd ? "validation" : "hide"}>
                  <Checked/>
                </div>
                <div className={validPwd || !password ?  "hide" : "validation"}>
                  <X/>
              </div>
              </div>
              <div className={pwdFocus? "advert_container" : "hide"}>
                <div className='advert_content'>
                  <div className={letterValidated? "icono" : "hide"}>
                    <Checked/>
                  </div>
                  <div className={letterValidated? "hide" : "icono"}>
                    <Alerticon/>
                  </div>
                    At least a letter 
                </div>
                <div className='advert_content'>
                  <div className={numberValidated? "icono" : "hide"}>
                    <Checked/>
                  </div>
                  <div className={numberValidated? "hide" : "icono"}>
                    <Alerticon/>
                  </div>
                    At least a number 
                </div>
                <div className='advert_content'>
                  <div className={lengthValidated? "icono" : "hide"}>
                    <Checked/>
                  </div>
                  <div className={lengthValidated? "hide" : "icono"}>
                    <Alerticon/>
                  </div>
                    At least 6 characters 
                </div>
              </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <div className='input_container'>
          
            <Form.Control 
              type="password" 
              placeholder="Confirm Password"
              id='pwdConfirm'
              autoComplete='off'
              onChange={(e) => setPwdConfirm(e.target.value)}
              minLength="5"
              maxLength="16"
              required
              aria-describedby="pwdConfirmnote"
              onFocus={() => setPwdConfirmFocus(true)}
              onBlur={() => setPwdConfirmFocus(false)}
            />
            <div className={validPwdConfirm ? "validation" : "hide"}>
                <Checked/>
          </div>
            <div className={validPwdConfirm || !pwdConfirm ?  "hide" : "validation"}>
                <X/>
            </div>
            </div>
            <div className={pwdConfirmFocus? "advert_container" : "hide"}>
                  <div className='advert_content'>
                    <div className={validPwdConfirm? "icono" : "hide"}>
                      <Checked/>
                    </div>
                    <div className={validPwdConfirm? "hide" : "icono"}>
                      <Alerticon/>
                    </div>
                    Must match the first password input field.
                  </div>
                </div>
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div>
  )
}

export default Register