import axios from './../../../api/axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './ingredientsPrices.css'
import FileButton from '../../../components/File/FileButton'

const IngredientsPrices = () => {
    const [malts, setMalts] = useState([])
    const [hops, setHops] = useState([])
    const [yeasts, setYeasts] = useState([])
    const [others, setOthers] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [prices, setPrices] = useState({})
    const [file, setFile] = useState()

    useEffect(() => {
      getIngredients()
    }, [])

    useEffect(() => {
        updatePrices(prices);
        // eslint-disable-next-line
    }, [prices])

    useEffect(() => {
        if(file) {
            console.log(file)
            updatePricesByFile();
        }
        // eslint-disable-next-line
    }, [file])
    
    
    const getIngredients = async() => {
        try {
            const {data} = await axios("/ingredient/getIngredients")
            setMalts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Malt"))
            setHops(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Hop"))
            setYeasts(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Yeast"))
            setOthers(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Others"))
            setCleanings(data.ingredientsList.filter(ingredient=>ingredient.ingredientType==="Cleaning"))
        } catch (error) {
            console.log(error)
        }
    }

    const updatePrices = async(prices) => {
        try {
            for (let i = 0; i < prices.length; i++) {
                await axios.patch("/ingredient/updatePrices", prices[i])
            }
            getIngredients()
        } catch (error) {
            console.log(error)
        }
    }
    
    const updatePricesByFile = async() => {
        try {
            for (let i = 0; i < file.length; i++) {
                await axios.patch("/ingredient/updatePricesByFile", file[i])
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
        <div className='title_container'>
            <h2>Prices</h2>
            <FileButton 
                setFile = {setFile}
            />
        </div>
        <h5>Malts</h5>
            <div className='ingredientsList'>   
                {
                    malts.map((malt,index)=>{return(
                        <Form.Group className="mb-1" controlId="formBasicEmail" key={malt.name+index}>
                        <Row>
                            <Col xs={9}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={8}><b>{malt.name}</b></Col>
                                    <Col xs={4}>Price / {malt.units} : <b>$ {malt.price.toFixed(2)||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={3}><Form.Control type="number" name={malt._id} placeholder="Enter new price" /></Col>
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
                            <Col xs={9}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={8}><b>{hop.name}</b></Col>
                                    <Col xs={4}>Price / {hop.units} : <b>$ {hop.price.toFixed(2)||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={3}><Form.Control type="number" name={hop._id} placeholder="Enter new price" /></Col>
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
                            <Col xs={9}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={8}><b>{yeast.name}</b></Col>
                                    <Col xs={4}>Price/ {yeast.units} : <b>$ {yeast.price.toFixed(2)||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={3}><Form.Control type="number" name={yeast._id} placeholder="Enter new price" /></Col>
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
                            <Col xs={9}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={8}><b>{other.name}</b></Col>
                                    <Col xs={4}>Price/ {other.units} : <b>$ {other.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={3}><Form.Control type="number" name={other._id} placeholder="Enter new price" /></Col>
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
                            <Col xs={9}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={8}><b>{cleaning.name}</b></Col>
                                    <Col xs={4}>Price/ {cleaning.units} : <b>$ {cleaning.price||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={3}><Form.Control type="number" name={cleaning._id} placeholder="Enter new price" /></Col>
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

export default IngredientsPrices