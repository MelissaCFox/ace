import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import UserRepository from "../repositories/UserRepository"


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        UserRepository.getCurrentUser().then(setCurrentUser)

    }, [])


        return (
            <>

            <h1>Hello {currentUser.user?.first_name}</h1>
            <p>You are a {currentUser.user?.is_staff ? "TUTOR" : "STUDENT"}</p>


            </>
        )

}
