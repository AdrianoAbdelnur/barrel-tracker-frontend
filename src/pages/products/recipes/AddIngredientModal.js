import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import './addIngredientModal.css'
import axios from 'axios';

const AddIngredientModal = ({show, setShow, ingredient, ingredientType, setNewIngredient }) => {
    const [i, setI] = useState("")
    
    useEffect(() => {
      if (show) {
        setI(ingredient)
      }
      // eslint-disable-next-line
    }, [show])
    
    const handleClose = () => setShow(false);
    const handleAddIngredient = async(e)=>{
      e.preventDefault();
    const payload = {
        name: e.target[0].value,
        ingredientType: e.target[1].value,
        price: e.target[2].value
      }
     try {
        const {data}= await axios.post("http://localhost:4000/api/ingredient/newIngredient", payload)
        setNewIngredient(data.message)
      } catch (error) {
        console.log(error)
      }
  }

    return (
    <Modal show={show} onHide={handleClose} className='ingredientModal_container'>
        <Modal.Header closeButton>
          <Modal.Title>{ingredient} is not a ingredient in your DataBase</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddIngredient}>
          <Modal.Body>
            <h5>Do you want to add it?</h5>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name" 
                value={i}
                onChange={(e)=>setI(e.target.value)}
                required/>
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option value={ingredientType}>{ingredientType}</option>
              <option value="Malt">Malt</option>
              <option value="Hop">Hop</option>
              <option value="Yeast">Yeast</option>
              <option value="Yeast">Other</option>
              <option value="Yeast">Cleaning Product</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" required />
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

export default AddIngredientModal
