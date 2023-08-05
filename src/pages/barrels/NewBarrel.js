import React, { useEffect, useState } from 'react'
import { Button, Form, FormSelect, Modal } from 'react-bootstrap'
import "./barrels.css"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './../../api/axios';

const NewBarrel = ({show, setShow}) => {
  let navigate = useNavigate();
  const location = useLocation();
  
  const [id, setId] = useState('');
  
  useEffect(() => {
    setId(location.hash.substring(1))
    // eslint-disable-next-line
  }, [])

  

  const handleAddBarrel = (e) => {
    e.preventDefault();
    handleAddNewBarrel(e.target[0].value);
    setShow(false)
  }

  const handleAddNewBarrel = async(capacity) => {
    try {
      const payload = {
        id: id,
        capacity: capacity
      }
      await axios.post("/barrel/addBarrel", payload)
      navigate("/main")
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    navigate("/main")
    setShow(false)
  }
 

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Barrel</Modal.Title>
        </Modal.Header>
          <Form onSubmit={handleAddBarrel}>
        <Modal.Body>
            <div>Barrel id: {id}</div>
            <FormSelect id="slcAutos" required>
              <option>Select a capacity</option>
              <option value="50">50 liters</option>
              <option value="30">30 liters</option>
              <option value="20">20 liters</option>
              <option value="10">10 liters</option>
              <option value="5">5 liters</option>
            </FormSelect>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Add Barrel
          </Button>
        </Modal.Footer>
          </Form>
      </Modal>
  )
}

export default NewBarrel
