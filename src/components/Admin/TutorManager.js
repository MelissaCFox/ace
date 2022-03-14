import { Button } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"

export const TutorManager = () => {
    const [tutors, setTutors] = useState([])

    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        UserRepository.getTutors().then(r => setTutors(r.filter(t => !t.user?.is_superuser)))

    }, [newInfo])


    return (<>
        <div className="container">

            <Button>Register New Tutor</Button>

            <div className="tutors">
                {
                    tutors.map((tutor) => {
                        return <div key={tutor.id}>
                            <Link to={`tutor/${tutor.id}`}>{tutor.user.first_name}</Link> {tutor.unassigned ? " - NOT ASSIGNED" : ""}
                            <button><Settings /></button>
                        </div>
                    })
                }
            </div>
        </div>

    </>)

}