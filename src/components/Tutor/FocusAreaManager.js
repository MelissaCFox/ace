import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import SubjectRepository from "../../repositories/SubjectRepository";
import UserRepository from '../../repositories/UserRepository';



export const FocusAreaManager = ({ user }) => {
    const [subjects, setSubjects] = useState([])
    const [subjectAreas, setSubjectAreas] = useState([])
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [studentAreas, setStudentAreas] = useState([])
    const [newInfo, setNewInfo] = useState(false)

    useEffect(() => {
        UserRepository.get(studentId).then(r => {
            setStudent(r)
            setStudentAreas(r.focus_areas.map(area => area.id))
        })
        SubjectRepository.getAllSubjects().then(setSubjects)
        SubjectRepository.getAllAreas().then(setSubjectAreas)

    }, [newInfo])

    const handleCheck = (event) => {
        let areaId = parseInt(event.target.value)
        let copy = [...studentAreas]
        if (copy.includes(areaId)) {
            copy.splice(copy.indexOf(areaId), 1)
        } else {
            copy.push(areaId)
        }
        setStudentAreas(copy)
    }

    const updateAreas = () => {
        let updateObj = {
            focusAreas: studentAreas
        }
        UserRepository.setAreas(student.id, updateObj)
    }


    return (<>
        <div className="container">

            <div className="">
                {
                    subjects.map(subject => {
                        return <div key={subject.id} className="item subject-section">
                            <div><h2>{subject.subject}</h2></div>
                            <div>
                                {
                                    subjectAreas.filter(area => area.subject.id === subject.id).map(area => {
                                        return <div key={area.id}>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="checkbox" value={area.id} 
                                                    checked={studentAreas.find(areaId => areaId === area.id) ? "checked" :""} 
                                                    onChange={handleCheck}
                                                    />
                                                    {area.name}
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    })
                                }
                            </div>
                            <Button onClick={updateAreas}>Update</Button>
                        </div>
                    })
                }
            </div>

        </div>

    </>)

}