import { Button, Dialog, DialogContent, DialogTitle, Input, Radio } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import TestRepository from '../../repositories/TestRepository';


export const TestManager = () => {
    const [tests, setTests] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    const [newTest, setNewTest] = useState({
        "name": "",
        "year": "",
        "numSci": 0
    })
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)


    useEffect(() => {
        TestRepository.getAll().then(setTests)

    }, [newInfo])

    const handleInputChange = (event) => {
        const copy = {...newTest}
        const name = event.target.name
        if (name === "name") {
            copy.name = event.target.value
        } else {
            copy.name = parseInt(event.target.value)
        }
        setNewTest(copy)
    }

    return (<>
        <div className="container">

            <Button onClick={toggleForm}>Add New Test</Button>

            <div className="tests">
                {
                    tests.map((test) => {
                        return <div key={test.id}>
                            {test.name} ({test.year})
                            <button><Delete /></button>
                        </div>
                    })
                }
            </div>
            <Dialog
                className=""
                open={form}
                onClose={toggleForm}
            >
                <DialogTitle className="test-form">Add New Test</DialogTitle>
                <DialogContent className="">
                    <Input className="" type="text" name="name" defaultValue={newTest.name} placeholder="Name" onChange={handleInputChange}></Input>
                    <Input className="" type="text" name="year" defaultValue={newTest.year} placeholder="Year" onChange={handleInputChange}></Input>
                    <Radio name="numSci" value="6" color="default" onChange={handleInputChange} />
                    <Radio name="numSci" value="7" color="default" onChange={handleInputChange} />
                    <div className="">
                        <div className=""><Button className="" variant="outlined" onClick={() => {}}>Ok</Button></div>
                        <div className=""><Button className="" variant="outlined" onClick={toggleForm}>Cancel</Button></div>
                    </div>
                </DialogContent>
            </Dialog>


        </div>

    </>)

}