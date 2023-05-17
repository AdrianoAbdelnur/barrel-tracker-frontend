import React, { useEffect, useState } from 'react'
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "./barrels.css"
import axios from 'axios'

const Status = ({show, setShow, barrel, setbarrel}) => {
  const navigate=useNavigate();
  const [statusBarrel, setStatusBarrel] = useState(barrel.statusBarrel)
  const [style, setStyle] = useState(barrel.style)
  const [bar, setBar] = useState(barrel.customer)
  const [popoverShow, setPopoverShow] = useState(false)
  const [customersData, setCustomersData] = useState({})

  useEffect(() => {
    setStatusBarrel(barrel.statusBarrel)
    setStyle(barrel.style)
    setBar(barrel.customer)
    if(barrel.statusBarrel == "full in factory") {
      handleGetCustomers();
    }
  }, [barrel])
  
 

  const handleClose = () => {
    setShow(false)
    navigate("/main")
  }

  const changeStatus = (data) => {
    if (statusBarrel === "empty in factory") {
      setStatusBarrel("full in factory")
      setStyle(data)
      setPopoverShow(false)
    }else if (statusBarrel === "full in factory") {
      setStatusBarrel("Delivered to customer")
      setBar(data.customer._id)
    }else if (statusBarrel === "Delivered to customer" ) {
      setStatusBarrel("empty in factory")
      setStyle("none style")
      setPopoverShow(false)
    }
  }
  
  const handleGetCustomers = async() =>{
    try {
        const {data} = await axios("http://localhost:4000/api/client/getClients")
        console.log(data)
        setCustomersData(data.clientsList)
    } catch (error) {
        console.log(error)
    }
}

  const handleBarrelStatus = async() =>{
    const payload = 
      {
        statusBarrel: statusBarrel,
        style: style, 
        customer: bar
      }
      try {
      console.log(payload)
      const {data} = axios.put("http://localhost:4000/api/barrel/status/"+ barrel.id, payload )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    setShow(false)
  }
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Barrel details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Barrel id : <b>{barrel.id}</b></li>
            <li>capacity: <b>{barrel.capacity} liters</b></li>
            <li>status: <b>{statusBarrel} </b>
            
            <OverlayTrigger
              show={popoverShow}
              key='bottom'
              placement='bottom'
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  {
                    statusBarrel === "empty in factory" && <div>
                    <Popover.Header as="h3">Select a style</Popover.Header>
                  <Popover.Body className='styles_container'>
                    <Button className='statusButton' onClick={()=>changeStatus("Golden")}>Golden</Button>
                    <Button className='statusButton'onClick={()=>changeStatus("Scottish")}>Scottish</Button>
                    <Button className='statusButton'onClick={()=>changeStatus("Honey")}>Honey</Button>
                    <Button className='statusButton'onClick={()=>changeStatus("IPA")}>IPA</Button>
                    <Button className='statusButton'onClick={()=>changeStatus("Porter")}>Porter</Button>
                  </Popover.Body>
                    </div>
                  }
                  {
                    statusBarrel === "full in factory" && <div>
                    <Popover.Header as="h3">Select a bar</Popover.Header>
                  <Popover.Body className='styles_container'>
                    {
                      customersData.length? (customersData.map((customer, index)=>{
                        return(
                          <Button key={index} variant='outline-secondary' className='statusButton' onClick={()=>changeStatus({customer})}>{customer.barName}</Button>
                        )
                      }))
                      :
                      (<div>there is not customers in your database</div>)
                    }
                  </Popover.Body>
                    </div>
                  }
                </Popover>
              }
            >

              {statusBarrel === "Delivered to customer"?
              <Button variant="secondary" className='statusButton' onClick={()=>changeStatus("")}>Change Status</Button>
              :
              <Button variant="secondary" className='statusButton' onClick={()=>popoverShow? setPopoverShow(false):setPopoverShow(true)}>Change Status</Button>
            }
              </OverlayTrigger>
            </li> 
              {style !== "none style" && <li>style: <b>{style}</b></li>}
              {statusBarrel === "Delivered to customer"  && <li>bar: <b>{bar}</b></li>}
          </ul>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBarrelStatus}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Status