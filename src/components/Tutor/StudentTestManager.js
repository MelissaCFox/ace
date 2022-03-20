import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import TestRepository from "../../repositories/TestRepository";
import UserRepository from '../../repositories/UserRepository';
import { StudentTestForm } from "../Forms/StudentTestForm";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';


export const StudentTestManager = ({ user }) => {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [tests, setTests] = useState([])
    const [studentTests, setStudentTests] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [startTest, setStartTest] = useState({})

    useEffect(() => {
        UserRepository.get(studentId).then(setStudent)
        TestRepository.getAll().then(setTests)
    }, [])

    useEffect(() => {
        TestRepository.getStudentTests(studentId).then(setStudentTests)
    }, [newInfo])

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
                                    <Input type="select">
                                        <option value="0">Any Available Sections</option>
                                        <option value="">English</option>
                                        <option value="">Math</option>
                                        <option value="">Reading</option>
                                        <option value="">Science</option>
                                    </Input>
                                    <div className="">
                                        {
                                            studentTests.filter(test => 1.0 > test.completion.overall > 0).map(test => {
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
                                                        <div>{test.name} <StarOutlineIcon /></div>
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
                                                        {test.test?.name} <StarOutlineIcon />
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