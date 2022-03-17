import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import SubjectRepository from "../../repositories/SubjectRepository"
import { StudentForm } from "../Forms/StudentForm"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import userEvent from "@testing-library/user-event"


export const StudentProfile = ({ currentUser, student }) => {
    const [user, setUser] = useState({})
    const { studentId } = useParams()
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)
    const [firstView, setFirstView] = useState(true)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        SubjectRepository.getAllSubjects().then(setSubjects)
    }, [])

    useEffect(() => {
        if (studentId) {
            UserRepository.get(studentId).then(setUser)
        } else if (currentUser && firstView) {
            setUser(currentUser)
        } else if (currentUser) {
            UserRepository.get(currentUser.id).then(setUser)
        } else if (student) {
            setUser(student)
        }
        setFirstView(false)

    }, [studentId, currentUser, newInfo])


    return (<>
        <div className="">
            <div>Student Info Profile Page</div>
            <h1>{user.user?.first_name} {user.user?.last_name}</h1>
            <h3>{user.user?.email}</h3>
            <p>{user.bio}</p>
            {/* <p>Tutor: {user.tutor_id}</p> */}
            <p>{user.day?.day}s</p>
            <p>{user.start_time} - {user.end_time}</p>
            <p>{user.parent_name}</p>
            <p>{user.parent_email}</p>
            <div>
                <p>Focus Areas</p>

                {
                    subjects.map(subject => {
                        return <div key={subject.id}>
                            <div>{subject.subject}</div>
                            {
                                user.focus_areas?.map(area => {
                                    if (area.subject === subject.id) {
                                        return <div key={area.id}>{area.name}</div>
                                    }
                                })
                            }
                        </div>
                    })
                    
                }

            </div>
            {currentUser ? <Button onClick={toggleForm}>Edit Profile</Button> : ""}
        </div>

        <Modal animation="false"
            centered
            fullscreen="md"
            size="md"
            toggle={toggleForm}
            isOpen={form}>
            <ModalHeader>{user.user?.first_name} {user.user?.last_name}</ModalHeader>
            <ModalBody>
                <StudentForm edit={user} alertNewInfo={alertNewInfo} toggleForm={toggleForm} />
            </ModalBody>
        </Modal>

    </>)


}