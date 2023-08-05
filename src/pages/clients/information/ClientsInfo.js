import React, { useEffect, useState } from 'react'
import "./clientsInfo.css"
import { Table } from 'react-bootstrap'
import axios from './../../../api/axios'
import { Link } from 'react-router-dom'
import ModalDetails from '../../../components/clientsDetails/ModalDetails'

const ClientsInfo = () => {
    const [clientsData, setClientsData] = useState([])
    const [detailsModalShow, setDetailsModalShow] = useState(false)
    const [client, setClient] = useState({})

    useEffect(() => {
      handleGetClient();
    }, [])
    

    const handleGetClient = async() =>{
        try {
            const {data} = await axios("¿/client/getClients")
            setClientsData(data.clientsList)
        } catch (error) {
            console.log(error)
        }
    }

    const openModalDetails = (client) => {
        setDetailsModalShow(true)
        setClient(client)
    }

    return (
    <div className='clientInfo_container'>
        <div className='d-flex justify-content-center w-100'>
            <Table striped bordered hover className='infoClientsTable' >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Bar's name</th>
                    <th className='tableContent'>Bar's manager</th>
                    <th className='tableContent'>Location</th>
                    <th className='tableContent'>email</th>
                    <th>More details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientsData?.map( (client, index) => {
                            return(
                                <tr key={client.barName+index}>
                                    <td>{index+1}</td>
                                    <td>{client.barName}</td>
                                    <td className='tableContent'>{client.barManager}</td>
                                    <td className='tableContent'>{client.location}</td>
                                    <td className='tableContent'>{client.email}</td>
                                    <td><Link   
                                            component="button"
                                            onClick={()=>openModalDetails(client)}
                                        >
                                        details
                                    </Link>
                                    </td>
                            </tr>)
                            })
                        }
                </tbody>
            </Table>    
        </div>
    
    <ModalDetails
        show={detailsModalShow}
        setShow={setDetailsModalShow}
        client={client}
    />
    </div>
  )
}

export default ClientsInfo