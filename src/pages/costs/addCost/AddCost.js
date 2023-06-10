import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import "./addCost.css"
import axios from 'axios'

const AddCost = () => {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }, [message])
    
    

    const handleSubmit= async(e) => {
        e.preventDefault();
        const costData = {}
        for (const target of e.target) {
            if (target.type !== "submit") {
                console.log(target.type)
                costData[target.name] = target.value
                target.value = "";
            }
        }
        try {
            const {data} = await axios.post('http://localhost:4000/api/cost/addNewCost', costData)
            setMessage(data.message)
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }
  return (
    <div className='addCost_container'>
        <Form className="form_container_cost" onSubmit={handleSubmit}>
            <h2>New client</h2>
            {
                error && <Alert variant='danger'>{error}</Alert>
            }
            {
                (message && !error) && <Alert variant='success'>{message}</Alert>
            }
            <Form.Group className="mb-3" controlId="item">
                <Form.Label>item</Form.Label>
                <Form.Control type="text" placeholder="Enter the item" name='item'/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="center-cost">
            <Form.Label>Cost Center</Form.Label>
                <Form.Select aria-label="Default select example" name='costCenter'>
                    <option>Center Cost</option>
                    <option value="Production">Production</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="supplier">
                <Form.Label>Supplier</Form.Label>
                <Form.Control type="text" placeholder="Enter the Supplier" name='supplier'/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="pay">
                <Form.Label>Pay</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="amount" 
                    required
                    name='cost'
                />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>

    </div>
  )
}

export default AddCost