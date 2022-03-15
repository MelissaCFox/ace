import { Button, Dialog, DialogContent, DialogTitle, Input, Radio } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import TestRepository from '../../repositories/TestRepository';
import { TestForm } from '../Forms/TestForm';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


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

            <Modal animation="false"
                centered
                fullscreen="md"
                size="md"
                toggle={toggleForm}
                isOpen={form}>
                <ModalHeader>Add Test</ModalHeader>
                <ModalBody>
                    <TestForm toggleForm={toggleForm}/>
                </ModalBody>
            </Modal>

        </div>

    </>)

}