import React, { useEffect, useState } from 'react'
import "./stylesBeer.css"
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HandleRecipeModal from '../../products/recipes/HandleRecipeModal'

const StylesBeer = () => {
    const [styles, setStyles] = useState([])
    const [showHandleRecipeModal, setShowHandleRecipeModal] = useState(false)
    const [style, setStyle] = useState([])

    useEffect(() => {
        getStyles()
    }, [])
    
    
    useEffect(() => {
        getStyles()
    }, [showHandleRecipeModal])
        
    

    const getStyles = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/styles/getStyles")
            setStyles(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
    }


    const handleRecipe = (style) => {
        setStyle(style)
        setShowHandleRecipeModal(true)
    }


  return (
    <div className='style_container'>
        <h2>Styles</h2>
        <ul>
            {
                styles.length?
                    styles.map((style, index)=> {
                        return(
                            <li key={style.name + index}>
                                <Row className='m-1 '>
                                    <Col xs={6} lg={3}>Style: <b>{style.name}</b></Col>    
                                    <Col>-Price / liter : <b>{style.price? "$" + style.price: "no price yet"}</b></Col>
                                    <Col>
                                    {
                                        style.hasRecipe? 
                                        <Link   
                                            component="button"
                                            onClick={()=>handleRecipe(style)}
                                        >
                                            Show Recipe
                                        </Link>
                                        :
                                            <Link   
                                                component="button"
                                                onClick={()=>handleRecipe(style)}
                                            >
                                                Add Recipe
                                            </Link>
                                    }
                                    </Col> 
                                </Row>          
                            </li>
                        )
                    })
                    :<>loading</>
            }
        </ul>
        <HandleRecipeModal
            show={showHandleRecipeModal}    
            setShow={setShowHandleRecipeModal} 
            style={style}
            setStyle={setStyle}
        />
    </div>
  )
}

export default StylesBeer