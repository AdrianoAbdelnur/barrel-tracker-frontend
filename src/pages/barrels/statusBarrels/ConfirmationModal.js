import axios from './../../../api/axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ConfirmationModal = ({show, setShow, id, barrels, setBarrels}) => {

    const handleBarrelStatus = async() =>{
        try {
            const {data} = await axios.put("/barrel/status/"+ id, 
            {
                statusBarrel: "empty in factory",
            } 
            )
            const newBarrels = barrels.map(barrel=> {
                if(barrel.id === data.upDatedBarrel.id) return data.upDatedBarrel
                return barrel
            })
            setBarrels(newBarrels)
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton className='bg-danger '>
                <Modal.Title className='bg-danger '>Change status confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>barrel: {id} <br/>Are you sure you want to change the status to {<b>empty in factory</b>}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>handleBarrelStatus()}>
                    Change
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal