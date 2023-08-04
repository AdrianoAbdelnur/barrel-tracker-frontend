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
            <Table striped bordered hover className='barrelsDetailTable'>
                <thead >
                    <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>capacity</th>
                    <th>style</th>
                    <th>Delivery date</th>
                    </tr>
                </thead>
                <tbody>
                {customer?.barrels?.map((barrel, index)=>{
                        return(
                            <tr key={barrel.id} className={new Date()>new Date(new Date(barrel.statusDate).getTime()+1209600000)? 'bg-danger' : 'barrelsDetailTable'}>
                            <td>{index+1}</td>
                            <td>{barrel?.id}</td>
                            <td>{barrel?.capacity}</td>
                            <td>{barrel?.style?.name}</td>
                            <td>{new Date(barrel.statusDate).toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                }
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                ok
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailsModal