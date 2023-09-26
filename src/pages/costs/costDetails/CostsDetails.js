import React, { useEffect, useState } from 'react'
import axios from './../../../api/axios'
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, InputGroup, Table } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { addDays, format, isWithinInterval, startOfMonth, subMonths } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import "./costsDetails.css"
import Search from '../../../assets/icons/Search';

const CostsDetails = () => {
    const [costs, setCosts] = useState([])
    const [filteredCosts, setFilteredCosts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [showFilters, setShowFilters] = useState(false);
    const [totalCost, setTotalCost] = useState(0)
    const [firstDate, setFirstDate] = useState(null)
    const [showedPeriod, setShowedPeriod] = useState("Current month costs")

    useEffect(() => {
        let startDate = "";
        let endDate = "";
        if (showedPeriod === "Current month costs") {
            startDate = startOfMonth(new Date())
            endDate = addDays(new Date() , 1)
        }
        if (showedPeriod === "Last month") {
            startDate= subMonths(new Date(), 1)
            endDate = addDays(new Date() , 1)
        }
        if (showedPeriod === "Lasts 3 month") {
            startDate= subMonths(startOfMonth(new Date()), 2)
            endDate = addDays(new Date() , 1)
        }
        if (showedPeriod === "Last year") {
            startDate= subMonths(startOfMonth(new Date()), 12)
            endDate = addDays(new Date() , 1)
        }
        if (showedPeriod === "All costs") {
            startDate= null
            endDate = addDays(new Date() , 1)
        }
        setFirstDate(startDate)
        handleGetCost(startDate, endDate)
    }, [showedPeriod])

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
    
    

    const handleGetCost = async(startDate, endDate) => {
        try {
            const {data} = await axios("/cost/getCosts", 
            {params : {startDate, endDate}})
            setCosts(data.filteredCosts.reverse())
            setFilteredCosts(data.filteredCosts.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const costsFilter = () => {
        let costsDateFound = []
        if (endDate) {
            costsDateFound = costs.filter((cost) => isWithinInterval(new Date(cost.date), {
                start: startDate,
                end: addDays(endDate, 1)
            })) 
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
            <Button className='btn_filters' onClick={()=>setShowFilters(showFilters? false:true)}><Search/> Search for a cost</Button>
            <DropdownButton
                className='periodOptions'
                as={ButtonGroup}
                key="showedPeriod"
                id={`dropdown-variants-showedPeriod`}
                variant='secondary'
                title={showedPeriod}
            >
                <Dropdown.Item eventKey="Current" active={showedPeriod === "Current month costs"? true:false} onClick={()=>setShowedPeriod("Current month costs")}>Current month costs</Dropdown.Item>
                <Dropdown.Item eventKey="lastMonth" active={showedPeriod === "Last  month"? true:false} onClick={()=>setShowedPeriod("Last month")}>Last month</Dropdown.Item>
                <Dropdown.Item eventKey="last3Month" active={showedPeriod === "Lasts 3 month"? true:false} onClick={()=>setShowedPeriod("Lasts 3 month")}>Lasts 3 month</Dropdown.Item>
                <Dropdown.Item eventKey="LastYear" active={showedPeriod === "Last year"? true:false} onClick={()=>setShowedPeriod("Last year")}>Last year</Dropdown.Item>
                <Dropdown.Item eventKey="All" active={showedPeriod === "All costs"? true:false} onClick={()=>setShowedPeriod("All costs")}>All costs</Dropdown.Item>
            </DropdownButton>
            <div className='totalCost'>Sum of displayed: $ <b>{totalCost}</b></div>
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
                        minDate={firstDate}
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
        {filteredCosts.length!==0?
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
            </div> :
            <div className='noCosts'>There is no cost in this period</div>
        }
    </div>
  )
}

export default CostsDetails