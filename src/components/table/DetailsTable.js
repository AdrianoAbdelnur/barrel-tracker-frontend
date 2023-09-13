import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'

const DetailsTable = ({styles, barrels}) => {
    useEffect(() => {
        console.log(styles)
    }, [styles])
    
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                    <th>#</th>
                    <th>Style</th>
                    <th className='text-center'>50 liters</th>
                    <th className='text-center'>30 liters</th>
                    <th className='text-center'>20 liters</th>
                    <th className='text-center'>10 liters</th>
                    <th className='text-center'>5 liters</th>
                    </tr>
            </thead>
            <tbody>
                {styles?.map((style, index )=> {
                    return(
                        <tr key={style._id}>
                            <td className='text-center'>{index}</td>
                            <td>{style.name}</td>
                            <td className='text-center'>{barrels.filter(barrel=> barrel.statusBarrel === 'full in factory' && barrel.capacity === 50 && barrel.style._id === style._id).length }</td>
                            <td className='text-center'>{barrels.filter(barrel=> barrel.statusBarrel === 'full in factory' && barrel.capacity === 30 && barrel.style._id === style._id).length }</td>
                            <td className='text-center'>{barrels.filter(barrel=> barrel.statusBarrel === 'full in factory' && barrel.capacity === 20 && barrel.style._id === style._id).length }</td>
                            <td className='text-center'>{barrels.filter(barrel=> barrel.statusBarrel === 'full in factory' && barrel.capacity === 10 && barrel.style._id === style._id).length }</td>
                            <td className='text-center'>{barrels.filter(barrel=> barrel.statusBarrel === 'full in factory' && barrel.capacity === 5 && barrel.style._id === style._id).length }</td>
                            
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>
    )
}

export default DetailsTable