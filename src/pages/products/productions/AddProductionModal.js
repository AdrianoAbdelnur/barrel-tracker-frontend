import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect, Modal } from 'react-bootstrap'
import axios from '../../../api/axios'
import DatePicker from "react-datepicker";
import './productions.css'

const AddProductionModal = ({ show, setShow, setNewProduction, setErrorMessage }) => {
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
        let style = "";
        for (const option of e.target[1]) {
            if(option.selected === true) {
                style = option.label;
            }
            
        }
        const payload = {
            style: e.target[1].value,
            date: startDate
        }
        console.log(payload)
        const { data } = await axios.post("/production/newProduction", payload)
        if (data.message === 'Production added successfully') {
            setNewProduction(data.newProduction)
            handleGetRecipe(style)
        }
    }

    const handleGetRecipe = async(style) => {
        try {
            const {data} = await axios("/recipe/getRecipe/"+style)
            if (data.recipeFound) {
                handleStock(data.recipeFound)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStock = async(recipe) => {
        try {
            const {data} = await axios.patch("/ingredient/updateStockByRecipe", recipe)
            if(data.message !== "Stock updated succesfully") {
                setErrorMessage("There was an error updating the stock")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Production</Modal.Title>
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
                        <FormSelect id="style" required>
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