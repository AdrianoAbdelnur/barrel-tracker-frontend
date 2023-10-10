import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect, Modal } from 'react-bootstrap'
import axios from '../../../api/axios'
import DatePicker from "react-datepicker";
import './productions.css'

const AddProductionModal = ({ show, setShow }) => {
    const [styles, setStyles] = useState([])
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        if (show) {
            handleGetStyles()
        }
    }, [show])

    const handleClose = () => {
        setShow(false)
    }


    const handleGetStyles = async () => {
        try {
            const { data } = await axios("/styles/getStyles")
            setStyles(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddProduction = async (e) => {
        e.preventDefault()
        const payload = {
            style: e.target[1].value,
            date: startDate
        }
        console.log(payload)
        const { data } = await axios.post("/production/newProduction", payload)
        console.log(data)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddProduction}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Production date</Form.Label>
                        <DatePicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className='form-control'
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Style</Form.Label>
                        <FormSelect id="capacity" required>
                            <option>Select a Style</option>
                            {styles.map((style) => {
                                return (
                                    <option value={style._id} key={style.name}>{style.name}</option>
                                )
                            })}
                        </FormSelect>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddProductionModal