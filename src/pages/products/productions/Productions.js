import React, { useEffect, useState } from 'react'
import './productions.css'
import { Button, Dropdown, DropdownButton, Table, ButtonGroup, InputGroup, Form, Alert } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import Search from '../../../assets/icons/Search';
import { addDays, compareDesc, format, isWithinInterval, parseISO, startOfMonth, subMonths } from 'date-fns';
import axios from './../../../api/axios';
import AddProductionModal from './AddProductionModal';

const Productions = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showedPeriod, setShowedPeriod] = useState("Current month productions")
    const [keyword, setKeyword] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [firstDate, setFirstDate] = useState(null)
    const [productions, setProductions] = useState([])
    const [filteredProductions, setFilteredProductions] = useState([])
    const [showAddProductionModal, setShowAddProductionModal] = useState(false)
    const [newProduction, setNewProduction] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        let startDate = "";
        let endDate = "";
        if (showedPeriod === "Current month productions") {
            startDate = startOfMonth(new Date())
            endDate = addDays(new Date(), 1)
        }
        if (showedPeriod === "Last month") {
            startDate = subMonths(new Date(), 1)
            endDate = addDays(new Date(), 1)
        }
        if (showedPeriod === "Lasts 3 month") {
            startDate = subMonths(startOfMonth(new Date()), 2)
            endDate = addDays(new Date(), 1)
        }
        if (showedPeriod === "Last year") {
            startDate = subMonths(startOfMonth(new Date()), 12)
            endDate = addDays(new Date(), 1)
        }
        if (showedPeriod === "All productions") {
            startDate = null
            endDate = addDays(new Date(), 1)
        }
        setFirstDate(startDate)
        handleGetProductions(startDate, endDate)
        // eslint-disable-next-line
    }, [showedPeriod])

    useEffect(() => {
        if (newProduction.style) {
            handleGetProductions()
        }
        // eslint-disable-next-line
    }, [newProduction])


    useEffect(() => {
        productionsFilter()
        // eslint-disable-next-line
    }, [endDate, keyword])

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("")
            }, 3000);
        }
    }, [errorMessage]) 


    const handleGetProductions = async (startDate, endDate) => {
        try {
            const { data } = await axios("/production/getProductions", { params: { startDate, endDate } })
            orderByDate(data.filteredProduction)
        } catch (error) {
            console.log(error)
        }
    }

    const productionsFilter = () => {
        let productionDateFound = []
        if (endDate) {
            productionDateFound = productions.filter((production) => isWithinInterval(new Date(production.date), {
                start: startDate,
                end: addDays(endDate, 1)
            }))
        } else productionDateFound = productions
        const productionFound = productionDateFound.filter((production) =>
            (production?.style?.name?.toLowerCase()?.includes(keyword.toLocaleLowerCase()))
        )
        setFilteredProductions(productionFound)
    }

    const orderByDate = (data) => {
        const datesOrdered = ([...data].sort((a, b) => {
            const dateA = parseISO(a.date);
            const dateB = parseISO(b.date);
            return compareDesc(dateA, dateB);
        }))
        setProductions(datesOrdered)
        setFilteredProductions(datesOrdered);
    };

    return (
        <div className='productions_container'>
            <div className='addProductionButton_container'>
                <Button variant='secondary' className='addProductionButton' onClick={() => setShowAddProductionModal(true)}>Add Production</Button>
            </div>
            {
                errorMessage && 
                <div>
                    <Alert variant='danger'>{errorMessage}</Alert>
                </div>
            }
            <div className='bbtn_filters_container'>
                <Button className='btn_filters' onClick={() => setShowFilters(showFilters ? false : true)}><Search /> Search for a cost</Button>
                <DropdownButton
                    className='periodOptions'
                    as={ButtonGroup}
                    key="showedPeriod"
                    id={`dropdown-variants-showedPeriod`}
                    variant='secondary'
                    title={showedPeriod}
                >
                    <Dropdown.Item eventKey="Current" active={showedPeriod === "Current month productions" ? true : false} onClick={() => setShowedPeriod("Current month productions")}>Current month productions</Dropdown.Item>
                    <Dropdown.Item eventKey="lastMonth" active={showedPeriod === "Last  month" ? true : false} onClick={() => setShowedPeriod("Last month")}>Last month</Dropdown.Item>
                    <Dropdown.Item eventKey="last3Month" active={showedPeriod === "Lasts 3 month" ? true : false} onClick={() => setShowedPeriod("Lasts 3 month")}>Lasts 3 month</Dropdown.Item>
                    <Dropdown.Item eventKey="LastYear" active={showedPeriod === "Last year" ? true : false} onClick={() => setShowedPeriod("Last year")}>Last year</Dropdown.Item>
                    <Dropdown.Item eventKey="All" active={showedPeriod === "All productions" ? true : false} onClick={() => setShowedPeriod("All productions")}>All productions</Dropdown.Item>
                </DropdownButton>
            </div>
            {showFilters &&
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
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </div>
            }
            {
                filteredProductions.length > 0 ? <div className='tableProductions_conatainer'>
                    <Table striped bordered hover size="sm" className='productionsTable'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Style</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProductions.map((production, index) => {
                                    return (
                                        <tr key={production._id}>
                                            <td>{index}</td>
                                            <td>{format(new Date(production.date), 'MM/dd/yyyy')}</td>
                                            <td>{production.style.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div> :
                    <div className='noCosts'>There is no Productions in this period</div>
            }
            <AddProductionModal
                show={showAddProductionModal}
                setShow={setShowAddProductionModal}
                setNewProduction={setNewProduction}
                setErrorMessage={setErrorMessage}
            />
        </div>
    )
}

export default Productions