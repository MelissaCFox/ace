import { Button, Dialog } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import TestRepository from '../../repositories/TestRepository';
import { TestForm } from '../Forms/TestForm';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


export const TestManager = () => {
    const [tests, setTests] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [testId, setTestId] = useState(0)

 
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)


    useEffect(() => {
        TestRepository.getAll().then(setTests)

    }, [newInfo])

    const deleteTest = () => {
        if (testId) {
            TestRepository.delete(parseInt(testId)).then(() => {
                alertNewInfo()
                toggleConfirm()
            })
        }
    }

    return (<>
        <div className="container stack">

            <Button onClick={toggleForm}>New Test</Button>

            <div className="tests stack">
                {
                    tests.map((test) => {
                        return <div className="spacing" key={test.id}>
                            <Button><Delete className="trash-icon" onClick={() => {
                                setTestId(test.id)
                                toggleConfirm()
                            }} /></Button>
                            {test.name} ({test.year})
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
                    <TestForm toggleForm={toggleForm} alertNewInfo={alertNewInfo}/>
                </ModalBody>
            </Modal>

            <Dialog open={confirm} toggle={toggleConfirm}>
            Are You Sure?
            <Button onClick={deleteTest}>Yes, Delete</Button>
            <Button onClick={toggleConfirm}>Cancel</Button>
        </Dialog>

        </div>

    </>)

}