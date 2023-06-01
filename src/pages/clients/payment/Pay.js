import React, { useEffect, useState } from 'react'
import "./pay.css"
import { Alert, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import axios from 'axios'

const Pay = () => {
    const [customersData, setCustomersData] = useState([])
    const [filteredCustomers, setFilteredCustomers] = useState([])
    const [showPopover, setShowPopover] = useState(false)
    const [customerName, setCustomerName] = useState("")
    const [customerData, setCustomerData] = useState({})
    const [trueCustomer, setTrueCustomer] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
      handleGetCustomers();
    }, [])
    
    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }, [message])
    
    
    const handleGetCustomers = async() =>{
        try {
            const {data} = await axios("http://localhost:4000/api/client/getClients")
            setCustomersData(data.clientsList)
            setFilteredCustomers(data.clientsList)
        } catch (error) {
            console.log(error)
        }
    }

    const filterCustomers = (e) => {
        const customersFound = customersData?.filter((customer) => 
        (customer?.barName?.toLowerCase()?.includes(e.target.value.toLocaleLowerCase())))
        setFilteredCustomers(customersFound)
    }

    const handleInput = (customer) => {
        setCustomerName(customer.barName)
        setCustomerData(customer)
        setTrueCustomer(true)
    }

    const handleNewPay = async(e) => {
        e.preventDefault()
        try {
            const paylodad = {
                customer:customerData._id, 
                pay: e.target[1].value
            }
            const {data} = await axios.post("http://localhost:4000/api/pay/newPay", paylodad)
            setMessage(data.message)
            setCustomerName("")
            e.target[1].value=""
            e.target[2].checked=false
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='pay_container'>
        <Form className="form_container_payment" onSubmit={handleNewPay}>
            {message && <Alert>{message}</Alert>}
        <OverlayTrigger
            show={showPopover}
            key='bottom'
            placement='bottom'
            delay={1100000}
            overlay={
                <Popover id="customer-popover">
                <Popover.Body className='d-flex flex-column '>
                    {
                        customersData.length? 
                            (filteredCustomers.length > 0)? 
                                (filteredCustomers.map((customer, index)=>{
                                return(
                                <Button key={index} variant='outline-secondary' className='customerButton' onClick={()=>handleInput(customer)}>{customer.barName}</Button>
                                )
                                }))
                                :
                                (<div>there are no matches with the search</div>)
                        :
                        (<div>there are no customers in your database</div>)
                    }     
                </Popover.Body>
                </Popover>
            }
            >
            <Form.Group className="mb-3" controlId="customer">
                <Form.Label>Select a customer</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="customer"
                    autoComplete='off'
                    value={customerName}
                    onChange={(e)=>{
                        filterCustomers(e) 
                        setShowPopover(true)
                        setCustomerName(e.target.value)
                        setTrueCustomer(false)
                    }
                    }
                    onBlur={()=>setShowPopover(false)}
                    required
                />
            </Form.Group>
        </OverlayTrigger>
        <Form.Group className="mb-3" controlId="pay">
            <Form.Label>Pay</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="amount" 
                required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="receipt">
            <Form.Check type="checkbox" label="send receipt" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!trueCustomer}>
            Enter the new payment
        </Button>
    </Form>

    </div>
  )
}

export default Pay