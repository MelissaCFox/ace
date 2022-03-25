import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"
import { TutorForm } from "../Forms/TutorForm"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Melissa from '../../media/Melissa.jpg';


export const TutorProfile = ({ currentUser }) => {
    const [user, setUser] = useState({})
    const { tutorId } = useParams()
    const [form, setForm] = useState(false)
    const toggleForm = () => setForm(!form)
    const [firstView, setFirstView] = useState(true)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        if (tutorId) {
            UserRepository.get(tutorId).then(setUser)
        } else if (currentUser && firstView) {
            setUser(currentUser)
        } else if (currentUser) {
            UserRepository.get(currentUser.id).then(setUser)
        }
        setFirstView(false)

    }, [tutorId, currentUser, newInfo])

    if (user.user?.is_staff) {
        return (
            <div className="item">
                <div className="photo stack">
                    <img src={Melissa} alt="profile photo" className="profile-photo" />
                    {currentUser ? <Button onClick={toggleForm}>Edit Profile</Button> : ""}
                </div>
                <div className="tutor-bio">
                    <h1>{user.user?.first_name} {user.user?.last_name}</h1>
                    <div className="email">{user.user?.email}</div>
                    <div className="item">
                        <p>Billing Rate: ${user.billing_rate}</p><p>/hr</p>
                    </div>
                    <div>
                        <h3>Bio</h3>
                        <div className="bio-text">{user.bio}</div>
                    </div>
                </div>

                <Modal animation="false"
                    centered
                    fullscreen="md"
                    size="md"
                    toggle={toggleForm}
                    isOpen={form}>
                    <ModalHeader>{user.user?.first_name} {user.user?.last_name}</ModalHeader>
                    <ModalBody>
                        <TutorForm edit={user} alertNewInfo={alertNewInfo} toggleForm={toggleForm} currentUser={currentUser} />
                    </ModalBody>
                </Modal>

            </div>)
    } else return false

}