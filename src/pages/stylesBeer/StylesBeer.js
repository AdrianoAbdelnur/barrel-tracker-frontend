import React, { useEffect, useState } from 'react'
import "./stylesBeer.css"
import axios from 'axios'

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
                    styles.map((style)=> {
                        return(
                            <li>{style.name}</li>
                        )
                    })
                    
                    
                    
                    :<>loading</>
            }
        </ul>
    </div>
  )
}

export default StylesBeer