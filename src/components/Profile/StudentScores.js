import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import SubjectRepository from "../../repositories/SubjectRepository";
import UserRepository from '../../repositories/UserRepository';



export const StudentScores = ({ user, thisStudent }) => {

    const { studentId } = useParams()
    const [student, setStudent] = useState({})

    const [newInfo, setNewInfo] = useState(false)

    useEffect(() => {
        if (thisStudent) {
            setStudent(thisStudent)
        } else {
            UserRepository.get(studentId).then(r => {
                setStudent(r)
            })
        }
    }, [newInfo, thisStudent, studentId])



    return (<>
        <div className="container">
            {
                student.user
                    ? student.user?.is_staff
                        ? ""
                        : <>
                            <h2>{thisStudent ? "My Scores" : `Scores for ${student.user?.first_name} ${student.user?.last_name}`}</h2>
                            <div className="">


                            </div>
                        </>
                    : ""
            }


        </div>

    </>)

}