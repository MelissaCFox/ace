import { Dialog } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react"
import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from '../../repositories/useSimpleAuth';


export const StudentForm = ({ edit, alertNewInfo, toggleForm, currentUser }) => {
    const { register } = useSimpleAuth()
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
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

    useEffect(() => {
        UserRepository.getDays().then(setDays)
    }, [])

    const update = () => {
        alertNewInfo()
        toggleForm()
    }

    const saveStudent = (e) => {
        e.preventDefault()
        //!! Make sure all fields are filled out
        if (edit.user) {
            UserRepository.update(edit.id, student).then(update)
        } else {
            register(student).then(update)
        }
    }

    return (<>

        <Form>
            <InputGroup className="">
                <InputGroupText className="label">First Name</InputGroupText>
                <Input required type="text" className="" name="firstName" placeholder="First Name"
                    defaultValue={student.firstName}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.firstName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Last Name</InputGroupText>
                <Input required type="text" className="" name="lastName" placeholder="Last Name"
                    defaultValue={student.lastName}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.lastName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Email</InputGroupText>
                <Input required type="text" className="" name="email" placeholder="Email"
                    defaultValue={student.email}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.email = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Username</InputGroupText>
                <Input required type="text" className="" name="username" placeholder="Username"
                    defaultValue={student.username}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.username = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Password</InputGroupText>
                <Input required type="password" className="" name="password" placeholder="Password"
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.password = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Verify Password</InputGroupText>
                <Input required type="password" className="" name="verifyPassword" placeholder="Verify Password"
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.verifyPassword = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Bio</InputGroupText>
                <Input required type="textarea" className="" name="bio" placeholder="Bio"
                    defaultValue={student.bio}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.bio = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Parent Name</InputGroupText>
                <Input required type="text" className="" name="parentName" placeholder="Parent Name"
                    defaultValue={student.parentName}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.parentName = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Parent Email</InputGroupText>
                <Input required type="text" className="" name="parentEmail" placeholder="Parent Email"
                    defaultValue={student.parentEmail}
                    onChange={(e) => {
                        const copy = { ...student }
                        copy.parentEmail = e.target.value
                        setStudent(copy)
                    }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label">Day of the Week</InputGroupText>
                <Input required type="select" className="" name="dayId"
                    value={student.dayId}
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
                <InputGroupText className="label">Start Time</InputGroupText>
                <Input required type="time" className="" name="startTime"
                    defaultValue={student.startTime}
                    onChange={(e) => {
                        const copy = { ...student }
                        let time = e.target.value += ":00"
                        copy.startTime = time
                        setStudent(copy)
                    }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label">End Time</InputGroupText>
                <Input required type="time" className="" name="endTime"
                    defaultValue={student.endTime}
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
                        <Button onClick={toggleConfirm}>{edit.user.is_active ? "Deactivate" : "Activate"}</Button>
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
        </Form>

    </>)

}