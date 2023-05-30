import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import NewBarrel from './NewBarrel';
import "./barrels.css"
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

const Barrels = () => {
    const [newBarrelModal, setNewBarrelModal] = useState(false)
    const [barrel, setBarrel] = useState({})
    const location = useLocation();
    const [barrelId, setBarrelId] = useState("")
    
    const [nextStatus, setNextStatus] = useState()
    const [newStatusBarrel, setNewStatusBarrel] = useState("")
    const [popoverShow, setPopoverShow] = useState(false)
    const [customersData, setCustomersData] = useState([])
    const [filteredCustomers, setFilteredCustomers] = useState([])
    const [styles, setStyles] = useState([])
    const [confirmSale, setConfirmSale] = useState(false)


    useEffect(() => {
        setBarrelId(location.hash.substring(1));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(barrelId){
            getBarrel(barrelId)
        }
    }, [barrelId])
    
    
    useEffect(() => {
        nextstat();
        if (barrel.statusBarrel === "empty in factory" || barrel.statusBarrel === "delivered to customer") {
            handleGetStyles()
        }
        if(barrel.statusBarrel === "full in factory") {
            handleGetCustomers()
        }
        // eslint-disable-next-line
    }, [barrel])
    
    useEffect(() => {
        if (newStatusBarrel) {
            handleBarrelStatus(newStatusBarrel)
        }
        // eslint-disable-next-line
    }, [newStatusBarrel])

    const changeStatus = (data) => {
        if(barrel.statusBarrel==="empty in factory"){
            setNewStatusBarrel({
                statusBarrel: "full in factory",
                style: data.style._id, 
            })
            setPopoverShow(false)
        } else if(barrel.statusBarrel === "full in factory") {
            setBarrel({
                ...barrel,
                statusBarrel: "delivered to customer",
                customer: data.customer, 
            })
            setPopoverShow(false)
        } else if(barrel.statusBarrel === "delivered to customer"){
            setNewStatusBarrel({
                statusBarrel: "empty in factory",
            })
        }
    }

    const getBarrel = async(id) => {
        try {
            const {data} = await axios("http://localhost:4000/api/barrel//getABarrel/"+ id);
            if(data.barrelFound){
                if (data?.barrelFound?.statusBarrel === "delivered to customer") {
                    setConfirmSale(true)
                }
                setBarrel(data.barrelFound)
            } else setNewBarrelModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBarrelStatus = async(newStatusBarrel) =>{
            try {
                const {data} = await axios.put("http://localhost:4000/api/barrel/status/"+ barrel.id, newStatusBarrel )
                setBarrel(data.upDatedBarrel)
                console.log(data.upDatedBarrel)
            } catch (error) {
                console.log(error)
            }
    }

    const handleGetCustomers = async() =>{
        try {
            const {data} = await axios("http://localhost:4000/api/client/getClients")
            setCustomersData(data.clientsList)
            setFilteredCustomers(data.clientsList)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetStyles = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/styles/getStyles")
            setStyles(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
    }

    const filterCustomers = (e) => {
        const customersFound = customersData.filter((customer) => 
        (customer?.barName?.toLowerCase()?.includes(e.target.value.toLocaleLowerCase())))
        setFilteredCustomers(customersFound)
    }

    const nextstat = () => {
        if(barrel.statusBarrel === "empty in factory") setNextStatus("full in factory") 
        if(barrel.statusBarrel === "full in factory") setNextStatus("delivered to customer")  
        if(barrel.statusBarrel === "delivered to customer") setNextStatus("empty in factory") 
    }

    const confirmationSale = () => {
        setNewStatusBarrel({
            statusBarrel: "delivered to customer",
            customer: barrel.customer._id 
        })
        setConfirmSale(true)
    }

  return (
    <div className='barrels_container'>
     {
        barrel.id && <div className='status_barrel_container'>
            <h3>Status barrel</h3>
            <ul>
                <li>barrel id : <b>{barrel.id}</b></li>
                <li>capacity: <b>{barrel.capacity} liters</b></li>
                <li>status: <b>{barrel.statusBarrel} </b> </li>
                {barrel.statusBarrel !== "empty in factory" && <li>style: <b>{barrel.style.name}</b></li>}
                {(barrel.statusBarrel === "delivered to customer")  && <li>customer: <b>{barrel?.customer?.barName}</b></li>}
                {(barrel.statusBarrel === "delivered to customer")  && <li>price: <b>$ {barrel?.style?.price} </b><Button>Change price</Button></li>}
            </ul>
            <OverlayTrigger
                    show={popoverShow}
                    key='bottom'
                    placement='bottom'
                    overlay={  
                            <Popover id={`popover-positioned-bottom`} className="popover_container">
                            {
                                (barrel.statusBarrel === "empty in factory") && <div>
                                    <Popover.Header as="h3">Select a style</Popover.Header>
                                    <Popover.Body className='styles_container'>
                                        {
                                        styles.length?
                                        (styles.map((style, index)=>{
                                            return(
                                            <Button key={index} variant='outline-secondary' className='statusButton' onClick={()=>changeStatus({style})}>{style.name}</Button>
                                            )
                                            }))
                                            :
                                            (<div>there are no matches with the search</div>)
                                        }
                                    </Popover.Body>
                                    </div>
                            }
                            {
                                barrel.statusBarrel === "full in factory" && <div>
                                <Popover.Header as="h3">Select a customer
                                <input placeholder='Search' onChange={(e)=>filterCustomers(e)}></input>
                                </Popover.Header>
                                <Popover.Body className='styles_container'>
                                    {
                                    customersData.length? 
                                        (filteredCustomers.length > 0)? 
                                            (filteredCustomers.map((customer, index)=>{
                                            return(
                                            <Button key={index} variant='outline-secondary' className='statusButton' onClick={()=>changeStatus({customer})}>{customer.barName}</Button>
                                            )
                                            }))
                                            :
                                            (<div>there are no matches with the search</div>)
                                    :
                                    (<div>there are no customers in your database</div>)
                                    }
                                </Popover.Body>
                                </div>
                            }
                            </Popover>      
                    }
                    >
                    {
                        barrel.statusBarrel === "delivered to customer"?
                            !confirmSale? <Button className='changeStatusButton' variant='danger' onClick={confirmationSale}>Confirm Sale</Button>:
                            <Button className='changeStatusButton' variant="secondary" onClick={()=>changeStatus()}>Change status to <b>{nextStatus}</b></Button>
                            :
                            <Button className='changeStatusButton' variant="secondary" onClick={()=>setPopoverShow(!popoverShow)}>Change status to <b>{nextStatus}</b></Button>
                    }
                </OverlayTrigger>
        </div>
    }
    
    <NewBarrel
        show={newBarrelModal}
        setShow={setNewBarrelModal}
    />
    </div>
  )
}

export default Barrels
