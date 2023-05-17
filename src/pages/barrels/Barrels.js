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


    useEffect(() => {
        setBarrelId(location.hash.substring(1));
    }, [])

    useEffect(() => {
        if(barrelId){
            getBarrel(barrelId)
        }
    }, [barrelId])
    
    
    useEffect(() => {
        nextstat();
        if(barrel.statusBarrel === "full in factory") {
            handleGetCustomers()
        }
    }, [barrel])
    
    useEffect(() => {
        if (newStatusBarrel) {
            handleBarrelStatus(newStatusBarrel)
        }
    }, [newStatusBarrel])
    

    const nextstat = () => {
        if(barrel.statusBarrel === "empty in factory") setNextStatus("full in factory") 
        if(barrel.statusBarrel === "full in factory") setNextStatus("delivered to customer") 
        if(barrel.statusBarrel === "delivered to customer") setNextStatus("empty in factory") 
    }


    const getBarrel = async(id) => {
        try {
            const {data} = await axios("http://localhost:4000/api/barrel//getABarrel/"+ id);
            if(data.barrelFound){
                setBarrel(data.barrelFound)
            } else setNewBarrelModal(true)
        } catch (error) {
            console.log(error)
        }
    }

   
    

    const changeStatus = (data) => {
        if(barrel.statusBarrel==="empty in factory"){
            setNewStatusBarrel({
                statusBarrel: "full in factory",
                style: data, 
            })
            setPopoverShow(false)
        } else if(barrel.statusBarrel === "full in factory") {
            setNewStatusBarrel({
                statusBarrel: "delivered to customer",
                customer: data.customer._id, 
            })
            setPopoverShow(false)
        } else if(barrel.statusBarrel === "delivered to customer"){
            setNewStatusBarrel({
                statusBarrel: "empty in factory",
                style: "none style"
            })
        }
    }

    const handleBarrelStatus = async(newStatusBarrel) =>{
            try {
                const {data} = await axios.put("http://localhost:4000/api/barrel/status/"+ barrel.id, newStatusBarrel )
                setBarrel(data.upDatedBarrel)
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

    const filterCustomers = (e) => {
        const customersFound = customersData.filter((customer) => 
        (customer?.barName?.toLowerCase()?.includes(e.target.value.toLocaleLowerCase())))
        setFilteredCustomers(customersFound)
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
                {barrel.style !== "none style" && <li>style: <b>{barrel.style}</b></li>}
                {(barrel.statusBarrel === "delivered to customer")  && <li>customer: <b>{barrel?.customer?.barName}</b></li>}
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
                                    <Button className='statusButton'onClick={()=>changeStatus("Golden")}>Golden</Button>
                                    <Button className='statusButton'onClick={()=>changeStatus("Scottish")}>Scottish</Button>
                                    <Button className='statusButton'onClick={()=>changeStatus("Honey")}>Honey</Button>
                                    <Button className='statusButton'onClick={()=>changeStatus("IPA")}>IPA</Button>
                                    <Button className='statusButton'onClick={()=>changeStatus("Porter")}>Porter</Button>
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
