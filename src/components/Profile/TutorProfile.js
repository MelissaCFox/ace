import { Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"


export const TutorProfile = ({ currentUser }) => {
    const [user, setUser] = useState({})
    const { tutorId } = useParams()

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser)
        } else {
            UserRepository.get(tutorId).then(setUser)
        }
    }, [currentUser])

    if (user.user?.is_staff) {
        return (<>
            <div className="">
                <div>Tutor Profile Page</div>
                <h1>{user.user?.first_name} {user.user?.last_name}</h1>
                <h3>{user.user?.email}</h3>
                <h3>{user.bio}</h3>
                <h3>Billing Rate: ${user.billing_rate}</h3>
                {currentUser ?<Button>Edit Profile</Button> :""}
            </div>

        </>)
    } else return false

}