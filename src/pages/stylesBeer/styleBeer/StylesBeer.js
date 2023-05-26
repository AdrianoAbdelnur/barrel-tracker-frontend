import React, { useEffect, useState } from 'react'
import "./stylesBeer.css"
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'

const StylesBeer = () => {
    const [styles, setStyles] = useState([])

    useEffect(() => {
      getStyles()
    }, [])
    

    const getStyles = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/styles/getStyles")
            setStyles(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
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
                                <Row>
                                    <Col xs={6} lg={3}>Style: <b>{style.name}</b></Col>    
                                    <Col>-Price / liter : <b>{style.price? "$" + style.price: "no price yet"}</b></Col>    
                                </Row>          
                            </li>
                        )
                    })
                    :<>loading</>
            }
        </ul>
    </div>
  )
}

export default StylesBeer