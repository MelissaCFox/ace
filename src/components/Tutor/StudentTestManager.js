import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import TestRepository from "../../repositories/TestRepository";
import UserRepository from '../../repositories/UserRepository';
import { StudentTestForm } from "../Forms/StudentTestForm";


export const StudentTestManager = ({ user }) => {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [tests, setTests] = useState([])
    const [studentTests, setStudentTests] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [startTest, setStartTest] = useState({})
    const [filter, setFilter] = useState("")
    const [filteredTests, setFilteredTests] = useState([])

    useEffect(() => {
        UserRepository.get(studentId).then(setStudent)
        TestRepository.getAll().then(setTests)
    }, [])

    useEffect(() => {
        TestRepository.getStudentTests(studentId).then((r) => {
            setStudentTests(r.sort((a,b) => b.updated - a.updated))
        })
    }, [newInfo])

    useEffect(() => {
        let copy = [...studentTests]
         if (filter === "english") {
            copy = copy.sort((a,b) => a.completion.english - b.completion.english)
        } else if (filter =="math") {
            copy = copy.sort((a,b) => a.completion.math - b.completion.math)
        } else if (filter === "reading") {
            copy = copy.sort((a,b) => a.completion.reading - b.completion.reading)
        } else if (filter === "science") {
            copy = copy.sort((a,b) => a.completion.science - b.completion.science)
        }
        setFilteredTests(copy)
    },[filter, studentTests])

    return (<>
        <div className="container">
            {
                student.user
                    ? student.user?.is_staff
                        ? ""
                        : <div><h2> Tests for {student.user?.first_name} {student.user?.last_name}</h2>
                            <div className="item">

                                <div>
                                    <h2>In Progress</h2>
                                    <Input onChange={(e) => {setFilter(e.target.value)}} type="select">
                                        <option value="">Any Available Sections</option>
                                        <option value="english">English</option>
                                        <option value="math">Math</option>
                                        <option value="reading">Reading</option>
                                        <option value="science">Science</option>
                                    </Input>
                                    <div className="">
                                        {
                                            filteredTests.filter(test => 1.0 > test.completion.overall > 0).map(test => {
                                                return <div key={test.id} className="item test-section">
                                                    <StudentTestForm thisTest={test} alertNewInfo={alertNewInfo} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2>Available</h2>
                                    <div className="">
                                        {
                                            tests.filter((test) => !studentTests.find(st => st.test?.id === test.id)).map(test => {
                                                if (startTest.id === test.id) {
                                                    return <div key={test.id} className="item test-section">
                                                        <StudentTestForm blank={test} alertNewInfo={alertNewInfo} studentId={student.id} setStartTest={setStartTest} />
                                                    </div>
                                                } else {
                                                    return <div key={test.id} className="item test-section">
                                                        <div>{test.name}</div>
                                                        <Button onClick={() => { setStartTest(test) }}>Start</Button>
                                                    </div>

                                                }
                                            })
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h2>Completed</h2>
                                    <div className="">
                                        {
                                            studentTests.filter(test => test.completion.overall === 1.0).map(test => {
                                                if (startTest.id === test.id) {
                                                    return <div key={test.id} className="item test-section">
                                                        <StudentTestForm thisTest={test} alertNewInfo={alertNewInfo} setStartTest={setStartTest} />
                                                    </div>
                                                } else {
                                                    return <div key={test.id} className="item test-section">
                                                        {test.test?.name} {test.updated}
                                                        <Button onClick={() => { setStartTest(test) }}>Edit</Button>
                                                    </div>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    : ""
            }


        </div>

    </>)

}