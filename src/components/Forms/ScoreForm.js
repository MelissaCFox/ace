import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import React, { useEffect, useState } from "react"
import ScoreRepository from '../../repositories/ScoreRepository';
import TestRepository from '../../repositories/TestRepository';
import { Dialog } from '@material-ui/core';


export const ScoreForm = ({ toggleScoreForm, alertNewInfo, edit, student }) => {
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [tests, setTests] = useState([])
    const [score, setScore] = useState({
        "studentId": "",
        "testId": "",
        "date": "",
        "english": 0,
        "math": 0,
        "reading": 0,
        "science": 0
    })

    useEffect(() => {
        let copy = { ...score }
        if (edit?.date) {
            copy.studentId = edit.student.id
            copy.testId = edit.test.id
            copy.date = edit.date
            copy.english = edit.english
            copy.math = edit.math
            copy.reading = edit.reading
            copy.science = edit.science
        } else if (student) {
            copy.studentId = student.id
        }
        setScore(copy)
        TestRepository.getAll().then(setTests)
    }, [edit, student])

    const submitScore = () => {
        if (edit.date) {
            ScoreRepository.update(edit.id, score).then(() => {
                alertNewInfo()
                toggleScoreForm()
            })
        } else {
            if (score.studentId && score.testId && score.date) {
                ScoreRepository.add(score).then(() => {
                    alertNewInfo()
                    toggleScoreForm()
                })
            }
        }
    }


    return (

        <Form className="">
            <InputGroup>
                <InputGroupText>Date</InputGroupText>
                <Input className="" type="date" name="name" value={score.date}
                    readOnly={edit?.date}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.date = e.target.value
                        setScore(copy)
                    }}>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupText>Test</InputGroupText>
                <Input className="" type="select" name="testId" value={score.testId}
                    disabled={edit?.date}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.testId = parseInt(e.target.value)
                        setScore(copy)
                    }}>
                    <option value="">Select a Test</option>
                    {
                        tests.map(test => <option key={test.id} value={test.id}>{test.name}</option>)
                    }
                </Input>
            </InputGroup>

            <InputGroup>
                <InputGroupText>English</InputGroupText>
                <Input className="" type="number" max="36" name="score" value={score.english}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.english = parseInt(e.target.value)
                        setScore(copy)
                    }}>

                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupText>Math</InputGroupText>
                <Input className="" type="number" max="36" name="score" value={score.math}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.math = parseInt(e.target.value)
                        setScore(copy)
                    }}>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupText>Reading</InputGroupText>
                <Input className="" type="number" max="36" name="score" value={score.reading}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.reading = parseInt(e.target.value)
                        setScore(copy)
                    }}>
                </Input>
            </InputGroup>
            <InputGroup>
                <InputGroupText>Science</InputGroupText>
                <Input className="" type="number" max="36" name="score" value={score.science}
                    onChange={(e) => {
                        const copy = { ...score }
                        copy.science = parseInt(e.target.value)
                        setScore(copy)
                    }}>
                </Input>
            </InputGroup>

            <div className="">
                <div className=""><Button className="" variant="outlined" onClick={submitScore}>{edit ? edit.date ? "Update" : "Add" : "Add"}</Button></div>
                {edit ? edit.date ? <div className=""><Button className="" variant="outlined" onClick={toggleConfirm}>Delete</Button></div> : "" : ""}
            </div>

            <Dialog open={confirm} toggle={toggleConfirm}>
                Are You Sure?
                <Button onClick={() => {
                    ScoreRepository.delete(edit.id).then(() => {
                        alertNewInfo()
                        toggleConfirm()
                        toggleScoreForm()
                    })
                }}>Yes, Delete</Button>
                <Button onClick={toggleConfirm}>Cancel</Button>
            </Dialog>

        </Form>


    )

}