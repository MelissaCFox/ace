import { Dialog } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react"
import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from '../../repositories/useSimpleAuth';


export const TutorForm = ({ edit, alertNewInfo, toggleForm, admin, currentUser }) => {
    const { register } = useSimpleAuth()
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [mismatch, setMismatch] = useState(false)
    const toggleMismatch = () => setMismatch(!mismatch)
    const [tutor, setTutor] = useState({
        firstName: edit.user ? edit.user?.first_name : "",
        lastName: edit.user ? edit.user?.last_name : "",
        email: edit.user ? edit.user?.email : "",
        username: edit.user ? edit.user?.username : "",
        password: edit.user ? edit.user?.password : "",
        verifyPassword: edit.user ? edit.user?.verifyPassword : "",
        bio: edit.user ? edit.bio : "",
        billingRate: edit.user ? edit.billing_rate : "",
        tutor: true
    })

    const update = () => {
        alertNewInfo()
        toggleForm()
    }

    const saveTutor = (e) => {
        e.preventDefault()
        if (edit.user) {
            if (tutor.password && tutor.password === tutor.verifyPassword) {
                let updated_tutor = { ...tutor }
                updated_tutor.newPassword = tutor.password
                UserRepository.update(edit.id, updated_tutor).then(update)
            } else if (tutor.password) {
                toggleMismatch()
            } else {
                UserRepository.update(edit.id, tutor).then(update)
            }
        } else {
            //!! Make sure all fields are filled out
            register(tutor).then(update)
        }
    }

    return (<>

        <Form>
            <InputGroup className="">
                <InputGroupText className="label">First Name</InputGroupText>
                <Input required type="text" className="" name="firstName" placeholder="First Name"
                    defaultValue={tutor.firstName}
                    readOnly={edit.user}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.firstName = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Last Name</InputGroupText>
                <Input required type="text" className="" name="lastName" placeholder="Last Name"
                    defaultValue={tutor.lastName}
                    readOnly={edit.user}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.lastName = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Email</InputGroupText>
                <Input required type="text" className="" name="email" placeholder="Email"
                    defaultValue={tutor.email}
                    readOnly={edit.user && !currentUser}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.email = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Username</InputGroupText>
                <Input required type="text" className="" name="username" placeholder="Username"
                    defaultValue={tutor.username}
                    readOnly={edit.user}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.username = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Password</InputGroupText>
                <Input required type="password" className="" name="password" placeholder="Password"
                    readOnly={edit.user && !currentUser}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.password = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Verify Password</InputGroupText>
                <Input required type="password" className="" name="verifyPassword" placeholder="Verify Password"
                    readOnly={edit.user && !currentUser}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.verifyPassword = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Bio</InputGroupText>
                <Input required type="textarea" className="" name="bio" placeholder="Bio"
                    defaultValue={tutor.bio}
                    readOnly={edit.user && !currentUser}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.bio = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Billing Rate</InputGroupText>
                <Input required type="number" className="" name="billingRate"
                    min="42"
                    step="0.01"
                    max="500.00"
                    defaultValue={tutor.billingRate}
                    onChange={(e) => {
                        const copy = { ...tutor }
                        copy.billingRate = e.target.value
                        setTutor(copy)
                    }} />
            </InputGroup>


            <Button type="submit" onClick={saveTutor}>{edit.user ? "Update" : "Register"}</Button>
            {
                edit.user && admin
                    ? <>
                        <Button onClick={toggleConfirm}>{edit.user?.is_active ? "Deactivate" : "Activate"}</Button>
                        <Dialog open={confirm} toggle={toggleConfirm}>
                            Are You Sure?
                            <Button onClick={() => {
                                UserRepository.activate(edit.user?.id).then(update)
                            }}>Yes, {edit.user.is_active ? "Deactivate" : "Activate"}</Button>
                            <Button onClick={toggleConfirm}>Cancel</Button>
                        </Dialog>
                    </>
                    : ""
            }
            <Dialog open={mismatch} toggle={toggleMismatch}>
                Passwords Don't Match!
                <Button onClick={toggleMismatch}>Oops</Button>
            </Dialog>
        </Form>
    </>)

}