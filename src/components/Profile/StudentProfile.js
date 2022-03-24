import { Button } from "@material-ui/core"
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import SubjectRepository from "../../repositories/SubjectRepository"
import { StudentForm } from "../Forms/StudentForm"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
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
                thisStudent.notes?.reverse()
                thisStudent.notes?.sort((a, b) => b.pinned - a.pinned)
                setStudent(thisStudent)
                setFirstView(false)
            }
            else if (studentId) {
                UserRepository.get(studentId).then((r) => {
                    r.notes?.reverse()
                    r.notes?.sort((a, b) => b.pinned - a.pinned)
                    setStudent(r)
                })
                setFirstView(false)
            }
        } else if (student.notes) {
            UserRepository.get(student.id).then((r) => {
                r.notes?.reverse()
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
        <div className="section">
            <div className="item">
                <h1>{student.user?.first_name} {student.user?.last_name}</h1>
                <p>{student.user?.is_active ? "" : "*Not Active"}</p>
            </div>
            <p>{student.user?.email}</p>
            <p>{student.bio}</p>
            <div className="item"> Tutor(s):
                <div className="item">
                    {
                        student.tutors?.map(pair => {
                            return <div className="spacing" key={pair.id}>
                                <Link to={`/tutor/${pair.tutor.id}`}>{pair.tutor.user?.first_name} {pair.tutor.user?.last_name}</Link>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="item"> Schedule:
                <p className="spacing">{student.day?.day}s</p>
                <p className="spacing">{student.start_time} - {student.end_time}</p>
            </div>
            <div className="item">Parent Info:
                <p className="spacing">{student.parent_name}</p>
                <p className="spacing"><a href={`mailto:${student.parent_email}`}>{student.parent_email}</a></p>
            </div>

            {user ? <Button onClick={toggleForm}>Edit Profile</Button> : ""}

        </div>

        <div className="section">
            {
                student.scores?.length
                    ? <>
                        <ScoresTable thisStudent={student} newInfo={newInfo} />
                        <div className="item space-between">
                            <Button onClick={() => {
                                if (user.user?.is_staff) {
                                    history.push(`/student-scores/${student.id}`)
                                } else {
                                    history.push(`/my-scores`)
                                }
                            }}>View All Scores</Button>
                            <Button onClick={toggleScoreForm}>Add Score(s) +</Button>
                        </div>
                    </>
                    : <div>

                        <Button onClick={toggleScoreForm}>Add Score(s) +</Button>
                    </div>
            }

        </div>

        {
            viewer.user?.is_staff
                ? <div className="section">
                    <div className="item">
                        <h2>Focus Areas</h2>
                        {
                            viewer.id === student.tutor_id
                                ? <Button onClick={() => { history.push(`/focus-areas/${student.id}`) }}> <SettingsIcon /> </Button>
                                : ""
                        }
                    </div>

                    {
                        subjects.map(subject => {
                            return <div key={subject.id} className="item">
                                <div className="flex-one">{subject.subject}: </div>
                                <div className="item list-space flex-more">
                                    {
                                        student.focus_areas?.map(area => {
                                            if (area.subject.id === subject.id) {
                                                return <div className="tag" key={area.id}>{area.name}</div>
                                            } else return false
                                        })
                                    }
                                </div>
                            </div>
                        })

                    }
                    {
                        viewer.id === student.tutor_id
                            ? <Button className="practice-test-btn"
                                size="large"
                                onClick={() => { history.push(`/tests/${student.id}`) }}
                            >Practice Tests
                            </Button>
                            : ""
                    }

                </div>
                : ""
        }


        <div className="section">

            <div className="item">
                <h2>Notes</h2>
                <Button onClick={() => {
                    setEditNote({})
                    toggleNoteForm()
                }}>
                    <AddIcon />
                </Button>
            </div>
            {
                student.notes?.map(note => {
                    return <div key={note.id}
                        className={note.author.id === student.id ? "student-note item note" : viewer.user?.is_staff ? "item note" : "hidden"}>

                        {viewer.id === student.tutor_id ? <Button onClick={() => { pinNote(note.id) }}>{note.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}</Button> : ""}

                        <div className="flex-one">{note.date}</div>
                        <div className="flex-six">{note.note}</div>

                        {
                            note.author?.id === user.id
                                ? <Button className="edit-button"
                                    onClick={() => {
                                        setEditNote(note)
                                        toggleNoteForm()
                                    }}><EditIcon /></Button>
                                : ""
                        }
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
            size="lg"
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