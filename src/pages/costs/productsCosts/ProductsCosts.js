import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddCostModal from './AddCostModal'

const ProductsCosts = () => {
    const [variables, setVariables] = useState([])
    const [fixed, setFixed] = useState([])
    const [costs, setCosts] = useState({})
    const [showAddCostModal, setShowAddCostModal] = useState(false)
    const [newCost, setNewCost] = useState("")
    
    useEffect(() => {
        getCosts()
    }, [])

    useEffect(() => {
        updateCosts();
        // eslint-disable-next-line
    }, [costs])

    useEffect(() => {
        if (newCost==="Cost registered successfully") { 
            getCosts()
        }
    }, [newCost])
    
    
    const getCosts = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/productsCosts/getCosts")
            setFixed(data.costsList.filter(cost=>cost.type==="fixed"))
            setVariables(data.costsList.filter(cost=>cost.type==="variable"))
        } catch (error) {
            console.log(error)
        }
    }

    const updateCosts = async() => {
        try {
            for (let i = 0; i < costs.length; i++) {
                await axios.patch("http://localhost:4000/api/productsCosts/updateCost", costs[i])
            }
            getCosts()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCosts = (e)=> {
        e.preventDefault();
        const info= []
        let cost = 0;
        let _id = ""
        for (const target of e.target) {
            if (target.type==="number") {
                _id = target.name
                cost = target.value
                target.value= ""
                if (cost !== "") {
                    info.push({_id, cost})
                }
            }
        }
        setCosts(info)
    }

  return (
    <div className='prices_container'>
        <Form className='form_container_prices' onSubmit={handleCosts}>
        <h2>Production Costs</h2>
        <h5>Fixes Costs</h5>
            <div className='ingredientsList'>   
                {
                    fixed.map((fix,index)=>{return(
                        <Form.Group className="mb-1" controlId="fixed" key={fix.item+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{fix.item}</b></Col>
                                    <Col xs={7}>cost: <b>$ {fix.cost||"add cost"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={fix._id} placeholder="Enter new cost" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <h5>Variables Costs</h5>
            <div className='ingredientsList'>
                {
                    variables.map((variable,index)=>{return(
                        <Form.Group className="mb-1" controlId="variable" key={variable.item+index}>
                        <Row>
                            <Col xs={7}><Form.Label className='w-100' >
                                <Row>
                                    <Col xs={5}><b>{variable.item}</b></Col>
                                    <Col xs={7}>cost : <b>$ {variable.cost||"add price"}</b></Col>
                                </Row>
                            </Form.Label></Col>
                            <Col xs={5}><Form.Control type="number" name={variable._id} placeholder="Enter new cost" /></Col>
                        </Row>
                        </Form.Group>
                    )})    
                }
            </div>
            <div className='d-flex justify-content-end m-3'>
                <Link   
                    component="button"
                    onClick={()=>setShowAddCostModal(true)}
                >
                    Add new Cost
                </Link>
            </div>
        
            <Button variant="primary" type="submit">
                Update costs
            </Button>
        </Form>
        <AddCostModal
            show={showAddCostModal}
            setShow={setShowAddCostModal}
            setNewCost={setNewCost}
        />

    </div>
  )
}

export default ProductsCosts