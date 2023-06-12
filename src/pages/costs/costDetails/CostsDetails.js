import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { addDays, format, isAfter, isBefore, isWithinInterval } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import "./costsDetails.css"

const CostsDetails = () => {
    const [costs, setCosts] = useState([])
    const [filteredCosts, setFilteredCosts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [showFilters, setShowFilters] = useState(false);
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        handleGetCost();
    }, [])

    useEffect(() => {
        costsFilter()
        // eslint-disable-next-line
    }, [endDate, keyword])
    
    useEffect(() => {
        if (!showFilters) {
            setStartDate(null)
            setEndDate(null)
            setKeyword("")
        }
    }, [showFilters])

    useEffect(() => {
        let additionCosts = 0;            
            for (const cost of filteredCosts) {
                additionCosts= additionCosts+cost.cost
            }
        setTotalCost(additionCosts)
    }, [filteredCosts])
    
    

    const handleGetCost = async() => {
        try {
            const {data} = await axios("http://localhost:4000/api/cost/getCosts")
            setCosts(data.costsFound.reverse())
            setFilteredCosts(data.costsFound.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const costsFilter = () => {
        let costsDateFound = []
        if (endDate) {
            costsDateFound = costs.filter((cost) => isWithinInterval(new Date(cost.date), {
                start: startDate,
                end: endDate
              })) /* isAfter(new Date(cost.date) , startDate) && isBefore(new Date(cost.date), addDays(endDate, 1))) */
        } else costsDateFound = costs
        const  costsFound = costsDateFound.filter((cost) => 
        (cost?.item.toLowerCase()?.includes(keyword.toLocaleLowerCase()))||
        (cost?.supplier.toLowerCase()?.includes(keyword.toLocaleLowerCase()))||
        (cost?.costCenter.toLowerCase()?.includes(keyword.toLocaleLowerCase()))
        )
        setFilteredCosts(costsFound)
    }

  return (
    <div className='costDetails_container'>
        <div className='bbtn_filters_container'>
            <Button className='btn_filters' onClick={()=>setShowFilters(showFilters? false:true)}>Search for a cost</Button>
            <div className='totalCost'>Sum of displayed costs: $ <b>{totalCost}</b></div>
        </div>
        { showFilters &&
            <div className='input_container'>
                <div className='dateFilter_container'>
                    Select a date range: 
                    <DatePicker
                        className='dayPicker'
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Select a date range"
                        maxDate={new Date()}
                        onChange={(update) => {
                            setStartDate(update[0]);
                            setEndDate(update[1]);
                        }}
                        isClearable={true}
                    />
                </div>
                <div>
                    Enter a key word: 
                    <InputGroup className="search">
                       <Form.Control
                        placeholder="Search"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>setKeyword(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>
        }
        <div className='table_container'>
            <Table striped bordered hover size="sm" className='costsTable'>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Supplier</th>
                        <th>Cost Center</th>
                        <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                    {       
                        filteredCosts.map((cost, index)=> {
                            return(
                            <tr key={cost._id}>
                                <td>{index+1}</td>
                                <td>{format(new Date(cost.date), 'MM/dd/yyyy')}
                                </td>
                                <td>{cost.item}</td>
                                <td>{cost.supplier}</td>
                                <td>{cost.costCenter}</td>
                                <td>$ {cost.cost}</td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
        </div>
    </div>
  )
}

export default CostsDetails