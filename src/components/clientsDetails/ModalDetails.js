import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const ModalDetails = ({show, setShow, client}) => {
  
  return (
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{client.barName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                <li>Manager: {client.barManager}</li>
                <li>Location: {client.location}</li>
                <li>email:{client.email}</li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
                Save Changes
            </Button>
        </Modal.Footer>
  </Modal>
  )
}

export default ModalDetails