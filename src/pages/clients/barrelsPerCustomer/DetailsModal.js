import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import "./barrelsPerCustomer.css"

const DetailsModal = ({show, setShow, customer}) => {
    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>{customer.barName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>capacity</th>
                    <th>style</th>
                    </tr>
                </thead>
                <tbody>
                {customer?.barrels?.map((barrel, index)=>{
                    return(
                        <tr key={barrel.id}>
                            <td>{index+1}</td>
                            <td>{barrel.id}</td>
                            <td>{barrel.capacity}</td>
                            <td>{barrel.style}</td>
                        </tr>
                    )
                })}
                </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>setShow(false)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailsModal