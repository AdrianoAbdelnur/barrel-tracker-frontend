import React, { useEffect, useState } from 'react'
import "./addStyle.css"
import { Alert, Button, Form } from 'react-bootstrap'
import axios from './../../../api/axios'
import { useNavigate } from 'react-router-dom'

const AddStyle = () => {
    let navigate = useNavigate();
    const [style, setStyle] = useState("")
    const [price, setPrice] = useState()
    const [error, setError] = useState("")
    const [message, setMessage] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
            setError("")
            if(message===true) navigate("/main")
        }, 3000);
        // eslint-disable-next-line
      }, [message, error]) 
    

    const handleStyle = async(e) => {
        try {
            e.preventDefault();
            if (price) {
                await axios.post("/styles/addNewStyle", { name : style, price: price})
            } else await axios.post("/styles/addNewStyle", { name : style})
            setMessage(true) 
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
        }
       
    }
  return (
    <div className='addStyle_container'>
        <Form className='form_container_addstyle' onSubmit={handleStyle}>
            <h2>Add New Style</h2>
            {
                (message && !error) && <Alert variant='success'>Style added successfully</Alert>
            }
            {
                (error) && <Alert variant='danger'>{error}</Alert>
            }
            <Form.Group className="mb-3" controlId="Style">
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
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter the price" 
                    autoComplete='off'
                    onChange={(e)=>{setPrice(e.target.value)}}
                    value={price}
                    maxLength="24" 
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