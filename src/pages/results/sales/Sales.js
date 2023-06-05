import React, { useEffect, useState } from 'react'
import "./sales.css"
import axios from 'axios'
import { Table } from 'react-bootstrap'

const Sales = () => {
    const [sales, setSales] = useState([])


    useEffect(() => {
        handleGetSales();
    }, [])


    const handleGetSales = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/sale/getSales")
            setSales(data.salesFound.reverse())
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='sales_container'>
        <Table striped bordered hover size="sm" className='salesTable'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Style</th>
                    <th>Volume</th>
                    <th>Customer</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    sales.map((sale, index)=> {        
                        return(
                        <tr key={sale._id}>
                            <td>{index+1}</td>
                            <td>{new Date(sale.date).toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                }
                            </td>
                            <td>{sale?.style.name}</td>
                            <td>{sale?.volume} liters</td>
                            <td>{sale?.customer.barName}</td>
                            <td>{sale?.price}</td>
                            <td>{sale?.paid}</td>
                            <td>{sale.paidComplete? <>Complete</>:<>Pending: {sale.price-sale.paid}</>}</td>
                            
                        </tr>
                        )
                    })
                }
                </tbody>
            </Table>


    </div>
  )
}

export default Sales