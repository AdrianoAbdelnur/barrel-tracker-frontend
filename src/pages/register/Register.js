import React, { useEffect, useState } from 'react'
import "./register.css"
import { Alert, Button, Form } from 'react-bootstrap'
import Checked from '../../assets/icons/Checked';
import X from '../../assets/icons/X';
import Alerticon from '../../assets/icons/Alerticon'
import CheckedInput from '../../assets/icons/CheckedInput';
import EyeOff from '../../assets/icons/EyeOff';
import EyeCheck from '../../assets/icons/EyeCheck';
import axios from 'axios';


  const USER_REGEX = /^[A-z][A-z0-9-_]{4,16}$/;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{6,16}$/;

const Register = () => {

  const [error, setError] = useState("");

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
  const [showPwd, setShowPwd] = useState(false)
  
  
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
    if (pwdConfirm === password && password.length > 5) {
      setValidPwdConfirm(true)
    } else setValidPwdConfirm(false)
  }, [pwdConfirm, password])

  useEffect(() => {
    setTimeout(() => {
      setError("")
    }, 3000);
  }, [error])
  
  

  const handleUserNameChange = (value) => {
    setUserName(value);
    const letterInit = new RegExp('(^[a-zA-Z])');
    const specialUser = new RegExp('(?=.*[A-z0-9-_])');
    const lengthUser = new RegExp('(?=.{5,16})');

    letterInit.test(value)? 
        setLetterInitValidated(true)
      : setLetterInitValidated(false);
        
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

  const handlesubmit = async(e) => {
    e.preventDefault();
    const payload = {}
    payload.name = userName;
    payload.email = email;
    payload.password = password
      try {
        await axios.post("http://localhost:4000/api/user/register", payload);
        setUserName("");
        setEmail("");
        setPassword("");
        setPwdConfirm("");
        handleUserNameChange("");
        handlePasswordChange("");
      } catch (error) {
        console.log(error.response.data.message || error)
        setError(error.response.data.message || error)
      }
  }


  return (
    <div className='register_container'>
      <Form className='form_container' onSubmit={handlesubmit}>
        <h1>Register</h1>
        {
          error.message && <Alert variant='danger'>{error.message}</Alert>
        }
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
                controlid="userName"
                autoComplete="off"
                onChange={(e) => handleUserNameChange(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <div className={validName ? "validation" : "hide"}>
                  <CheckedInput/>
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
              value={email}
              controlid='email'
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
                  <CheckedInput/>
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
                type={showPwd? "text" : "password"}
                value={password} 
                controlid='pwd'
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
              <div className={showPwd? "hide" : "eye"} onClick={()=>setShowPwd(true)}>
                <EyeOff/>
              </div>
              <div className={showPwd? "eye" : "hide"} onClick={()=>setShowPwd(false)}>
                <EyeCheck/>
              </div>
              <div className={validPwd ? "validation" : "hide"}>
                  <CheckedInput/> 
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
              type={showPwd? "text" : "password"} 
              placeholder="Confirm Password"
              value={pwdConfirm}
              controlid='pwdConfirm'
              autoComplete='off'
              onChange={(e) => setPwdConfirm(e.target.value)}
              minLength="5"
              maxLength="16"
              required
              aria-describedby="pwdConfirmnote"
              onFocus={() => setPwdConfirmFocus(true)}
              onBlur={() => setPwdConfirmFocus(false)}
            />
            <div className={showPwd? "hide" : "eye"} onClick={()=>setShowPwd(true)}>
                <EyeOff/>
              </div>
              <div className={showPwd? "eye" : "hide"} onClick={()=>setShowPwd(false)}>
                <EyeCheck/>
            </div>
            <div className={validPwdConfirm && validPwd ? "validation" : "hide"}>
                <CheckedInput/>
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
        <div className='w-100 d-flex justify-content-center'>
          <Button 
            className='mt-3 w-50' 
            variant="primary" 
            type="submit"
            disabled={validName && validEmail && validPwd && validPwdConfirm ? false : true}
            >
            Sign up
          </Button>
        </div>
      </Form>

    </div>
  )
}

export default Register
