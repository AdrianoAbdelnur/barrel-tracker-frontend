import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import DetailsModal from './DetailsModal'
import "./barrelsPerCustomer.css"

const TableBarrels = ({customersData, barrels}) => {
    const [detailsModalShow, setDetailsModalShow] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({})
    const [newCustomers, setNewCustomers] = useState(customersData)

    useEffect(() => {
        crossInfo()
        // eslint-disable-next-line
    }, [])

        const crossInfo = () => {
            var newCustomers = []
            newCustomers = customersData.map((customer)=>{
                const barrelsPerCustomer =  barrels.filter((barrel)=> barrel?.customer?._id === customer._id && barrel?.statusBarrel === 'delivered to customer')  
                return{
                    ...customer,
                    barrels: barrelsPerCustomer
                }
                })
                setNewCustomers(newCustomers)
        }


        const handleModal = (customer) => {
            setCustomerDetails(customer)
            setDetailsModalShow(true)
        } 

        const expiredBarrels = (barrels, capacity) => {
            const barrelsCapacity = barrels?.filter((barrel)=> barrel?.capacity === capacity)
            const barrelFound = barrelsCapacity?.find((barrel)=> new Date()>new Date(new Date(barrel.statusDate).getTime()+1209600000))
            if(barrelFound) return true
        }   

  return (
        <div className='barrelsPerCust_Container'>
            <Table striped bordered hover size="sm" className='detailsTable'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th className='text-center'>50 liters</th>
                        <th className='text-center'>30 liters</th>
                        <th className='text-center'>20 liters</th>
                        <th className='text-center'>10 liters</th>
                        <th className='text-center'>5 liters  </th>
                        <th className='text-center'>details</th>
                    </tr>
                </thead>
                <tbody>
                    
                {
                    newCustomers.map((customer, index)=> {        
                        return(
                        <tr key={customer.barName+index}>
                            <td>{index+1}</td>
                            <td>{customer.barName}</td>
                            <td className={ expiredBarrels(customer?.barrels, 50)? 'expired': 'inTime'}>
                                {expiredBarrels(customer?.barrels, 50)?
                                <OverlayTrigger
                                    key={customer.barName+"50"}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={customer.barName+"50"}>
                                            there are barrels with more than two weeks in the bar 
                                        </Tooltip>
                                    }
                                    >
                                    <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 50 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                </OverlayTrigger>    
                                : <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 50 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                }
                            </td>
                            <td className={ expiredBarrels(customer?.barrels, 30)? 'expired': 'inTime'}>
                            {expiredBarrels(customer?.barrels, 30)?
                                <OverlayTrigger
                                    key={customer.barName+"30"}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={customer.barName+"30"}>
                                            there are barrels with more than two weeks in the bar 
                                        </Tooltip>
                                    }
                                    >
                                    <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 30 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                </OverlayTrigger>    
                                : <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 30 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                }
                                </td>
                            <td className={ expiredBarrels(customer?.barrels, 20)? 'expired': 'inTime'}>
                                {expiredBarrels(customer?.barrels, 20)?
                                    <OverlayTrigger
                                        key={customer.barName+"20"}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={customer.barName+"20"}>
                                                there are barrels with more than two weeks in the bar 
                                            </Tooltip>
                                        }
                                        >
                                        <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 20 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                    </OverlayTrigger>    
                                    : <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 20 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                }
                                </td>
                            <td className={ expiredBarrels(customer?.barrels, 10)? 'expired': 'inTime'}>
                                {expiredBarrels(customer?.barrels, 10)?
                                    <OverlayTrigger
                                        key={customer.barName+"10"}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={customer.barName+"10"}>
                                                there are barrels with more than two weeks in the bar 
                                            </Tooltip>
                                        }
                                        >
                                        <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 10 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                    </OverlayTrigger>    
                                    : <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 10 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                }
                                </td>
                            <td className={ expiredBarrels(customer?.barrels, 5)? 'expired': 'inTime'}>
                                {expiredBarrels(customer?.barrels, 50)?
                                    <OverlayTrigger
                                        key={customer.barName+"5"}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={customer.barName+"5"}>
                                                there are barrels with more than two weeks in the bar 
                                            </Tooltip>
                                        }
                                        >
                                        <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 5 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                    </OverlayTrigger>    
                                    : <div className='w-100 h-100'>{customer?.barrels?.filter((barrel)=> barrel?.capacity === 5 && barrel?.statusBarrel === 'delivered to customer').length}</div>
                                }
                                </td>
                            <td className='text-center'><Button onClick={()=>handleModal(customer)} disabled={customer?.barrels?.length? false : true }>details</Button></td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        <DetailsModal
        show ={detailsModalShow}
        setShow={setDetailsModalShow}
        customer={customerDetails}
        /> 
        </div>
    )
}

export default TableBarrels