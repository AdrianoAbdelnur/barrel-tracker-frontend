import React, { useEffect, useState } from 'react'
import './recipes.css'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import AddIngredientModal from './AddIngredientModal'

const AddRecipeModal = ({show, setShow}) => {
    const [showInputMalt, setShowInputMalt] = useState(false)
    const [showInputHop, setShowInputHop] = useState(false)
    const [showInputYeast, setShowInputYeast] = useState(false)
    const [showInputOther, setShowInputOther] = useState(false)
    const [showInputCleaning, setShowInputCleaning] = useState(false)
    const [ingredient, setIngredient] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [recipeName, setRecipeName] = useState("")
    const [malts, setMalts] = useState([])
    const [hops, setHops] = useState([])
    const [yeasts, setYeasts] = useState([])
    const [others, setOthers] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [ingredientsData, setIngredientsData] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [itemSelected, setItemSelected] = useState(false)
    const [showAddIngredientModal, setShowAddIngredientModal] = useState(false)
    const [ingredientType, setIngredientType] = useState("")
    const [newIngredient, setNewIngredient] = useState("")


    useEffect(() => {
        handleGetIngredients()
    }, [])

    useEffect(() => {
        filterIngredients()
        setItemSelected(false)
        // eslint-disable-next-line
    }, [ingredient])

    useEffect(() => {
        if(newIngredient === "The ingredient was added correctly") {
            handleGetIngredients()
            setNewIngredient("")
        }
    }, [newIngredient])

    useEffect(() => {
        filterIngredients()
        // eslint-disable-next-line
    }, [ingredientsData])
    
    

    const handleGetIngredients = async() =>{
        try {
            const {data} = await axios("http://localhost:4000/api/ingredient/getIngredients")
            setIngredientsData(data.ingredientsList)
        } catch (error) {
            console.log(error)
        }
    }

    const filterIngredients = ()=> {
        let ingretientType = "";
        if (showInputMalt) {
            ingretientType = "Malt"
        }
        if (showInputHop) {
            ingretientType = "Hop"
        }
        if (showInputYeast) {
            ingretientType= "Yeast"
        }
        if (showInputOther) {
            ingretientType= "Other"
        }
        if (showInputCleaning) {
            ingretientType= "Cleaning"
        }
        const ingredientsFound = ingredientsData.filter((i) => 
        (i?.name?.toLowerCase()?.includes(ingredient.toLocaleLowerCase()) &&
        i?.ingredientType === ingretientType
        )
        )
        setFilteredIngredients(ingredientsFound)
    }
    
    
    const addingredient = ()=> {
     if ((itemSelected===true) || filteredIngredients[0]?.name === ingredient){
            if(ingredient !== "" && quantity !== 0) {
                if (showInputMalt) {
                    setMalts([...malts , {id:filteredIngredients[0]._id, malt:ingredient, quantity: quantity}])
                    setShowInputMalt(false)
                }
                else if (showInputHop) {
                    setHops([...hops, {id:filteredIngredients[0]._id, hop: ingredient, quantity: quantity}])
                    setShowInputHop(false)
                }
                else if(showInputYeast) {
                    setYeasts([...yeasts, {id:filteredIngredients[0]._id, yeast: ingredient, quantity: quantity}])
                    setShowInputYeast(false)
                }
                else if(showInputOther) {
                    setOthers([...others, {id:filteredIngredients[0]._id, other: ingredient, quantity: quantity}])
                    setShowInputOther(false)
                }
                else if(showInputCleaning) {
                    setCleanings([...cleanings, {id:filteredIngredients[0]._id, cleaning: ingredient, quantity: quantity}])
                    setShowInputCleaning(false)
                }
            }
            setIngredient("")
            setQuantity(0)
        }else {
            if(showInputMalt) setIngredientType("Malt")
            else if(showInputHop) setIngredientType("Hop")
            else if(showInputYeast) setIngredientType("Yeast")
            else if(showInputOther) setIngredientType("Other")
            else if(showInputCleaning) setIngredientType("Cleaning")
            setShowAddIngredientModal(true)
        }
    }

    const handleClose= ()=> {
        setShow(false)
        setRecipeName("")
        setMalts([])
        setIngredient("")
        setHops([])
        setYeasts([])
    }

    const itemSelect = (data)=> {
        setIngredient(data)
        setItemSelected(true)
    }

    const changeInput =(data) => {
        setIngredient(data)
        setItemSelected(false)
    }

    const showInput = (item)=> {
        if (item === "malt") {
            setShowInputMalt(true)
            setShowInputHop(false)
            setShowInputYeast(false)
            setShowInputOther(false)
            setShowInputCleaning(false)
            setIngredient("")
        }
        if (item === "hop") {
            setShowInputHop(true)
            setShowInputMalt(false)
            setShowInputYeast(false)
            setShowInputOther(false)
            setShowInputCleaning(false)
            setIngredient("")
        }
        if (item === "Yeast") {
            setShowInputYeast(true)
            setShowInputMalt(false)
            setShowInputHop(false)
            setShowInputOther(false)
            setShowInputCleaning(false)
            setIngredient("")
        }
        if (item === "Others") {
            setShowInputOther(true)
            setShowInputMalt(false)
            setShowInputHop(false)
            setShowInputYeast(false)
            setShowInputCleaning(false)
            setIngredient("")
        }
        if (item === "Cleaning") {
            setShowInputCleaning(true)
            setShowInputMalt(false)
            setShowInputHop(false)
            setShowInputYeast(false)
            setShowInputOther(false)
            setIngredient("")
        }
    }

    const handleAddRecipe = async() => {
        const payload = {
            name: recipeName,
            malts: malts.map(malt => malt.id),
            hops: hops.map(hop => hop.id),
            yeasts:yeasts.map(yeast => yeast.id),
            others: others.map(other => other.id),
            cleanings: cleanings.map(cleaning => cleaning.id)
        }
        console.log(payload)
        const {data} = await axios.post("http://localhost:4000/api/recipe/newRecipe", payload)
        console.log(data)
    }



return (
    <Modal show={show} onHide={handleClose} size="lg" className='modalAddIngredients'>
            <Modal.Header closeButton>
                <Modal.Title>New Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Recipe name:</h5>
                    {
                        recipeName? <div className='m-3'>
                        <b>{recipeName}</b>
                        <p onClick={()=>setRecipeName("")} className='addIngridient'>Change the name</p>
                        </div>
                        :
                        <Form.Control
                            type='text'
                            placeholder="add a recipe name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onBlur={(e)=>setRecipeName(e.target.value)}
                            required
                        />
                    }
                <h5>Malts</h5> 
                        {
                            malts.length?
                            <ul>
                                <Row>
                                    <Col xs={3}><b>Malt</b></Col>
                                    <Col><b>quantity</b></Col>
                                </Row>
                                    {
                                    malts.map((malt, index) => {
                                        return(
                                            <li key={index}>
                                                <Row>
                                                    <Col xs={3}>{malt.malt}</Col>  
                                                    <Col>{malt.quantity} Kg</Col> 
                                                </Row>
                                            </li>
                                            )
                                        })
                                    }
                                
                            </ul>
                            :
                            !showInputMalt && <div>There aren't malts</div>        
                        }
                    
                    {
                        showInputMalt && 
                        <Container>
                            <Row>
                                <Col xs={6}>Type of malt</Col>
                                <Col xs={3}>Quantity (Kg)</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col xs={6} >
                                    <div className='autocomplete_Wrapper'>
                                        <Form.Control
                                            type='text'
                                            placeholder="add a malt"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={ingredient}
                                            onChange={(e)=>changeInput(e.target.value)}
                                            required
                                            />
                                        <ul className='autocompleteList'>
                                            {   
                                                ingredient.length !== 0 && !itemSelected && 
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
                                    <Button variant='danger' onClick={()=>setShowInputMalt(false)}>Cancel</Button>
                                </Col>
                            </Row>
                            </Container>
                    }
                    {
                        !showInputMalt &&
                        <p onClick={()=>showInput("malt")} className='addIngridient'>+ Add a new malt</p>
                    }   
                <h5>Hops</h5>
                {
                            hops.length?
                            <ul>
                                <Row>
                                    <Col xs={3}><b>hop</b></Col>
                                    <Col><b>quantity</b></Col>
                                </Row>
                                    {
                                    hops.map((hop, index) => {
                                        return(
                                            <li key={index}>
                                                <Row>
                                                    <Col xs={3}>{hop.hop}</Col>  
                                                    <Col>{hop.quantity} gr</Col> 
                                                </Row>
                                            </li>
                                            )
                                        })
                                    }
                                
                            </ul>
                            :
                            !showInputHop && <div>There aren't hops</div>        
                        }
                    
                    {
                        showInputHop && 
                        <Container>
                            <Row>
                                <Col xs={6}>Type of hop</Col>
                                <Col xs={3}>Quantity (gr)</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col xs={6} >
                                    <div className='autocomplete_Wrapper'>
                                        <Form.Control
                                            type='text'
                                            placeholder="add a hop"
                                            aria-label="Hop"
                                            aria-describedby="basic-addon2"
                                            value={ingredient}
                                            onChange={(e)=>changeInput(e.target.value)}
                                            required
                                            />
                                        <ul className='autocompleteList'>
                                            {   
                                                ingredient.length !== 0 && !itemSelected && 
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
                                        aria-label="Hop"
                                        aria-describedby="basic-addon2"
                                        onChange={(e)=>setQuantity(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Button variant='secondary' onClick={addingredient}>ADD</Button>
                                    <Button variant='danger' onClick={()=>setShowInputHop(false)}>Cancel</Button>
                                </Col>
                            </Row>
                            </Container>
                    }
                    {
                        !showInputHop &&
                        <p onClick={()=>showInput("hop")} className='addIngridient'>+ Add a new hop</p>
                    }   
                <h5>Yeast</h5>
                {
                            yeasts.length?
                            <ul>
                                <Row>
                                    <Col xs={3}><b>Yeast</b></Col>
                                    <Col><b>quantity</b></Col>
                                </Row>
                                    {
                                    yeasts.map((yeast, index) => {
                                        return(
                                            <li key={index}>
                                                <Row>
                                                    <Col xs={3}>{yeast.yeast}</Col>  
                                                    <Col>{yeast.quantity} gr</Col> 
                                                </Row>
                                            </li>
                                            )
                                        })
                                    }
                                
                            </ul>
                            :
                            !showInputYeast && <div>There aren't yeasts</div>        
                        }
                    
                    {
                        showInputYeast && 
                        <Container>
                            <Row>
                                <Col xs={6}>Type of Yeast</Col>
                                <Col xs={3}>Quantity (gr)</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col xs={6} >
                                    <div className='autocomplete_Wrapper'>
                                        <Form.Control
                                            type='text'
                                            placeholder="add a yeast"
                                            aria-label="Yeast"
                                            aria-describedby="basic-addon2"
                                            value={ingredient}
                                            onChange={(e)=>changeInput(e.target.value)}
                                            required
                                            />
                                        <ul className='autocompleteList'>
                                            {   
                                                ingredient.length !== 0 && !itemSelected && 
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
                                        aria-label="Yeast"
                                        aria-describedby="basic-addon2"
                                        onChange={(e)=>setQuantity(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Button variant='secondary' onClick={addingredient}>ADD</Button>
                                    <Button variant='danger' onClick={()=>setShowInputYeast(false)}>Cancel</Button>
                                </Col>
                            </Row>
                            </Container>
                    }
                    {
                        !showInputYeast &&
                        <p onClick={()=>showInput("Yeast")} className='addIngridient'>+ Add a new yeast</p>
                    }
                <h5>Others</h5>
                {
                            others.length?
                            <ul>
                                <Row>
                                    <Col xs={3}><b>Other ingredient</b></Col>
                                    <Col><b>quantity</b></Col>
                                </Row>
                                    {
                                    others.map((other, index) => {
                                        return(
                                            <li key={index}>
                                                <Row>
                                                    <Col xs={3}>{other.other}</Col>  
                                                    <Col>{other.quantity}</Col> 
                                                </Row>
                                            </li>
                                            )
                                        })
                                    }
                                
                            </ul>
                            :
                            !showInputOther && <div>There aren't others ingredients</div>        
                        }
                    
                    {
                        showInputOther && 
                        <Container>
                            <Row>
                                <Col xs={6}>Type of ingredient</Col>
                                <Col xs={3}>Quantity</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col xs={6} >
                                    <div className='autocomplete_Wrapper'>
                                        <Form.Control
                                            type='text'
                                            placeholder="add a other ingredient"
                                            aria-label="Other"
                                            aria-describedby="basic-addon2"
                                            value={ingredient}
                                            onChange={(e)=>changeInput(e.target.value)}
                                            required
                                            />
                                        <ul className='autocompleteList'>
                                            {   
                                                ingredient.length !== 0 && !itemSelected && 
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
                                        aria-label="Other"
                                        aria-describedby="basic-addon2"
                                        onChange={(e)=>setQuantity(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Button variant='secondary' onClick={addingredient}>ADD</Button>
                                    <Button variant='danger' onClick={()=>setShowInputOther(false)}>Cancel</Button>
                                </Col>
                            </Row>
                            </Container>
                    }
                    {
                        !showInputHop &&
                        <p onClick={()=>showInput("Others")} className='addIngridient'>+ Add a new ingredient</p>
                    }
                <h5>Cleaning Products</h5>
                {
                            cleanings.length?
                            <ul>
                                <Row>
                                    <Col xs={3}><b>Other ingredient</b></Col>
                                    <Col><b>quantity</b></Col>
                                </Row>
                                    {
                                    cleanings.map((cleaning, index) => {
                                        return(
                                            <li key={index}>
                                                <Row>
                                                    <Col xs={3}>{cleaning.cleaning}</Col>  
                                                    <Col>{cleaning.quantity}</Col> 
                                                </Row>
                                            </li>
                                            )
                                        })
                                    }
                                
                            </ul>
                            :
                            !showInputCleaning && <div>There aren't others ingredients</div>        
                        }
                    
                    {
                        showInputCleaning && 
                        <Container>
                            <Row>
                                <Col xs={6}>Type of Cleaning product</Col>
                                <Col xs={3}>Quantity</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col xs={6} >
                                    <div className='autocomplete_Wrapper'>
                                        <Form.Control
                                            type='text'
                                            placeholder="add a other Cleaning Product"
                                            aria-label="Cleaning"
                                            aria-describedby="basic-addon2"
                                            value={ingredient}
                                            onChange={(e)=>changeInput(e.target.value)}
                                            required
                                            />
                                        <ul className='autocompleteList'>
                                            {   
                                                ingredient.length !== 0 && !itemSelected && 
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
                                        aria-label="Cleaning"
                                        aria-describedby="basic-addon2"
                                        onChange={(e)=>setQuantity(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Button variant='secondary' onClick={addingredient}>ADD</Button>
                                    <Button variant='danger' onClick={()=>setShowInputCleaning(false)}>Cancel</Button>
                                </Col>
                            </Row>
                            </Container>
                    }
                    {
                        !showInputCleaning &&
                        <p onClick={()=>showInput("Cleaning")} className='addIngridient'>+ Add a new cleaning product</p>
                    }



            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddRecipe}>
                Save Recipe
            </Button>
            </Modal.Footer>

            <AddIngredientModal
                show={showAddIngredientModal}
                setShow={setShowAddIngredientModal}
                ingredient={ingredient}
                setNewIngredient = {setNewIngredient}
                ingredientType = {ingredientType}
            />
      </Modal>
  )
}

export default AddRecipeModal