import React, { useEffect, useState } from 'react'
import './suppliers.css'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import axios from './../../../api/axios'
import { useNavigate } from 'react-router-dom'

const AddSupplier = () => {
    let navigate = useNavigate();
    const [supplierData, setSupplierData] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
          setError("")
        }, 3000);
      }, [error])
  
      useEffect(() => {
        setTimeout(() => {
          if(supplierData){
              navigate("/main")
          }
        }, 3000);
        // eslint-disable-next-line
      }, [supplierData])


    const handleAddSupplier = async(e) => {
        e.preventDefault();
        const supplierData = {};
        for(const target of e.target) {
            if (target.name !== "submit") {
                supplierData[target.name] = target.value;
                target.value="";
            }
        }
        
         try {
            const {data} = await axios.post('/supplier/addSupplier', supplierData)
            setSupplierData(data)
        } catch (error) {
            setError(error?.response?.data?.message)
        } 
    }

  return (
    <div className='supplier_container'>
        <Form className='form_container_supplier' onSubmit={handleAddSupplier}>
            <h2>Suppliers</h2>
            {
                error && <Alert variant='danger'>{error}</Alert>
            }
            {
                (supplierData && !error) && <Alert variant='success'>Client added successfully</Alert>
            } 
            <Row>
                <Col lg="6">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Supplier's name (required)</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Supplier name" 
                        required
                        name="name"/>
                </Form.Group>
            </Col>
                <Col lg="6">
                <Form.Group className="mb-3" controlId="contact">
                    <Form.Label>Contact name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Contact name"
                        name="contactName"
                    />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                <Form.Group className="mb-3" controlId="whatsapp">
                    <Form.Label>Whatsapp (required)</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Supplier's whatsapp" 
                        required
                        name="whatsapp"
                    />
                </Form.Group>
            </Col>
                <Col lg="6">
                <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Address (required)</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Supplier's location" 
                        required
                        name="location"
                    />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>email address (required)</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            required
                            name="email"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className='w-100 d-flex justify-content-center'>
                <Button name="submit" variant="primary"  className='mt-3 w-50' type="submit">
                    Add client
                </Button>
            </div>
        </Form>

    </div>
  )
}

export default AddSupplier