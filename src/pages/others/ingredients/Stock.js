import axios from './../../../api/axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './stock.css'


const Stock = () => {
    const [malts, setMalts] = useState([])
    const [hops, setHops] = useState([])
    const [yeasts, setYeasts] = useState([])
    const [others, setOthers] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [stock, setStock] = useState({})

    useEffect(() => {
      getIngredients()
    }, [])

    useEffect(() => {
        updateStock();
        // eslint-disable-next-line
    }, [stock])
    
    const getIngredients = async() => {
        try {
            const {data} = await axios("/ingredient/getIngredients")
            console.log(data)
            setMalts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Malt"))
            setHops(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Hop"))
            setYeasts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Yeast"))
            setOthers(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Others"))
            setCleanings(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Cleaning"))
        } catch (error) {
            console.log(error)
        }
    }

    const updateStock = async() => {
        try {
            for (let i = 0; i < stock.length; i++) {
                await axios.patch("/ingredient/updateStock", stock[i])
            }
            getIngredients()
        } catch (error) {
            console.log(error)
        }
    }

    const handleStock = (e)=> {
        e.preventDefault();
        const info= []
        let stock = 0;
        let _id = ""
        for (const target of e.target) {
            if (target.type==="number") {
                _id = target.name
                stock = target.value
                target.value= ""
                if (stock !== "") {
                    info.push({_id, stock})
                }
            }
        }
        setStock(info)
    }
  return (
    <div className='prices_container'>
        <Form className='form_container_stock' onSubmit={handleStock}>
        <h2>Stock</h2>
        <h5 className='title'>Malts</h5>
            <div className='ingredientsList'>   
                {
                    malts.map((malt,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={malt.name+index}>
                        <Row>
                            <Col xs={8}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{malt.name}</b></Col>
                                    <Col xs={3}> Stock ({malt.units}): <b>{malt.stock||"out of stock"} {malt.stock? malt.units:""}</b></Col>
                                    <Col xs={3}> Stock price: $ {Math.round(malt.stock * malt.price)}  </Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={4}><Form.Control type="number" name={malt._id} placeholder="Enter new stock"/></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5 className='title'>Hops</h5>
            <div className='ingredientsList'>
                {
                    hops.map((hop,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={hop.name+index}>
                        <Row>
                            <Col xs={8}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{hop.name}</b></Col>
                                    <Col xs={3}>Stock ({hop.units}): <b>{hop.stock||"out of stock"} {hop.stock? hop.units:""}</b></Col>
                                    <Col xs={3}> Stock price: $ {Math.round(hop.stock * hop.price)}  </Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={4}><Form.Control type="number" name={hop._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5 className='title'>Yeasts</h5>
            <div className='ingredientsList'>
                {
                    yeasts.map((yeast,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={yeast.name+index}>
                        <Row>
                            <Col xs={8}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{yeast.name}</b></Col>
                                    <Col xs={3}>Stock ({yeast.units}): <b>{yeast.stock||"out of stock"} {yeast.stock? yeast.units:""}</b></Col>
                                    <Col xs={3}> Stock price: $ {Math.round(yeast.stock * yeast.price)}  </Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={4}><Form.Control type="number" name={yeast._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5 className='title'>Others</h5>
            <div className='ingredientsList'>
                {
                    others.map((other,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={other.name+index}>
                        <Row>
                            <Col xs={8}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{other.name}</b></Col>
                                    <Col xs={3}>Stock ({other.units}): <b>{other.stock||"out of stock"} {other.stock? other.units:""}</b></Col>
                                    <Col xs={3}> Stock price: $ {Math.round(other.stock * other.price)}  </Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={4}><Form.Control type="number" name={other._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5 className='title'>Cleanings/Chemicals</h5>
            <div className='ingredientsList'>
                {
                    cleanings.map((cleaning,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={cleaning.name+index}>
                        <Row>
                            <Col xs={8}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{cleaning.name}</b></Col>
                                    <Col xs={3}>Stock ({cleaning.units}): <b>{cleaning.stock||"out of stock"} {cleaning.stock? cleaning.units:""}</b></Col>
                                    <Col xs={3}> Stock price: $ {Math.round(cleaning.stock * cleaning.price)}  </Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={4}><Form.Control type="number" name={cleaning._id} placeholder="Enter new price" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <Button variant="primary" type="submit">
                Update Stock
            </Button>
        </Form>
    </div>
    )
}

export default Stock