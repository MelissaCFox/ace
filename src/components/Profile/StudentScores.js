import { Button } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
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
            ScoreRepository.getForStudent(studentId).then(setScores)
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
                            <div className="">
                                {
                                    scores.map(score => {
                                        return <div key={score.id} className="score item">
                                            <div>{score.date}</div>
                                            <div>{score.test.name}</div>
                                            <div className="score-section">
                                                <div className="score-subject">English</div>
                                                <div className="subject-score">{score.english}</div>
                                            </div>
                                            <div className="score-section">
                                                <div className="score-subject">Math</div>
                                                <div className="subject-score">{score.math}</div>
                                            </div>
                                            <div className="score-section">
                                                <div className="score-subject">Reading</div>
                                                <div className="subject-score">{score.reading}</div>
                                            </div>
                                            <div className="score-section">
                                                <div className="score-subject">Science</div>
                                                <div className="subject-score">{score.science}</div>
                                            </div>
                                            <div className="score-section">
                                                <div className="score-subject">Overall</div>
                                                <div className="subject-score">{score.overall}</div>
                                            </div>

                                            {user.user?.is_staff ? <button onClick={() => {
                                                setScoreToEdit(score)
                                                toggleScoreForm()
                                            }}><Settings /></button> : ""}

                                        </div>
                                    })
                                }

                            </div>
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