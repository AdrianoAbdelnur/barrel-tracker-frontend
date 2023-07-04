import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './recipes.css'
import AddIngredientModal from './AddIngredientModal'
import { Link } from 'react-router-dom'


const IngredientHandler = ({ingredientType, ingredients, setIngredients, ingredientsData, hasRecipe, setNewIngredient}) => {
    const [ingredient, setIngredient] = useState("")
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [showInput, setShowInput] = useState(false)
    const [showAddIngredientModal, setShowAddIngredientModal] = useState(false)


    useEffect(() => {
        filterIngredients()
        // eslint-disable-next-line
    }, [ingredient])

    useEffect(() => {
        filterIngredients()
        // eslint-disable-next-line
    }, [ingredientsData])
    

    
    const changeInput =(data) => {
        setIngredient(data)
    }

    const filterIngredients = ()=> {
        const ingredientsFound = ingredientsData.filter((i) => 
        (i?.name?.toLowerCase()?.includes(ingredient.toLocaleLowerCase()) &&
        i?.ingredientType === ingredientType
        )
        )
        setFilteredIngredients(ingredientsFound)
    }

   const addingredient = ()=> {
       if (filteredIngredients[0]?.name === ingredient){
            if(ingredient !== "" && quantity !== 0) {
                console.log(quantity)
                setIngredients([...ingredients , {id:filteredIngredients[0]._id, item :ingredient, quantity: quantity}])
                setShowInput(false)
            }
            setIngredient("")
            setQuantity(0)
        }else {
            setShowAddIngredientModal(true)
        }
    } 

    const itemSelect = (data)=> {
        setIngredient(data)
    }

    const cancelAddIngredient = () => {
        setIngredient("")
        setShowInput(false)
    }

    const deleteItem = (ingredient) => {
        setIngredients(ingredients.filter(i => i.id !== ingredient.id))
    }

  return (
    <div><h5>{ingredientType.toUpperCase()}S</h5>
        
        {
            ingredients?.length?
            <ul>
                <Row>
                    <Col xs={3}><b>{ingredientType}</b></Col>
                    <Col><b>quantity</b></Col>
                </Row>
                    {
                    ingredients?.map((ingredient, index) => {
                        return(
                            <li key={index}>
                                <Row>   
                                    <Col xs={3}>{ingredient.item}</Col>  
                                    <Col xs={3}>{ingredient.quantity} Kg</Col> 
                                    {
                                        !hasRecipe &&
                                        <Col >
                                            <Link
                                                className='deleteLink'   
                                                component="button"
                                                onClick={()=>deleteItem(ingredient)}
                                                >
                                                Delete item
                                            </Link>
                                        </Col>
                                    }
                                </Row>
                            </li>
                            )
                        })
                    }
                
            </ul>
            :
            !showInput && <div>There aren't {ingredientType}</div>        
        }

    {
        showInput && 
        <Container>
            <Row>
                <Col xs={6}>Type of {ingredientType}</Col>
                <Col xs={3}>Quantity (Kg)</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col xs={6} >
                    <div className='autocomplete_Wrapper'>
                        <Form.Control
                            type='text'
                            placeholder= {`add a ${ingredientType}`}
                            aria-label="Recipient's"
                            aria-describedby="basic-addon2"
                            value={ingredient}
                            onChange={(e)=>changeInput(e.target.value)}
                            required
                            />
                        <ul className='autocompleteList'>
                            {   
                                ingredient.length !== 0 && ingredient !== filteredIngredients[0]?.name &&
                                filteredIngredients.map((ingredient, index) => {
                                        return <li key={index+ingredient}><button onClick={()=>itemSelect(ingredient.name)}>{ingredient.name}</button></li>
                                })
                            }        
                        </ul>
                    </div>
                </Col>
                <Col xs={3}>
                    <Form.Control
                        type='number'
                        placeholder={quantity}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={(e)=>setQuantity(e.target.value)}
                        required
                        />
                        
                </Col>
                <Col>
                    <Button variant='secondary' onClick={addingredient}>ADD</Button>
                    <Button variant='danger' onClick={cancelAddIngredient}>Cancel</Button>
                </Col>
            </Row>
            </Container>
    }
    {
        !hasRecipe && !showInput &&
        <p onClick={()=>setShowInput(true)} className='addIngridient'>+ Add a new {ingredientType}</p>
    }
    <AddIngredientModal
                    show={showAddIngredientModal}
                    setShow={setShowAddIngredientModal}
                    ingredient={ingredient}
                    setNewIngredient = {setNewIngredient}
                    ingredientType = {ingredientType}
                />

    </div>
    )
}

export default IngredientHandler
