import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const AddCostModal = ({show, setShow, setNewCost}) => {
    const [i, setI] = useState("")
  
    const handleClose = () => setShow(false);
  
    const handleAddCost = async(e)=>{
        e.preventDefault(); 
        const payload = {
          item: e.target[0].value,
          type: e.target[1].value,
          cost: e.target[2].value
        }
        console.log(payload)
       try {
          const {data}= await axios.post("http://localhost:4000/api/productsCosts/addNewCost", payload)
          setNewCost(data.message)
        } catch (error) {
          console.log(error)
        }
    }
  
    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cost</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCost}>
          <Modal.Body>
                <h5>New Cost</h5>
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>item</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter item" 
                    value={i}
                    onChange={(e)=>setI(e.target.value)}
                    required/>
                </Form.Group>
                <div>
                    <Form.Label>Type of Cost</Form.Label>
                    <Form.Select aria-label="units">
                    <option value="variable">variable</option>
                    <option value="fixed">fixed</option>
                    </Form.Select>
                </div>
                <Form.Group className="mb-3" controlId="price">
                <Form.Label>Cost</Form.Label>
                <Form.Control type="number" placeholder="Enter cost" required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleClose}>
                Add Cost
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default AddCostModal