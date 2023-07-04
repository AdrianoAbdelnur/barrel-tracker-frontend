import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import IngredientHandler from './IngredientHandler'

const HandleRecipeModal = ({show, setShow, style, setStyle}) => {
    const [malts, setMalts] = useState([])
    const [hops, setHops] = useState([])
    const [yeasts, setYeasts] = useState([])
    const [others, setOthers] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [ingredientsData, setIngredientsData] = useState([])
    const [newIngredient, setNewIngredient] = useState("")
    const [recipe, setRecipe] = useState({})
    const [message, setMessage] = useState("")
    const [hasRecipe, setHasRecipe] = useState(false)

    useEffect(() => {
        handleGetIngredients()
    }, [])    

    useEffect(() => {
        if (style.hasRecipe) {
            setHasRecipe(true)
            handleGetRecipe()
        }
        // eslint-disable-next-line
    }, [style])

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("")
                handleClose()
            }, 3000);
        }
        // eslint-disable-next-line
    }, [message])

    useEffect(() => {
        if(newIngredient === "The ingredient was added correctly") {
            handleGetIngredients()
            setNewIngredient("")
        }
    }, [newIngredient])
    
    useEffect(() => {
        if (recipe?.name) {
            console.log(recipe.malts[0].item.name)
            setMalts(recipe?.malts?.map(malt=> {return {id: malt.item._id, item: malt.item.name, quantity: malt.quantity}}))
            setHops(recipe?.hops?.map(hop=> {return {id: hop.item._id, item: hop.item.name, quantity: hop.quantity}}))
            setYeasts(recipe?.yeasts?.map(yeast=> {return {id: yeast.item._id, item: yeast.item.name, quantity: yeast.quantity}}))
            setOthers(recipe?.others?.map(other=> {return {id: other.item._id, item: other.item.name, quantity: other.quantity}}))
            setCleanings(recipe?.cleanings?.map(cleaning=> {return {id: cleaning.item._id, item: cleaning.item.name, quantity: cleaning.quantity}})) 
        }
    }, [recipe])
    
    

    const handleGetIngredients = async() =>{
        try {
            const {data} = await axios("http://localhost:4000/api/ingredient/getIngredients")
            setIngredientsData(data.ingredientsList)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose= ()=> {
        setShow(false)
        setMalts([])
        setHops([])
        setYeasts([])
        setOthers([])
        setCleanings([])
        setRecipe({})
        setStyle({})
        setHasRecipe(false)
    }

    const handleAddRecipe = async() => {
        try {
            const payload = {
                name: style.name,
                malts: malts.map(malt => {return {quantity: malt.quantity, item: malt.id}}),
                hops: hops.map(hop => {return {quantity: hop.quantity, item: hop.id}}),
                yeasts:yeasts.map(yeast => {return {quantity:yeast.quantity, item:yeast.id}}),
                others: others.map(other => {return {quantity:other.quantity, item:other.id}}),
                cleanings: cleanings.map(cleaning => {return {quantity:cleaning.quantity, item:cleaning.id}})
            }
            const {data} =await axios.post("http://localhost:4000/api/recipe/newRecipe", payload)   
            console.log(data)
            if (data?.newRecipe?.name) {
                    updateStyle(data.newRecipe.name)
                }
            setMessage(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const editRecipe = () => {
        setHasRecipe("")
    }

    const updateStyle = async(name) => {
        try { 
            console.log(name)
            const {data} =await axios.patch("http://localhost:4000/api/styles/updateRecipe", {name, hasRecipe: true})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetRecipe = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/recipe/getRecipe/"+style.name)
            setRecipe(data.recipeFound)
        } catch (error) {
            console.log(error)
        }
    }



return (
    <Modal show={show} onHide={handleClose} size="lg" className='modalAddIngredients'>
            <Modal.Header closeButton>
                <Modal.Title>Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Recipe name: <b>{style.name}</b></h5>
                <IngredientHandler
                    ingredientType={"Malt"}
                    ingredients={malts}
                    setIngredients={setMalts}
                    ingredientsData={ingredientsData}
                    hasRecipe={hasRecipe}
                    setNewIngredient={setNewIngredient}
                />
                <IngredientHandler
                    ingredientType={"Hop"}
                    ingredients={hops}
                    setIngredients={setHops}
                    ingredientsData={ingredientsData}
                    hasRecipe={hasRecipe}
                    setNewIngredient={setNewIngredient}
                />
                <IngredientHandler
                    ingredientType={"Yeast"}
                    ingredients={yeasts}
                    setIngredients={setYeasts}
                    ingredientsData={ingredientsData}
                    hasRecipe={hasRecipe}
                    setNewIngredient={setNewIngredient}
                />
                <IngredientHandler
                    ingredientType={"Other"}
                    ingredients={others}
                    setIngredients={setOthers}
                    ingredientsData={ingredientsData}
                    hasRecipe={hasRecipe}
                    setNewIngredient={setNewIngredient}
                />
                <IngredientHandler
                    ingredientType={"Cleaning"}
                    ingredients={cleanings}
                    setIngredients={setCleanings}
                    ingredientsData={ingredientsData}
                    hasRecipe={hasRecipe}
                    setNewIngredient={setNewIngredient}
                />


                {message && <Alert variant='success'>{message}</Alert>}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {
                !hasRecipe && <Button variant="primary" onClick={handleAddRecipe}>
                Save Recipe
                </Button>
            }
            {
                hasRecipe && <Button variant="danger" onClick={editRecipe}>
                Edit Recipe
                </Button>
            }
            </Modal.Footer>
      </Modal>
  )
}
export default HandleRecipeModal