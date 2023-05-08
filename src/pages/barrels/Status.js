import React, { useEffect, useState } from 'react'
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import "./barrels.css"
import axios from 'axios'

const Status = ({show, setShow, barrel}) => {
  const navigate=useNavigate();
  const [status, setStatus] = useState(barrel.status)
  const [style, setStyle] = useState(barrel.style)
  const [popoverShow, setPopoverShow] = useState(false)
  const [customersData, setCustomersData] = useState({})
  const [bar, setBar] = useState("")

 useEffect(() => {
   setStatus(barrel.status)
   setStyle(barrel.style)
 }, [barrel])
 

  const handleClose = () => {
    setShow(false)
    navigate("/main")
  }

  const changeStatus = (data) => {
    if (status === "empty in factory") {
      setStatus("full in factory")
      setStyle(data)
      setPopoverShow(false)
      handleGetCustomers();
    }
    if (status === "full in factory") {
      setStatus("Delivered to the bar")
      setBar(data.customer.barName)
      console.log(data.customer.barName)
    }
    if (status === "Delivered to the bar" ) {
      setStatus("empty in factory")
      setStyle("none style")
      setBar("")
      setPopoverShow(false)
    }
  }

  const handleGetCustomers = async() =>{
    try {
        const {data} = await axios("http://localhost:4000/api/client/getClients")
        setCustomersData(data.clientsList)
    } catch (error) {
        console.log(error)
    }
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
            <li>status: <b>{status} </b>
            
            <OverlayTrigger
              show={popoverShow}
              key='bottom'
              placement='bottom'
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  {
                    status === "empty in factory" && <div>
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
                    status === "full in factory" && <div>
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

              {status === "Delivered to the bar"?
              <Button variant="secondary" className='statusButton' onClick={()=>changeStatus("")}>Change Status</Button>
              :
              <Button variant="secondary" className='statusButton' onClick={()=>popoverShow? setPopoverShow(false):setPopoverShow(true)}>Change Status</Button>
            }
              </OverlayTrigger>
            
            
            
            
            </li> 
            {style !== "none style" && <li>style: <b>{style}</b></li>}
            {bar  && <li>bar: <b>{bar}</b></li>}
          </ul>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Status