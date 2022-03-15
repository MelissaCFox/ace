import React, { useEffect, useRef, useState } from "react"
import { Form, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from '../../repositories/useSimpleAuth';


export const StudentForm = ({edit, alertNewInfo}) => {
    const { register } = useSimpleAuth()
    const [student, setStudent] = useState({"tutor": false})
    const [days, setDays] = useState([])

    useEffect(()=> {
        UserRepository.getDays().then(setDays)
    },[])


    const saveStudent = (e) => {
        e.preventDefault()
        //!! Make sure all fields are filled out
        register(student).then(alertNewInfo)
    }

    return (

        <Form>
            <InputGroup className="">
                <InputGroupText className="label">First Name</InputGroupText>
                <Input required type="text" className="" name="firstName" placeholder="First Name" onChange={(e) => {
                    const copy = {...student}
                    copy.firstName = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Last Name</InputGroupText>
                <Input required type="text" className="" name="lastName" placeholder="Last Name" 
                onChange={(e) => {
                    const copy = {...student}
                    copy.lastName = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Email</InputGroupText>
                <Input required type="text" className="" name="email" placeholder="Email" onChange={(e) => {
                    const copy = {...student}
                    copy.email = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Username</InputGroupText>
                <Input required type="text" className="" name="username" placeholder="Username" 
                onChange={(e) => {
                    const copy = {...student}
                    copy.username = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Password</InputGroupText>
                <Input required type="password" className="" name="password" placeholder="Password" onChange={(e) => {
                    const copy = {...student}
                    copy.password = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Verify Password</InputGroupText>
                <Input required type="password" className="" name="verifyPassword" placeholder="Verify Password" 
                onChange={(e) => {
                    const copy = {...student}
                    copy.verifyPassword = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Bio</InputGroupText>
                <Input required type="textarea" className="" name="bio" placeholder="Bio" onChange={(e) => {
                    const copy = {...student}
                    copy.bio = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Parent Name</InputGroupText>
                <Input required type="text" className="" name="parentName" placeholder="Parent Name" onChange={(e) => {
                    const copy = {...student}
                    copy.parentName = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>
            <InputGroup className="">
                <InputGroupText className="label">Parent Email</InputGroupText>
                <Input required type="text" className="" name="parentEmail" placeholder="Parent Email" onChange={(e) => {
                    const copy = {...student}
                    copy.parentEmail = e.target.value
                    setStudent(copy)
                }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label">Day of the Week</InputGroupText>
                <Input required type="select" className="" name="dayId" onChange={(e) => {
                    const copy = {...student}
                    copy.dayId = e.target.value
                    setStudent(copy)
                }}>
                    <option>--Day--</option>
                    {
                        days.map(day => {
                            return <option value={day.id}>{day.day}</option>
                        })
                    }
                </Input>
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label">Start Time</InputGroupText>
                <Input required type="time" className="" name="startTime" onChange={(e) => {
                    const copy = {...student}
                    let time = e.target.value += ":00"
                    copy.startTime = time
                    setStudent(copy)
                }} />
            </InputGroup>

            <InputGroup className="">
                <InputGroupText className="label">End Time</InputGroupText>
                <Input required type="time" className="" name="endTime" onChange={(e) => {
                    const copy = {...student}
                    let time = e.target.value += ":00"
                    copy.endTime = time
                    setStudent(copy)
                }} />
            </InputGroup>

            <Button type="submit" onClick={saveStudent}>{edit? "Update" : "Register"}</Button>
        </Form>



    )

}