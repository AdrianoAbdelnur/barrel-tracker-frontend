import axios from './../../../api/axios'
import React, { useEffect, useState } from 'react'
import './prices.css'

import { Button, Col, Form, Row } from 'react-bootstrap'

const Prices = () => {
    const [styles, setStyles] = useState([])
    const [prices, setPrices] = useState({})

    useEffect(() => {
      getStyles()
    }, [])

    useEffect(() => {
        updatePrices();
        // eslint-disable-next-line
    }, [prices])
    
    const getStyles = async() => {
        try {
            const {data} = await axios("/styles/getStyles")
            setStyles(data.stylesFound)
            console.log(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePrices = async() => {
        try {
            for (let i = 0; i < prices.length; i++) {
                await axios.patch("/styles/updatePrices", prices[i])
            }
            getStyles()
        } catch (error) {
            console.log(error)
        }
    }

    const handlePrices = (e)=> {
        e.preventDefault();
        const info= []
        let price = 0;
        let _id = ""
        for (const target of e.target) {
            if (target.type==="number") {
                _id = target.name
                price = target.value
                target.value= ""
                if (price !== "") {
                    info.push({_id, price})
                }
            }
        }
        setPrices(info)
    }

  return (
    <div className='prices_container'>
        <Form className='form_container_prices' onSubmit={handlePrices}>
        <h2>Prices</h2>
            {
                styles.map((style,index)=>{return(
                    <Form.Group className="mb-3" controlId="formBasicEmail" key={style.name+index}>
                    <Row>
                        <Col xs={7}><Form.Label className='w-100' >
                            <Row>
                                <Col xs={5}>Style: <b>{style.name}</b></Col>
                                <Col xs={7}>Price / liter : <b>$ {style.price||"add price"}</b></Col>
                            </Row>
                        </Form.Label></Col>
                        <Col xs={5}><Form.Control type="number" name={style._id} placeholder="Enter new price" /></Col>
                    </Row>
                    </Form.Group>
                )})    
            }
            <Button variant="primary" type="submit">
                Update prices
            </Button>
        </Form>
    </div>
  )
}

export default Prices
