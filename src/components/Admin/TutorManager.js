import { Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import UserRepository from "../../repositories/UserRepository"
import { TutorForm } from '../Forms/TutorForm';
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export const TutorManager = () => {
    const [allTutors, setAllTutors] = useState([])
    const [tutors, setTutors] = useState([])
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)
    const [tutorToEdit, setTutorToEdit] = useState({})
    const history = useHistory()

    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        UserRepository.getTutors().then(r => {
            setAllTutors(r)
            setTutors(r)
        })

    }, [newInfo])

    const filterTutors = (e) => {
        let tutors = [...allTutors]
        if (e.target.value === "active") {
            tutors = tutors.filter(t => t.user?.is_active)
        } else if (e.target.value === "inactive") {
            tutors = tutors.filter(t => !t.user?.is_active)
        }
        setTutors(tutors)
    }

    const search = (event) => {
        const term = event.target.value
        let tutors = [...allTutors]
        if (term === "") {
            setTutors(tutors)
        } else {
            UserRepository.searchTutors(term).then(setTutors)
        }
    }

    return (<>
        <div className="container stack">

            <Button onClick={() => {
                setTutorToEdit({})
                toggleForm()
            }}>Register New Tutor</Button>

            <Input type="search" placeholder="Search" onChange={search} />

            <select className="filter" onChange={filterTutors}>
                <option value="">All Tutors</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>

            </select>

            <div className="tutors">
                {
                    tutors.map((tutor) => {
                        return <div className="item spacing" key={tutor.id}>
                            <Button className={tutor.user?.is_active ? "full-name-btn active" : "full-name-btn inactive"}
                                onClick={() => history.push(`tutor/${tutor.id}`)}
                            >
                                {tutor.user.first_name} {tutor.user.last_name}
                            </Button>

                            <Button
                                onClick={() => {
                                    setTutorToEdit(tutor)
                                    toggleForm()
                                }}><Settings /></Button>
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
                    <TutorForm edit={tutorToEdit} alertNewInfo={alertNewInfo} toggleForm={toggleForm} admin={true} />
                </ModalBody>
            </Modal>

        </div>

    </>)

}