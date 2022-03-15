import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';

import React, { useEffect, useState } from "react"
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import TestRepository from '../../repositories/TestRepository';


export const TestForm = ({ toggleForm, alertNewInfo }) => {
    const [test, setTest] = useState({
        "name": "",
        "year": "",
        "numSci": 0
    })

    const addTest = () => {
        if (test.name && test.year && test.numSci) {
            TestRepository.add(test).then(() => {
                alertNewInfo()
                toggleForm()
            })
        }
    }

    return (

        <Form className="">
            <InputGroup>
                <InputGroupText>Test Name</InputGroupText>
                <Input className="" type="text" name="name" defaultValue={test.name} placeholder="Name"
                    onChange={(e) => {
                        const copy = { ...test }
                        copy.name = e.target.value
                        setTest(copy)
                    }}>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupText>Test Year</InputGroupText>
                <Input className="" type="text" name="year" defaultValue={test.year} placeholder="Year"
                    onChange={(e) => {
                        const copy = { ...test }
                        copy.year = parseInt(e.target.value)
                        setTest(copy)
                    }}>
                </Input>
            </InputGroup>

            <InputGroup>
                <InputGroupText>Num Science Sections</InputGroupText>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group"
                    onChange={(e) => {
                        const copy = { ...test }
                        copy.numSci = parseInt(e.target.value)
                        setTest(copy)
                    }}>
                    <FormControlLabel value="6" control={<Radio />} label="6" />
                    <FormControlLabel value="7" control={<Radio />} label="7" />
                </RadioGroup>

            </InputGroup>

            <div className="">
                <div className=""><Button className="" variant="outlined" onClick={addTest}>Add</Button></div>
                <div className=""><Button className="" variant="outlined" onClick={toggleForm}>Cancel</Button></div>
            </div>
        </Form>


    )

}