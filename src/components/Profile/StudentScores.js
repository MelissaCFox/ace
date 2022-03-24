import { Button } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import ScoreRepository from "../../repositories/ScoreRepository";
import UserRepository from '../../repositories/UserRepository';
import { ScoreForm } from "../Forms/ScoreForm"



export const StudentScores = ({ user, thisStudent }) => {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [scores, setScores] = useState([])
    const [scoreForm, setScoreForm] = useState(false)
    const toggleScoreForm = () => setScoreForm(!scoreForm)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [scoreToEdit, setScoreToEdit] = useState({})

    useEffect(() => {
        if (thisStudent) {
            setStudent(thisStudent)
            ScoreRepository.getForStudent(thisStudent.id).then(setScores)
        } else {
            UserRepository.get(studentId).then(r => {
                setStudent(r)
            })
            ScoreRepository.getForStudent(studentId).then((r) => {
                setScores(r.sort((a,b) => a.date.split("-").join("") - b.date.split("-").join("")))
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
                            <Button onClick={() => {
                                setScoreToEdit({})
                                toggleScoreForm()
                            }}>Add Score(s) +</Button>

                            <Table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Test</th>
                                        <th>English</th>
                                        <th>Math</th>
                                        <th>Reading</th>
                                        <th>Science</th>
                                        <th>Overall</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        scores.map(score => {
                                            return <tr>
                                                <td>{score.date}</td>
                                                <td>{score.test?.name}</td>
                                                <td>{score.english}</td>
                                                <td>{score.math}</td>
                                                <td>{score.reading}</td>
                                                <td>{score.science}</td>
                                                <td>{score.overall}</td>
                                                <td>
                                                    {
                                                        user.id === score.submitter?.id
                                                            ? <Button onClick={() => {
                                                                setScoreToEdit(score)
                                                                toggleScoreForm()
                                                            }}><Settings /></Button>
                                                            : ""
                                                    }</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>

                        </>
                    : ""
            }

            <Modal animation="false"
                centered
                fullscreen="md"
                size="md"
                toggle={toggleScoreForm}
                isOpen={scoreForm}>
                <ModalHeader>{scoreToEdit.date ? "Update" : "Add"} Score for {student.user?.first_name} {student.user?.last_name}</ModalHeader>
                <ModalBody>
                    <ScoreForm student={student} alertNewInfo={alertNewInfo} toggleScoreForm={toggleScoreForm} edit={scoreToEdit} />
                </ModalBody>
            </Modal>

        </div>

    </>)

}