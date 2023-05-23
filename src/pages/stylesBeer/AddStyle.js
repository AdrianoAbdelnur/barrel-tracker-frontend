import React, { useEffect, useState } from 'react'
import "./addStyle.css"
import { Alert, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddStyle = () => {
    let navigate = useNavigate();
    const [style, setStyle] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
            if(message===true)
            navigate("/main")
        }, 3000);
        // eslint-disable-next-line
      }, [message]) 
    

    const handleStyle = async(e) => {
        try {
            e.preventDefault();
            const {data} = await axios.post("http://localhost:4000/api/styles/addNewStyle", { name : style})
            setMessage(true)
            console.log(data)
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
        }
       
    }
  return (
    <div className='addStyle_container'>
        <Form className='form_container_addstyle' onSubmit={handleStyle}>
            <h1>Add New Style</h1>
            {
            (message && !error) && <Alert variant='success'>Style added successfully</Alert>
            }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Style</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter a new style" 
                    autoComplete='off'
                    onChange={(e)=>{setStyle(e.target.value)}}
                    value={style}
                    maxLength="24" 
                    required
                    disabled= {message? true : false}
                />               
            </Form.Group>
            <Button variant="primary" type="submit" disabled= {message? true : false}>
                Add New Style
            </Button>
        </Form>
    </div>
  )
}

export default AddStyle