import { Form, Input, Button, Label, FormGroup } from 'reactstrap';
import React, { useEffect, useState } from "react"
import TestRepository from '../../repositories/TestRepository';


export const StudentTestForm = ({ alertNewInfo, thisTest, blank, studentId, setStartTest }) => {
    const [english, setEnglish] = useState([])
    const [math, setMath] = useState([])
    const [reading, setReading] = useState([])
    const [science, setScience] = useState([])

    useEffect(() => {
        if (thisTest) {
            setEnglish(thisTest.english.split(","))
            setMath(thisTest.math.split(","))
            setReading(thisTest.reading.split(","))
            setScience(thisTest.science.split(","))
        } else if (blank) {
            setEnglish(["0", "0", "0", "0", "0"])
            setMath(["0", "0", "0"])
            setReading(["0", "0", "0", "0"])
            if (blank.num_sci == 6) {
                setScience(["0", "0", "0", "0", "0", "0"])
            } else {
                setScience(["0", "0", "0", "0", "0", "0", "0"])
            }
        }
    }, [thisTest, blank])

    const updateTest = () => {
        let test = {
            english: english.join(","),
            math: math.join(","),
            reading: reading.join(","),
            science: science.join(",")
        }
        if (blank) {
            test.testId = blank.id
            test.studentId = studentId
                TestRepository.addStudentTest(test).then(alertNewInfo)
        } else {
            TestRepository.updateStudentTest(thisTest.id, test).then(alertNewInfo)
        }
    }

    const handleCheck = (subject, index) => {
        if (subject === "english") {
            let copy = [...english]
            if (copy[index] == "1") {
                copy[index] = "0"
            } else {
                copy[index] = "1"
            }
            setEnglish(copy)
        } else if (subject === "math") {
            let copy = [...math]
            if (copy[index] == "1") {
                copy[index] = "0"
            } else {
                copy[index] = "1"
            }
            setMath(copy)
        } else if (subject === "reading") {
            let copy = [...reading]
            if (copy[index] == "1") {
                copy[index] = "0"
            } else {
                copy[index] = "1"
            }
            setReading(copy)
        } else if (subject === "science") {
            let copy = [...science]
            if (copy[index] == "1") {
                copy[index] = "0"
            } else {
                copy[index] = "1"
            }
            setScience(copy)
        }
    }

    const selectAll = () => {
        setEnglish(["1", "1", "1", "1", "1"])
        setMath(["1", "1", "1"])
        setReading(["1", "1", "1", "1"])
        if (science.length === 6) {
            setScience(["1", "1", "1", "1", "1", "1"])
        } else {
            setScience(["1", "1", "1", "1", "1", "1", "1"])
        }
    }


    const clearAll = () => {
        setEnglish(["0", "0", "0", "0", "0"])
        setMath(["0", "0", "0"])
        setReading(["0", "0", "0", "0"])
        if (science.length === 6) {
            setScience(["0", "0", "0", "0", "0", "0"])
        } else {
            setScience(["0", "0", "0", "0", "0", "0", "0"])
        }
    }

    return (

        <Form className="">

            <div className="item"><h3>{blank ? blank.name : thisTest.test?.name}</h3> <p>{thisTest.test? `Updated: ${thisTest.updated}` : ""}</p>  </div>

            <div className="item">
                <p>English</p>
                <div className="item">
                    {
                        english.map((section, index) => {
                            return <div key={index + 1}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" value={section}
                                            checked={section == 1}
                                            onChange={() => { handleCheck("english", index) }}
                                        />
                                        {index + 1}
                                    </Label>
                                </FormGroup>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="item">
                <p>Math</p>
                <div className="item">
                    {
                        math.map((section, index) => {
                            return <div key={index + 1}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" value={section}
                                            checked={section == 1}
                                            onChange={() => { handleCheck("math", index) }}
                                        />
                                        {index + 1}
                                    </Label>
                                </FormGroup>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="item">
                <p>Reading</p>
                <div className="item">
                    {
                        reading.map((section, index) => {
                            return <div key={index + 1}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" value={section}
                                            checked={section == 1}
                                            onChange={() => { handleCheck("reading", index) }}
                                        />
                                        {index + 1}
                                    </Label>
                                </FormGroup>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="item">
                <p>Science</p>
                <div className="item">
                    {
                        science.map((section, index) => {
                            return <div key={index + 1}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" value={section}
                                            checked={section == 1}
                                            onChange={() => { handleCheck("science", index) }}
                                        />
                                        {index + 1}
                                    </Label>
                                </FormGroup>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="item">
                <div className="stack">
                    <Button onClick={selectAll}>Select All</Button>
                    <Button onClick={clearAll}>Clear All</Button>
                </div>
                {setStartTest ? <Button onClick={setStartTest}>Cancel</Button> : ""}
                <Button onClick={updateTest}>{blank ? "Add" : "Update"}</Button>
            </div>

        </Form>


    )

}