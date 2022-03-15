import { Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import { TutorForm } from '../Forms/TutorForm';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export const TutorManager = () => {
    const [allTutors, setAllTutors] = useState([])
    const [tutors, setTutors] = useState([])
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)
    const [tutorToEdit, setTutorToEdit] = useState({})

    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        UserRepository.getTutors().then(r => {
            setAllTutors(r.filter(t => !t.user?.is_superuser))
            setTutors(r.filter(t => !t.user?.is_superuser))
        })

    }, [newInfo])

    const filterTutors = (e) => {
        let tutors = [... allTutors]
        if (e.target.value === "active") {
            tutors = tutors.filter(t => t.user?.is_active)
        } else if (e.target.value === "inactive") {
            tutors = tutors.filter(t => !t.user?.is_active)
        }
        setTutors(tutors)
    }

    return (<>
        <div className="container">

            <Button onClick={toggleForm}>Register New Tutor</Button>

            <select onChange={filterTutors}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>

            </select>

            <div className="tutors">
                {
                    tutors.map((tutor) => {
                        return <div key={tutor.id}>
                            <Link to={`tutor/${tutor.id}`}>{tutor.user.first_name}</Link> {tutor.unassigned ? " - NOT ASSIGNED" : ""}
                            <button onClick={() => {
                                setTutorToEdit(tutor)
                                toggleForm()
                            }}><Settings /></button>
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
                <ModalHeader>{tutorToEdit?.user?.first_name ? `${tutorToEdit?.user?.first_name} ${tutorToEdit?.user?.last_name}` : "Add Tutor"}</ModalHeader>
                <ModalBody>
                    <TutorForm edit={tutorToEdit} alertNewInfo={alertNewInfo} toggleForm={toggleForm}/>
                </ModalBody>
            </Modal>

        </div>

    </>)

}