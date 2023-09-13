import axios from './../../../api/axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './productCosts.css'


const ProductsCosts = () => {
    const [costsDetails, setCostsDetails] = useState([])
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        handleGetRecipe()
    }, [])

    useEffect(() => {
        if (recipes) {
            calculateCosts()
        }
    }, [recipes])

    const handleGetRecipe = async () => {
        try {
            const { data } = await axios("/recipe/getRecipes/")
            setRecipes(data.recipesList)
            console.log(data.recipesList)
        } catch (error) {
            console.log(error)
        }
    }

    const calculateCosts = () => {
        let costsArray = []
        recipes.map(recipe => {
            let cost = 0
            for (const item of recipe.malts) {
                cost = cost + (item.quantity * item.item.price)
            }
            for (const item of recipe.hops) {
                cost = cost + (item.quantity * item.item.price)
            }
            for (const item of recipe.yeasts) {
                cost = cost + (item.quantity * item.item.price)
            }
            for (const item of recipe.cleanings) {
                cost = cost + (item.quantity * item.item.price)
            }
            for (const item of recipe.others) {
                cost = cost + (item.quantity * item.item.price)
            }
            costsArray.push({
                name: recipe.name,
                cost: cost.toFixed(2)
            })
        })
        setCostsDetails(costsArray)
    }

    return (
        <div className='productsCosts_container'>
            <h2>Production Costs</h2>
            <h5>Variables Costs</h5>
            <div className='ingredientsList'>
                {
                    costsDetails.map(cost => {
                        return (
                            <Row key={cost.name}>
                                <Col xs={4}><b>{cost.name}</b></Col>
                                <Col xs={4}>input costs / batch: <b>$ {cost.cost}</b></Col>
                                <Col xs={4}>input costs / liter: <b>$ {(cost.cost/230).toFixed(2)}</b></Col>
                            </Row>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductsCosts