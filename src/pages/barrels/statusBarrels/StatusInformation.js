import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import "./statusInformation.css"
import axios from 'axios'
import ConfirmationModal from './ConfirmationModal'

const StatusInformation = () => {
    const [barrels, setBarrels] = useState([])
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [barrelId, setBarrelId] = useState("")

    useEffect(() => {
      getbarrels()
    }, [])

    const getbarrels = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/barrel/getBarrels")
            setBarrels(data.barrelsFound)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModal = (id) => {
        setBarrelId(id)
        setConfirmationModal(true)
    }

  return (
    <div className='statusInformation_Container'>
        <h3 className='mt-5 m-5 mb-0'>Clients Information</h3>
        <div className='d-flex justify-content-center w-100'>
            <Table striped bordered hover size="sm" className='detailsTable'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>Status</th>
                    <th>Force Status to "empty in factory"</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        barrels.map((barrel, index)=> {
                            return (
                                <tr key={barrel.id+index}>
                                    <td>{index}</td>
                                    <td>{barrel.id}</td>
                                    <td>
                                        <div><b>Barrel status: </b> {barrel.statusBarrel}</div>
                                        <div><b>change date: </b> {new Date(barrel.statusDate).toLocaleDateString('en-us', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                    }
                                        </div>
                                        {barrel.style !== 'none style' && <div><b>Style: </b> {barrel.style}</div>}
                                        {barrel.statusBarrel === 'delivered to customer' && <div><b>Customer: </b> {barrel.customer.barName}</div>}
                                    </td>
                                    <td className='ButtonCel'>
                                        <Button variant='primary' className='buttonChange' onClick={()=>handleModal(barrel.id)}>Change</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    
                </tbody>
            </Table>
        </div>
        <ConfirmationModal
            show={confirmationModal}
            setShow={setConfirmationModal}
            id={barrelId}
            barrels={barrels}
            setBarrels={setBarrels}
        />
    </div>
  )
}

export default StatusInformation