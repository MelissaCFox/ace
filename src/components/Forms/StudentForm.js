import { Dialog } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react"
import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from '../../repositories/useSimpleAuth';


export const StudentForm = ({ edit, alertNewInfo, toggleForm, currentUser }) => {
    const { register } = useSimpleAuth()
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [mismatch, setMismatch] = useState(false)
    const toggleMismatch = () => setMismatch(!mismatch)
    const [student, setStudent] = useState({
        firstName: edit.user ? edit.user?.first_name : "",
        lastName: edit.user ? edit.user?.last_name : "",
        email: edit.user ? edit.user?.email : "",
        username: edit.user ? edit.user?.username : "",
        password: edit.user ? edit.user?.password : "",
        verifyPassword: edit.user ? edit.user?.verifyPassword : "",
        bio: edit.user ? edit.bio : "",
        parentName: edit.user ? edit.parent_name : "",
        parentEmail: edit.user ? edit.parent_email : "",
        dayId: edit.user ? edit.day.id.toString() : "",
        startTime: edit.user ? edit.start_time : "",
        endTime: edit.user ? edit.end_time : "",
        tutor: false
    })
    const [days, setDays] = useState([])
    const [disableEdit, setDisableEdit] = useState({
        "student": false,
        "tutor": false,
        "admin": false
    })

    useEffect (() => {
        if (edit.user) {
            let newPermissions = {...disableEdit}
            if (currentUser.user.is_superuser && edit.user) {
                newPermissions.admin = true
            } else if (currentUser.user.is_staff && edit.user && edit.tutors?.find(pair => pair.tutor.id === currentUser.id)) {
                newPermissions.tutor = true
            } else if (student && currentUser.id === edit.id) {
                newPermissions.student = true
            }
            setDisableEdit(newPermissions)
        } else return false
    },[currentUser, edit])

    useEffect(() => {
        UserRepository.getDays().then(setDays)
    }, [])

    const update = () => {
        alertNewInfo()
        toggleForm()
    }

    const saveStudent = (e) => {
        e.preventDefault()
        if (edit.user) {
            if (student.password && student.password === student.verifyPassword) {
                let updated_student = {...student}
                updated_student.newPassword = student.password
                UserRepository.update(edit.id, updated_student).then(update)
            } else if (student.password) {
                toggleMismatch()
            } else {
                UserRepository.update(edit.id, student).then(update)
            }
        } else {
            //!! Make sure all fields are filled out
            register(student).then(update)
        }
    }

    return (<>

        <Form>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">First Name</InputGroupText>
                <Input required type="text" className="" name="firstName" placeholder="First Name"
                    defaultValue={student.firstName}
                    readOnly={edit?.bio}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.firstName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Last Name</InputGroupText>
                <Input required type="text" className="" name="lastName" placeholder="Last Name"
                    defaultValue={student.lastName}
                    readOnly={edit?.bio}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.lastName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Email</InputGroupText>
                <Input required type="text" className="" name="email" placeholder="Email"
                    defaultValue={student.email}
                    readOnly={disableEdit.tutor || disableEdit.admin}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.email = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Username</InputGroupText>
                <Input required type="text" className="" name="username" placeholder="Username"
                    defaultValue={student.username}
                    readOnly={edit?.bio}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.username = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Password</InputGroupText>
                <Input required type="password" className="" name="password" placeholder="Password"
                    readOnly={disableEdit.tutor || disableEdit.admin}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.password = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Verify Password</InputGroupText>
                <Input required type="password" className="" name="verifyPassword" placeholder="Verify Password"
                    readOnly={disableEdit.tutor || disableEdit.admin}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.verifyPassword = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className=""> 
                <InputGroupText className="label profile-form-label">Bio</InputGroupText>
                <Input required type="textarea" className="" name="bio" placeholder="Bio"
                    defaultValue={student.bio}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.bio = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Parent Name</InputGroupText>
                <Input required type="text" className="" name="parentName" placeholder="Parent Name"
                    defaultValue={student.parentName}
                    readOnly={disableEdit.tutor || disableEdit.student}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.parentName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Parent Email</InputGroupText>
                <Input required type="text" className="" name="parentEmail" placeholder="Parent Email"
                    defaultValue={student.parentEmail}
                    readOnly={disableEdit.tutor || disableEdit.student}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.parentEmail = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Day of the Week</InputGroupText>
                <Input required type="select" className="" name="dayId"
                    value={student.dayId}
                    disabled={disableEdit.admin || disableEdit.student}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.dayId = e.target.value
                        setStudent(copy)
                    }}>
                    <option value="">--Day--</option>
                    {
                        days.map(day => {
                            return <option key={day.id} value={day.id}>{day.day}</option>
                        })
                    }
                </Input>
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label profile-form-label">Start Time</InputGroupText>
                <Input required type="time" className="" name="startTime"
                    defaultValue={student.startTime}
                    readOnly={disableEdit.admin || disableEdit.student}
                    onChange={(e) => {
                        const copy = { ...student }
                        let time = e.target.value += ":00"
                        copy.startTime = time
                        setStudent(copy)
                    }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label profile-form-label">End Time</InputGroupText>
                <Input required type="time" className="" name="endTime"
                    defaultValue={student.endTime}
                    readOnly={disableEdit.admin || disableEdit.student}
                    onChange={(e) => {
                        const copy = { ...student }
                        let time = e.target.value += ":00"
                        copy.endTime = time
                        setStudent(copy)
                    }} />
            </InputGroup>

            <Button type="submit" onClick={saveStudent}>{edit ? "Update" : "Register"}</Button>
            {
                currentUser.user?.is_superuser
                    ? <>
                        <Button onClick={toggleConfirm}>{edit.user?.is_active ? "Deactivate" : "Activate"}</Button>
                        <Dialog open={confirm} toggle={toggleConfirm}>
                            Are You Sure?
                            <Button onClick={() => {
                                UserRepository.activate(edit.user?.id).then(update)
                            }}>Yes, {edit.user?.is_active ? "Deactivate" : "Activate"}</Button>
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