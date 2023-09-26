import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import "./statusInformation.css"
import axios from './../../../api/axios'
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
            const {data} = await axios("/barrel/getBarrels")
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
                                        <div><b>Barrel status: </b> {barrel?.statusBarrel}</div>
                                        <div><b>change date: </b> {new Date(barrel?.statusDate).toLocaleDateString('en-us', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                    }
                                        </div>
                                        {barrel.statusBarrel !== "empty in factory" && <div><b>Style: </b> {barrel?.style?.name}</div>}
                                        {barrel.statusBarrel === 'delivered to customer' && <div><b>Customer: </b> {barrel?.customer?.barName}</div>}
                                    </td>
                                    <td className='ButtonCel'>
                                        <Button variant='primary' className='buttonChange' onClick={()=>handleModal(barrel?.id)} disabled={barrel?.statusBarrel === 'empty in factory'}>Change</Button>
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