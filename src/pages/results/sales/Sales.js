import React, { useEffect, useState } from 'react'
import "./sales.css"
import axios from 'axios'
import DatePicker from "react-datepicker";
import { Button, ButtonGroup, Dropdown, DropdownButton, Form, InputGroup, Table } from 'react-bootstrap'
import { addDays, isWithinInterval, startOfMonth, subMonths } from 'date-fns'
import Search from '../../../assets/icons/Search';

const Sales = () => {
    const [sales, setSales] = useState([])
    const [filteredSales, setFilteredSales] = useState([])
    const [keyword, setKeyword] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [showFilters, setShowFilters] = useState(false);
    const [totalPrices, setTotalPrices] = useState(0)
    const [totalPaid, setTotalPaid] = useState(0)
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
        handleGetSales(startDate, endDate)
    }, [showedPeriod])

    useEffect(() => {
        salesFilter()
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
        let additionPrices = 0;            
        let additionPaid = 0;            
            for (const sale of filteredSales) {
                additionPrices = additionPrices + sale.price
                additionPaid = additionPaid + sale.paid
            }
        setTotalPrices(additionPrices)
        setTotalPaid(additionPaid)
    }, [filteredSales])


    const handleGetSales = async(startDate, endDate) => {
        try {
            const {data} = await axios("http://localhost:4000/api/sale/getSales", {params : {startDate, endDate}})
            setSales(data.filteredSales.reverse())
            setFilteredSales(data.filteredSales.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const salesFilter = () => {
        let salesDateFound = []
        if (endDate) {
            salesDateFound = sales.filter((sale) => isWithinInterval(new Date(sale.date), {
                start: startDate,
                end: addDays(endDate, 1)
            })) 
        } else salesDateFound = sales;
        const  salesFound = salesDateFound.filter((sale) => 
        (sale?.style.name.toLowerCase()?.includes(keyword?.toLocaleLowerCase()))||
        (sale?.customer.barName.toLowerCase()?.includes(keyword?.toLocaleLowerCase()))
        )
        setFilteredSales(salesFound)
    }


  return (
    <div className='sales_container'>
        <div className='bbtn_filters_container_sales'>
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
            <div>
            <div className='totalPrice'>Sum of displayed Sales: $ <b>{totalPrices}</b></div>
            <div className='totalPrice'>Sum of displayed Paids: $ <b>{totalPaid}</b></div>
            <div className='totalPrice'>Subtraction: $ <b>{totalPrices-totalPaid}</b></div>
            </div>
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
        <div className='table_container'>
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
                    filteredSales?.map((sale, index)=> {        
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
    </div>
  )
}

export default Sales