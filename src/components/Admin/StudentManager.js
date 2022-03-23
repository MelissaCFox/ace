import { Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import { StudentForm } from '../Forms/StudentForm';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export const StudentManager = ({currentUser}) => {
    const [allStudents, setAllStudents] = useState([])
    const [students, setStudents] = useState([])
    const [tutors, setTutors] = useState([])
    const [pairs, setPairs] = useState([])
    const [filter, setFilter] = useState("")

    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)

    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    const [studentToEdit, setStudentToEdit] = useState({})

    useEffect(() => {
        UserRepository.getStudents().then(r => {
            setAllStudents(r)
            if (filter) {
                filterStudents(r)
            } else {
                setStudents(r)
            }
        })
        UserRepository.getTutors().then((r) => setTutors(r.filter(tutor => !tutor.user.is_superuser)))
        UserRepository.getPairs().then(setPairs)
    }, [newInfo])

    useEffect(() => {
        filterStudents()
    },[filter])

    const filterStudents = (response) => {
        let students = []
        if (response) {
            students = response
        } else {
            students = [...allStudents]
        }
        if (filter === "unassigned") {
            students = students.filter(student => student.unassigned === true)
        } else if (filter === "assigned") {
            students = students.filter(student => student.unassigned === false)
        } else if (filter === "active") {
            students = students.filter(student => student.user?.is_active === true)
        } else if (filter === "inactive") {
            students = students.filter(student => student.user?.is_active === false)
        }
        setStudents(students)
    }

    const assignTutor = (studentId, tutorId) => {
        const pair = pairs.find(pair => pair.student.id === studentId)
        if (tutorId !== "0") {
            const new_pair = {
                studentId: studentId,
                tutorId: tutorId
            }
            if (pair) {
                UserRepository.updatePair(pair.id, new_pair).then(alertNewInfo)
            } else {
                UserRepository.addPair(new_pair).then(alertNewInfo)
            }

        } else {
            UserRepository.deletePair(pair.id).then(alertNewInfo)
        }
    }

    return (<>
        <div className="container">

            <Button onClick={() => {
                setStudentToEdit({})
                toggleForm()
                }}>Register New Student</Button>

            <select onChange={(e) => {
                setFilter(e.target.value)
                }}
                value={filter}>
                <option value="">All</option>
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>

            </select>

            <div className="students">
                {
                    students.map((student) => {
                        return <div key={student.id}>
                            <Link to={`student/${student.id}`}>{student.user.first_name}</Link> {student.unassigned ? " - NOT ASSIGNED" : ""}
                            <button><Settings onClick={() => {
                                setStudentToEdit(student)
                                toggleForm()
                            }} /></button>
                            <select defaultValue={student.tutor_id} onChange={e => assignTutor(student.id, e.target.value)}>
                                <option value="0">Assign Tutor</option>
                                {
                                    tutors.map(tutor => <option key={tutor.id} value={tutor.id}>{tutor.user?.firstName} {tutor.user?.last_name}</option>)
                                }
                            </select>
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
                <ModalHeader>{studentToEdit?.user?.first_name ? `${studentToEdit?.user?.first_name} ${studentToEdit?.user?.last_name}` : "Add Student"}</ModalHeader>
                <ModalBody>
                    <StudentForm edit={studentToEdit} alertNewInfo={alertNewInfo} toggleForm={toggleForm} currentUser={currentUser}/>
                </ModalBody>
            </Modal>

        </div>

    </>)

}