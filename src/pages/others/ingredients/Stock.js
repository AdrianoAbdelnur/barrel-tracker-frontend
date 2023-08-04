import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'


const Stock = () => {
    const [malts, setMalts] = useState([])
    const [hops, setHops] = useState([])
    const [yeasts, setYeasts] = useState([])
    const [others, setOthers] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [prices, setPrices] = useState({})

    useEffect(() => {
      getIngredients()
    }, [])

    useEffect(() => {
        updatePrices();
        // eslint-disable-next-line
    }, [prices])
    
    const getIngredients = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/ingredient/getIngredients")
            setMalts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Malt"))
            setHops(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Hop"))
            setYeasts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Yeast"))
            setOthers(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Other"))
            setOthers(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Other"))
            setCleanings(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Cleaning"))
        } catch (error) {
            console.log(error)
        }
    }

    const updatePrices = async() => {
        try {
            console.log(prices)
            for (let i = 0; i < prices.length; i++) {
                await axios.patch("http://localhost:4000/api/ingredient/updatePrices", prices[i])
            }
            getIngredients()
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
        <h5>Malts</h5>
            <div className='ingredientsList'>   
                {
                    malts.map((malt,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={malt.name+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{malt.name}</b></Col>
                                    <Col xs={7}>Price / {malt.units} : <b>$ {malt.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={malt._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5>Hops</h5>
            <div className='ingredientsList'>
                {
                    hops.map((hop,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={hop.name+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{hop.name}</b></Col>
                                    <Col xs={7}>Price / {hop.units} : <b>$ {hop.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={hop._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5>Yeasts</h5>
            <div className='ingredientsList'>
                {
                    yeasts.map((yeast,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={yeast.name+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{yeast.name}</b></Col>
                                    <Col xs={7}>Price/ {yeast.units} : <b>$ {yeast.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={yeast._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5>Others</h5>
            <div className='ingredientsList'>
                {
                    others.map((other,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={other.name+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{other.name}</b></Col>
                                    <Col xs={7}>Price/ {other.units} : <b>$ {other.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={other._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5>Cleanings/Chemicals</h5>
            <div className='ingredientsList'>
                {
                    cleanings.map((cleaning,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={cleaning.name+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{cleaning.name}</b></Col>
                                    <Col xs={7}>Price/ {cleaning.units} : <b>$ {cleaning.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={cleaning._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <Button variant="primary" type="submit">
                Update prices
            </Button>
        </Form>
    </div>
    )
}

export default Stock