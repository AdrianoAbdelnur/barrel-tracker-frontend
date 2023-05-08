import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import NewBarrel from './NewBarrel';
import Status from './Status';
import "./barrels.css"

const Barrels = () => {
    const [newBarrelModal, setNewBarrelModal] = useState(false)
    const [statusModal, setStatusModal] = useState(false)
    const [barrelFound, setBarrelFound] = useState({})
    const location = useLocation();

    useEffect(() => {
      lookForBarrel(location.hash);
    }, [])
    

    const lookForBarrel= async(id) => {
        try {
            id = id.substring(1);
            const {data} = await axios.get("http://localhost:4000/api/barrel/getBarrels");
            const barrelFound = data.barrelsFound.find(e => e.id === id);
            if(barrelFound) {
                setBarrelFound(barrelFound)
                setStatusModal(true)
            } else setNewBarrelModal(true)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='barrels_container'>
    <NewBarrel
        show={newBarrelModal}
        setShow={setNewBarrelModal}
    />
    <Status
        show={statusModal}
        setShow={setStatusModal}
        barrel={barrelFound} 
    />
    </div>
  )
}

export default Barrels