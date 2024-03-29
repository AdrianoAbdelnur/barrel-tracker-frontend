import React, { useEffect, useState } from 'react'
import axios from './../../api/axios'
import './producStock.css'
import DetailsTable from '../../components/table/DetailsTable'

const ProductsStock = () => {
    const [barrels, setBarrels] = useState([])
    const [styles, setStyles] = useState()

    useEffect(() => {
        getbarrels()
        getStyles()
    }, [])


    const getbarrels = async () => {
        try {
            const { data } = await axios("/barrel/getBarrels")
            let styles = []
            for (const barrel of data.barrelsFound) {
                if (barrel.statusBarrel === "full in factory")
                    styles.push(barrel)
            }
            setBarrels(styles)
        } catch (error) {
            console.log(error)
        }
    }

    const getStyles = async() => {
        try {
            const {data} = await axios("/styles/getStyles")
            setStyles(data.stylesFound)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='productsStock_container'>
            <div className='stock_container'>
                <DetailsTable 
                    styles={styles}
                    barrels={barrels}
                />
            </div>
        </div>
    )
}

export default ProductsStock