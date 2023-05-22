import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import DetailsModal from './DetailsModal'
import "./barrelsPerCustomer.css"

const TableBarrels = ({customersData, setCustomersData, barrels}) => {
    const [detailsModalShow, setDetailsModalShow] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({})

    useEffect(() => {
      crossInfo()
    }, [])
    
        const crossInfo = () => {
            var newCustomers = []
            newCustomers = customersData.map((customer)=>{
                const barrelsPerCustomer = customerBarrels(customer)
                return{
                    ...customer,
                    barrels: barrelsPerCustomer
                }
                })
                setCustomersData(newCustomers)
        }
        const customerBarrels = (customer) => {
            const barrelsInCustomer= [];
            barrels.map((barrel)=>{
                if (barrel?.customer?.barName === customer.barName) {
                barrelsInCustomer.push(barrel)
                }
            })  
            return barrelsInCustomer
            }
           
const handleModal = (customer) => {
    setCustomerDetails(customer)
    setDetailsModalShow(true)
} 


  return (
        <div className='barrelsPerCust_Container'>
            {
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
                customersData.map((customer, index)=> {        
                    return(
                    <tr key={customer.barName+index}>
                        <td>{index+1}</td>
                        <td>{customer.barName}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel.capacity === 50).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel.capacity === 30).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel.capacity === 20).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel.capacity === 10).length}</td>
                        <td>{customer?.barrels?.filter((barrel)=> barrel.capacity === 5).length}</td>
                        <td><Button onClick={()=>handleModal(customer)}>details</Button></td>
                    </tr>
                    )
                })
            }
            </tbody>
            </Table>
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