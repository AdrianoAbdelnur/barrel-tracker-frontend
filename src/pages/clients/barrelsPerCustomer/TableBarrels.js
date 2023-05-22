import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import DetailsModal from './DetailsModal'
import "./barrelsPerCustomer.css"

const TableBarrels = ({customersData, barrels}) => {
    const [detailsModalShow, setDetailsModalShow] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({})
    const [newCustomers, setNewCustomers] = useState(customersData)

    useEffect(() => {
      crossInfo()
    }, [])

    useEffect(() => {
      console.log(customersData)
    }, [customersData])
    
    

        const crossInfo = () => {
            var newCustomers = []
            console.log(customersData)
            newCustomers = customersData.map((customer)=>{
                const barrelsPerCustomer =  barrels.filter((barrel)=> barrel?.customer?._id === customer._id)  
                console.log(barrelsPerCustomer)
                return{
                    ...customer,
                    barrels: barrelsPerCustomer
                }
                })
                console.log(newCustomers)
                setNewCustomers(newCustomers)
        }


const handleModal = (customer) => {
    setCustomerDetails(customer)
    setDetailsModalShow(true)
} 
  return (
        <div className='barrelsPerCust_Container'>
            {console.log(customersData)}
            {newCustomers[0]?.barrels?.length?
            <Table striped bordered hover size="sm" className='detailsTable'>
            <thead>
                <tr>
                <th>#</th>
                <th>Customer</th>
                <th>50 liters</th>
                <th>30 liters</th>
                <th>20 liters</th>
                <th>10 liters</th>
                <th>5 liters  </th>
                <th>details</th>
                </tr>
            </thead>
            <tbody>
                
            {
                newCustomers.map((customer, index)=> {        
                    return(
                    <tr key={customer.barName+index}>
                        <td>{index+1}</td>
                        <td>{customer.barName}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 50).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 30).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 20).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 10).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 5).length}</td>
                        <td><Button onClick={()=>handleModal(customer)}>details</Button></td>
                    </tr>
                    )
                })
            }
            </tbody>
            </Table>:
            <>loading...</>
        }
        <DetailsModal
        show ={detailsModalShow}
        setShow={setDetailsModalShow}
        customer={customerDetails}
        /> 
        </div>
    )
}

export default TableBarrels