import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import SubjectRepository from "../../repositories/SubjectRepository"
import { StudentForm } from "../Forms/StudentForm"
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { Settings } from "@material-ui/icons"
import { NoteForm } from "../Forms/NoteForm"
import NoteRepository from "../../repositories/NoteRepository"
import { useHistory } from "react-router-dom"
import { ScoreForm } from "../Forms/ScoreForm"
import { ScoresTable } from "../Student/ScoresTable"


export const StudentProfile = ({ user, thisStudent }) => {
    const [viewer, setViewer] = useState({})
    const [student, setStudent] = useState({})
    const { studentId } = useParams()
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)
    const [noteForm, setNoteForm] = useState(false)
    const toggleNoteForm = () => setNoteForm(!noteForm)
    const [scoreForm, setScoreForm] = useState(false)
    const toggleScoreForm = () => setScoreForm(!scoreForm)
    const [firstView, setFirstView] = useState(true)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [editNote, setEditNote] = useState({})
    const [subjects, setSubjects] = useState([])

    const history = useHistory()

    useEffect(() => {
        SubjectRepository.getAllSubjects().then(setSubjects)
    }, [])

    useEffect(() => {
        if (firstView) {
            if (thisStudent?.notes) {
                thisStudent.notes?.sort((a, b) => b.pinned - a.pinned)
                setStudent(thisStudent)
                setFirstView(false)
            }
            else if (studentId) {
                UserRepository.get(studentId).then((r) => {
                    r.notes?.sort((a, b) => b.pinned - a.pinned)
                    setStudent(r)
                })
                setFirstView(false)
            }
        } else if (student.notes) {
            UserRepository.get(student.id).then((r) => {
                r.notes?.sort((a, b) => b.pinned - a.pinned)
                setStudent(r)
            })
        }
        setViewer(user)

    }, [studentId, thisStudent, user, newInfo, firstView])

    const pinNote = (noteId) => {
        NoteRepository.pin(noteId).then(alertNewInfo)
    }


    return (<>
        <div className="">
            <h1>{student.user?.first_name} {student.user?.last_name}</h1>
            <h3>{student.user?.email}</h3>
            <p>{student.bio}</p>
            {/* <p>Tutor: {user.tutor_id}</p> */}
            <div> Tutor(s):
                <div className="item">

                </div>
            </div>
            <div className="item"> Schedule: 
                <p>{student.day?.day}s</p>
                <p>{student.start_time} - {student.end_time}</p>
            </div>
            <div className="item">Parent Info: 
                <p>{student.parent_name}</p>
                <p>{student.parent_email}</p>
            </div>

            {user ? <Button onClick={toggleForm}>Edit Profile</Button> : ""}

        </div>

        <div>

            <ScoresTable thisStudent={student} newInfo={newInfo} />

            <Button onClick={() => {
                if (user.user?.is_staff) {
                    history.push(`/student-scores/${student.id}`)
                } else {
                    history.push(`/my-scores`)
                }
            }}>View All Scores</Button>
            <Button onClick={toggleScoreForm}>Add Score(s) +</Button>
        </div>

        {
            viewer.user?.is_staff
                ? <div>
                    <div className="item">
                        <p>Focus Areas</p>
                        {viewer.id === student.tutor_id ? <Button onClick={() => { history.push(`/focus-areas/${student.id}`) }}>Manage Areas</Button> : ""}
                    </div>

                    {
                        subjects.map(subject => {
                            return <div key={subject.id} className="item">
                                <div>{subject.subject}: </div>
                                <div className="item">
                                    {
                                        student.focus_areas?.map(area => {
                                            if (area.subject === subject.id) {
                                                return <div key={area.id}>{area.name}</div>
                                            } else return false
                                        })
                                    }
                                </div>
                            </div>
                        })

                    }

                </div>
                : ""
        }

        <Button onClick={() => { history.push(`/tests/${student.id}`) }}>Practice Tests</Button>

        <div>

            <div>Notes</div>
            <Button onClick={() => {
                setEditNote({})
                toggleNoteForm()
            }}>Add Note +</Button>
            {
                student.notes?.map(note => {
                    return <div key={note.id} className={note.author === student.id ? "student-note item" : "item"}>
                        <Button onClick={() => { pinNote(note.id) }}>Pin Note?</Button>
                        <div>{note.pinned ? "**" : ""}{note.date}</div>
                        <div>{note.note}</div>
                        {note.author === viewer.id ? <button onClick={() => {
                            setEditNote(note)
                            toggleNoteForm()
                        }}><Settings /></button> : ""}
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
            <ModalHeader>{student.user?.first_name} {student.user?.last_name}</ModalHeader>
            <ModalBody>
                <StudentForm edit={student} currentUser={viewer} alertNewInfo={alertNewInfo} toggleForm={toggleForm} />
            </ModalBody>
        </Modal>

        <Modal animation="false"
            centered
            fullscreen="md"
            size="md"
            toggle={toggleNoteForm}
            isOpen={noteForm}>
            <ModalHeader>Note for {student.user?.first_name} {student.user?.last_name}</ModalHeader>
            <ModalBody>
                <NoteForm student={student} currentUser={viewer} alertNewInfo={alertNewInfo} toggleNoteForm={toggleNoteForm} editNote={editNote} />
            </ModalBody>
        </Modal>

        <Modal animation="false"
            centered
            fullscreen="md"
            size="md"
            toggle={toggleScoreForm}
            isOpen={scoreForm}>
            <ModalHeader>Add Score for {student.user?.first_name} {student.user?.last_name}</ModalHeader>
            <ModalBody>
                <ScoreForm student={student} alertNewInfo={alertNewInfo} toggleScoreForm={toggleScoreForm} />
            </ModalBody>
        </Modal>

    </>)


}