import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import './addClient.css'
import axios from './../../../api/axios'
import { useNavigate } from 'react-router-dom'
import Autocomplete from "react-google-autocomplete";


const AddClient = () => {
    let navigate = useNavigate();
    const [error, setError] = useState("")
    const [clientData, setClientData] = useState()
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null })

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])

    useEffect(() => {
        setTimeout(() => {
            if (clientData) {
                navigate("/main")
            }
        }, 3000);
        // eslint-disable-next-line
    }, [clientData])

    const handelAddClient = async (e) => {
        e.preventDefault();
        const clientData = {};
        for (const target of e.target) {
            if (target.name !== "submit") {
                clientData[target.name] = target.value;
                target.value = "";
            }
        }
        clientData.coordinates = coordinates;
        setCoordinates({ lat: null, lng: null })
        try {
            const { data } = await axios.post('/client/addClient', clientData)
            setClientData(data)
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    const handleAddress = (place) => {
        setCoordinates({lat: place.geometry.location.lat() , lng: place.geometry.location.lng()})
    }

    return (
        <div className='addClients_container'>
            <Form className='form_container_client' onSubmit={handelAddClient}>
                <h2>New Customer</h2>
                {
                    error && <Alert variant='danger'>{error}</Alert>
                }
                {
                    (clientData && !error) && <Alert variant='success'>Client added successfully</Alert>
                }
                <Row>
                    <Col lg="6">
                        <Form.Group className="mb-3" controlId="barName">
                            <Form.Label>Bar's name (requiresd)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bar's name"
                                required
                                name="barName" />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group className="mb-3" controlId="ownerName">
                            <Form.Label>Owner's name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name"
                                name="owner"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <Form.Group className="mb-3" controlId="managerName">
                            <Form.Label>Manager's name (required)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name"
                                required
                                name="barManager"
                            />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <div className='mb-2'>Address (required)</div>
                        <Autocomplete
                            name='location'
                            placeholder='Address'
                            className='form-control'
                            apiKey={process.env.REACT_APP_API_KEY}
                            onPlaceSelected={(place) => handleAddress(place)}
                            options={{
                                types: ["address"],
                                componentRestrictions: { country: "ar" },
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Bar's email address (required)</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className='w-100 d-flex justify-content-center'>
                    <Button name="submit" variant="primary" className='mt-3 w-50' type="submit">
                        Add client
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddClient