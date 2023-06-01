import React, {useState } from 'react'
import { Button, Modal,Form } from 'react-bootstrap'
import './barrels.css'

const PriceChange = ({show, setShow, barrel, setPrice, price}) => {
    const [disableRadio, setDisableRadio] = useState(false)
    const [newPrice, setNewPrice] = useState(price)

    const handleClose = () => {
        setPrice(barrel.style.price)
        setShow(false)
    }
    
    const handleSetPrice = (e) => {
        e.preventDefault()
        console.log(newPrice)
        setPrice(newPrice)
    }
  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Set a new price</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSetPrice}>
                <Modal.Body>
                    <h5>Select an option or set the price</h5>
                    <div className='d-flex flex-row'>
                        <div key={"discount"} className="m-3">
                            <Form.Check
                                disabled={disableRadio}
                                label= "5% off"
                                name="group1"
                                type="radio"
                                id="discount-1"
                                value={0.95}
                                onChange={()=>setNewPrice(Math.round(0.95*price))}
                                />
                            <Form.Check
                                disabled={disableRadio}
                                label= "10% off"
                                name="group1"
                                type="radio"
                                id="discount-2"
                                value={0.90}
                                onChange={()=>setNewPrice(Math.round(0.90*price))}
                                />
                            <Form.Check
                                disabled={disableRadio}
                                label="15% off"
                                name="group1"
                                type="radio"
                                id="discount-3"
                                value={0.85}
                                onChange={()=>setNewPrice(Math.round(0.85*price))}
                                />
                            <Form.Check
                                disabled={disableRadio}
                                label="20% off"
                                name="group1"
                                type="radio"
                                id="discount-4"
                                value={0.8}
                                onChange={()=>setNewPrice(Math.round(0.80*price))}
                                />
                        </div>
                        {!disableRadio && <div className='priceNumber'> <b> $ {newPrice} per liter</b></div>}
                    </div>
                    <Form.Group className="mb-3" controlId="setPrice">
                        <Form.Label>New price</Form.Label>
                        <Form.Control
                            type="number" 
                            placeholder="enter the new price" 
                            onFocus={()=>setDisableRadio(true)} 
                            onBlur={(e)=>setDisableRadio(false)}
                            onChange={(e)=>setNewPrice(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose} type="submit">
                        Set new price
                    </Button>
                </Modal.Footer>
            </Form>
    </Modal>
  )
}

export default PriceChange
